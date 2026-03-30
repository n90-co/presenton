# NEXT90 Presenton Deployment Guide

Fork of [presenton/presenton](https://github.com/presenton/presenton) with NEXT90 branded templates, split into two distinct services for Kubernetes.

## Architecture

```
                    ┌──────────────────────┐
                    │   K8s Ingress         │
                    │   decks.bws.n90.co    │
                    └──────┬───────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼─────────┐    ┌─────────▼─────────┐
    │ presenton-frontend │    │  presenton-api     │
    │ Next.js (port 3000)│    │  FastAPI (8000)    │
    │ ~300MB             │    │  MCP    (8001)     │
    │                    │    │  ~1.2GB            │
    └────────────────────┘    └────────────────────┘
                                       │
                              ┌────────▼────────┐
                              │   PostgreSQL     │
                              │   10.11.0.155    │
                              │   db: presenton  │
                              └─────────────────┘
```

## Building Images

Build from the repo root (`n90-co/presenton`):

```bash
# Frontend (Next.js + templates)
docker build -f Dockerfile.frontend -t ghcr.io/n90-co/presenton-frontend:latest .

# API (FastAPI + Chromium + LibreOffice + docling)
docker build -f Dockerfile.api -t ghcr.io/n90-co/presenton-api:latest .
```

Push to GitHub Container Registry:
```bash
docker push ghcr.io/n90-co/presenton-frontend:latest
docker push ghcr.io/n90-co/presenton-api:latest
```

## Environment Variables

### Frontend (presenton-frontend)

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Set in Dockerfile |
| `NEXT_TELEMETRY_DISABLED` | `1` | Set in Dockerfile |
| `NEXT_PUBLIC_API_URL` | `http://presenton-api:8000` | Internal K8s service URL for API calls |

### API (presenton-api)

| Variable | Required | Value | Source |
|----------|----------|-------|--------|
| `LLM` | Yes | `openai` | ConfigMap |
| `OPENAI_API_KEY` | Yes | `(key)` | ExternalSecret (Bitwarden: ae3f8e25) |
| `OPENAI_MODEL` | Yes | `gpt-4o` | ConfigMap |
| `DATABASE_URL` | Yes | `postgresql+asyncpg://presenton:(pass)@10.11.0.155:5432/presenton` | ExternalSecret |
| `MIGRATE_DATABASE_ON_STARTUP` | Yes | `true` | ConfigMap |
| `APP_DATA_DIRECTORY` | Yes | `/app_data` | ConfigMap |
| `TEMP_DIRECTORY` | Yes | `/tmp/presenton` | ConfigMap |
| `PUPPETEER_EXECUTABLE_PATH` | Yes | `/usr/bin/chromium` | Set in Dockerfile |
| `DISABLE_ANONYMOUS_TRACKING` | Yes | `true` | ConfigMap |
| `IMAGE_PROVIDER` | No | `pexels` | ConfigMap |
| `PEXELS_API_KEY` | No | `(key)` | ExternalSecret (if using Pexels stock images) |
| `CAN_CHANGE_KEYS` | Yes | `false` | ConfigMap — prevents UI from changing API keys |
| `USER_CONFIG_PATH` | Yes | `/app_data/userConfig.json` | ConfigMap |

## Kubernetes Resources

### Namespace
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: presenton
```

### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: presenton-config
  namespace: presenton
data:
  LLM: "openai"
  OPENAI_MODEL: "gpt-4o"
  MIGRATE_DATABASE_ON_STARTUP: "true"
  APP_DATA_DIRECTORY: "/app_data"
  TEMP_DIRECTORY: "/tmp/presenton"
  DISABLE_ANONYMOUS_TRACKING: "true"
  IMAGE_PROVIDER: "pexels"
  CAN_CHANGE_KEYS: "false"
  USER_CONFIG_PATH: "/app_data/userConfig.json"
```

### ExternalSecret (Bitwarden)
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: presenton-secrets
  namespace: presenton
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: bitwarden-secretsmanager
    kind: ClusterSecretStore
  target:
    name: presenton-secrets
  data:
    - secretKey: OPENAI_API_KEY
      remoteRef:
        key: ae3f8e25-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    - secretKey: DATABASE_URL
      remoteRef:
        key: (bitwarden-secret-id-for-db-url)
```

### Frontend Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: presenton-frontend
  namespace: presenton
spec:
  replicas: 1
  selector:
    matchLabels:
      app: presenton-frontend
  template:
    metadata:
      labels:
        app: presenton-frontend
    spec:
      containers:
        - name: frontend
          image: ghcr.io/n90-co/presenton-frontend:latest
          ports:
            - containerPort: 3000
          env:
            - name: NEXT_PUBLIC_API_URL
              value: "http://presenton-api:8000"
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: presenton-frontend
  namespace: presenton
spec:
  selector:
    app: presenton-frontend
  ports:
    - port: 3000
      targetPort: 3000
```

### API Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: presenton-api
  namespace: presenton
spec:
  replicas: 1
  selector:
    matchLabels:
      app: presenton-api
  template:
    metadata:
      labels:
        app: presenton-api
    spec:
      containers:
        - name: api
          image: ghcr.io/n90-co/presenton-api:latest
          ports:
            - containerPort: 8000
            - containerPort: 8001
          envFrom:
            - configMapRef:
                name: presenton-config
          env:
            - name: OPENAI_API_KEY
              valueFrom:
                secretKeyRef:
                  name: presenton-secrets
                  key: OPENAI_API_KEY
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: presenton-secrets
                  key: DATABASE_URL
          volumeMounts:
            - name: app-data
              mountPath: /app_data
          resources:
            requests:
              memory: "512Mi"
              cpu: "200m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
      volumes:
        - name: app-data
          persistentVolumeClaim:
            claimName: presenton-app-data
---
apiVersion: v1
kind: Service
metadata:
  name: presenton-api
  namespace: presenton
spec:
  selector:
    app: presenton-api
  ports:
    - name: api
      port: 8000
      targetPort: 8000
    - name: mcp
      port: 8001
      targetPort: 8001
```

### PVC (app_data)
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: presenton-app-data
  namespace: presenton
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: ceph-rbd
```

### Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: presenton
  namespace: presenton
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  rules:
    - host: decks.bws.n90.co
      http:
        paths:
          - path: /api/v1/
            pathType: Prefix
            backend:
              service:
                name: presenton-api
                port:
                  number: 8000
          - path: /mcp
            pathType: Prefix
            backend:
              service:
                name: presenton-api
                port:
                  number: 8001
          - path: /docs
            pathType: Prefix
            backend:
              service:
                name: presenton-api
                port:
                  number: 8000
          - path: /openapi.json
            pathType: Exact
            backend:
              service:
                name: presenton-api
                port:
                  number: 8000
          - path: /static
            pathType: Prefix
            backend:
              service:
                name: presenton-api
                port:
                  number: 8000
          - path: /app_data/
            pathType: Prefix
            backend:
              service:
                name: presenton-api
                port:
                  number: 8000
          - path: /
            pathType: Prefix
            backend:
              service:
                name: presenton-frontend
                port:
                  number: 3000
  tls:
    - hosts:
        - decks.bws.n90.co
      secretName: presenton-tls
```

## What Changed From Upstream

1. **Split monolith** into 2 services (frontend + API)
2. **Removed Ollama** — using OpenAI API instead of local inference
3. **Removed nginx** — K8s Ingress handles routing
4. **Added n90-brand templates** — 5 TSX slide types registered in index.tsx
5. **Multi-stage Docker build** for frontend — smaller image
6. **No bundled start.js** — each service has its own CMD

## Updating Templates

1. Edit TSX files in `electron/servers/nextjs/app/presentation-templates/n90-brand/`
2. Commit and push to `n90-co/presenton`
3. Rebuild frontend image: `docker build -f Dockerfile.frontend -t ghcr.io/n90-co/presenton-frontend:latest .`
4. Push and restart: ArgoCD will sync or `kubectl rollout restart deployment/presenton-frontend -n presenton`
