# NEXT90 Image Asset Manifest

All images are served locally from `/n90-assets/`. The AI should select images based on the slide module and content topic.

## Hero/Background Images

| Path | Module | When to Use |
|------|--------|-------------|
| `/n90-assets/images/live-map-hero.jpg` | Title, Closing | Globe from space with activity markers — represents the scale and reach of the IDE. Use for opening and closing slides (bookend). |
| `/n90-assets/images/about-hero.jpg` | Credibility | Satellite view of US at night — represents national scale. Use for about/credibility sections. |
| `/n90-assets/images/blog-campaign-reviews.jpg` | The Problem | Dark boardroom with spotlight on report — represents campaign reviews that start with the conclusion. Use for attribution/measurement problem slides. |
| `/n90-assets/images/blog-what-advertisers-need.jpg` | The Engine | Lighthouse beam across dark ocean — represents what measurement illuminates vs. what stays dark. Use for methodology or solution slides. |
| `/n90-assets/images/blog-why-were-building.jpg` | Origin Story | Highway converging to vanishing point at dusk — represents the convergence of Brian and Randy's paths. Use for company story or vision slides. |

## Logos

| Path | Context |
|------|---------|
| `/n90-assets/logos/next90-logo-new-tight.svg` | Dark logo on white/light backgrounds (header bar) |
| `/n90-assets/logos/next90-logo-new2-reversed-tight.png` | White/reversed logo on dark backgrounds (title, closing, section dividers) |

## Pictograms (60 Carbon SVGs at `/n90-assets/pictograms/`)

### Three Pillars
- `context.svg` — Context pillar (what else was happening)
- `geography.svg` — Geography pillar (which market)
- `time.svg` — Time pillar (when did it happen)

### IDE Flywheel
- `ingest.svg` — Data ingestion
- `unify.svg` — Taxonomy unification
- `connect.svg` — Journey connection
- `articulate.svg` — Dashboard articulation
- `feedback.svg` — Platform feedback loop
- `optimize.svg` — Budget optimization
- `predict.svg` — Predictive modeling

### Non-Advertising Signals
- `weather.svg` — Weather influence
- `demographics.svg` — Demographic data
- `agriculture.svg` — Agricultural signals

### Measurement Concepts
- `conversion.svg` — Conversion tracking
- `data-insight.svg` — Data insights
- `chart--multi-type.svg` — Multi-type charts
- `coverage-gap.svg` — Coverage gaps
- `dead-zone.svg` — Linear dead zones
- `cross-channel.svg` — Cross-channel measurement
- `stimulus.svg` — Ad stimulus
- `response.svg` — Response measurement
- `target.svg` — Targeting
- `target-area.svg` — Geographic targeting

### Infrastructure
- `infrastructure.svg` — Technical infrastructure
- `ide-engine.svg` — IDE engine
- `ide-data.svg` — IDE data processing
- `ide-insight.svg` — IDE insights

### Audiences
- `agencies.svg` — Agency audience
- `advertisers.svg` — Advertiser audience
- `publishers.svg` — Publisher audience

### Media
- `television.svg` — TV/broadcast
- `websites.svg` — Web/digital
- `telephone.svg` — Phone/calls
- `daypart.svg` — Daypart analysis
- `genre-performance.svg` — Genre performance
- `viewer-mindset.svg` — Viewer mindset

### Geography
- `globe--locations.svg` — Global locations
- `heat--map--02.svg` — Heat map
- `location.svg` — Location marker
- `earth.svg` — Earth/globe
- `world--community--grid.svg` — World grid

### Business
- `expand-scope.svg` — Scope expansion
- `new-revenue-streams.svg` — New revenue
- `retain-client.svg` — Client retention
- `differentiate.svg` — Differentiation
- `home-profile.svg` — Household profile
- `group.svg` — Group/team
- `magnify.svg` — Investigation/detail

### Brand
- `truth.svg` — Truth (NEXT90 core value)
- `origin.svg` — Origin story
- `milestone.svg` — Milestones
- `transform.svg` — Transformation

### Warnings (neutral, not red)
- `resolve-proportional.svg` — Proportional resolution
- `warning-inflate.svg` — Inflation warning
- `warning-arbitrary.svg` — Arbitrary warning

### Time
- `time--lapse.svg` — Time lapse
- `calendar.svg` — Calendar/scheduling
- `touch--screen.svg` — Interactive/touch

## Image Selection Rules

1. Title and Closing slides always use `live-map-hero.jpg` (globe with activity)
2. Section dividers select based on module: Problem → boardroom, Engine → lighthouse, Proof → satellite, Data → convergence road
3. Pictograms must match the concept being described — never reuse a pictogram with a different meaning
4. Never use red/error styling on competitor comparisons — use neutral gray
5. Background images use gradient-split treatment (never full-bleed on content slides)
