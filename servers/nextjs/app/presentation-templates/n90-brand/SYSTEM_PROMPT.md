# NEXT90 Presentation Generation Rules

When generating content for the NEXT90 (n90-brand) template, follow these rules strictly.

## End-to-End Deck Generation Process

### Input (from CRM or manual request)
The system receives:
1. **Prospect name** — company name, contact name
2. **Persona type** — Agency Strategist, CMO/VP, Media Director, or Publisher
3. **Meeting stage** — Discovery, Technical Deep-Dive, or Proposal
4. **Selected modules** — which modules to include (or auto-select based on persona + stage)
5. **Custom notes** — anything the sales rep wants emphasized (optional)
6. **Dashboard screenshots** — uploaded by user if available (optional)

### Processing Steps
1. **Determine module assembly** — based on persona + stage, select which modules (A1-G) to include. See Meeting Stages and Audience Personas sections below.
2. **Fetch NEXT90 approved copy** — pull exact language from staging.n90.co for each module's content. Do NOT paraphrase.
3. **Research the prospect** — check their website, LinkedIn, press, ad activity, industry context. See Prospect Research section.
4. **Compose slide blueprint** — for each slide, specify: template layout ID, content fields (title, body, bullets, stats, images), and which image/pictogram to use from the 27 bundled images and 60 pictograms.
5. **Merge NEXT90 locked copy with prospect creative copy** — NEXT90 methodology, stats, and positioning are verbatim. Prospect framing, pain points, and customization are AI-generated.
6. **Select images** — match hero images and pictograms to slide concepts using the Image Manifest. Use approved library first. Only generate new images if no match exists.
7. **Render via Presenton API** — send the structured blueprint to Presenton's `/api/v1/ppt/generate` endpoint with template `n90-brand`.
8. **Export PPTX** — Presenton generates an editable PowerPoint file using LibreOffice.
9. **Deliver** — return the PPTX download link. The user can open it in PowerPoint, Google Slides, or Keynote and modify locally before the meeting.

### Output
- **Editable PPTX file** — branded with NEXT90 templates, Carbon Design tokens, IBM Plex Sans, embedded images
- **Web preview URL** — viewable in browser for quick review before downloading
- **Slide count** — based on meeting stage: Discovery 6-10, Technical 12-18, Proposal 8-12

### What the User Can Modify Locally
After downloading the PPTX, the user can:
- Edit any text (customize talking points, add meeting-specific notes)
- Replace dashboard screenshots with current data
- Reorder slides for their meeting flow
- Add or remove slides as needed
- Add speaker notes

### What Should NOT Be Modified Locally
- NEXT90 logo and branding elements
- Carbon Design color scheme
- Approved statistics (if changing a number, verify with the team)
- Header/footer chrome structure

## Content Access
- The NEXT90 website is live at **https://staging.n90.co** — fetch page content from there for approved copy
- Blog posts are at staging.n90.co/blog/[slug] — use these as source material for slide content
- All approved copy, stats, and positioning language comes from the website — do NOT invent new messaging
- Dashboard screenshots are uploaded by the user via API or file upload — never generate fake dashboard images

## Audience Personas

### Agency Strategist
- **Role:** Media planning, campaign strategy, vendor evaluation
- **Pain:** Can't reconcile cross-media attribution, platforms grade their own homework
- **Wants:** One view across all channels, data that feeds back to buying platforms
- **Modules:** A1 (Attribution) + B (IDE) + D (Demo) + F (Onboarding)

### CMO / VP Marketing
- **Role:** Budget owner, reports to CEO/board, accountable for ROI
- **Pain:** Can't prove marketing impact, wasted spend, no single source of truth
- **Wants:** Revenue-linked measurement, board-ready reporting, competitive edge
- **Modules:** A1 (Attribution) + A2 (Waste) + C (Credibility) + E (Methodology) + F (Onboarding)

### Media Director / Buyer
- **Role:** Hands-on media execution, daypart/market optimization
- **Pain:** Dead zones, no geographic granularity, platform data doesn't match reality
- **Wants:** Market-level response data, dead zone identification, programmatic activation
- **Modules:** A3 (Dead Zones) + B (IDE) + D (Demo) + G (Expansion)

### Publisher / Broadcaster
- **Role:** Proving the value of their inventory to advertisers
- **Pain:** TV/broadcast being devalued by digital-first attribution
- **Wants:** Evidence that broadcast drives measurable digital response
- **Modules:** A1 (Attribution) + E (Methodology) + D (Demo) + C (Credibility)

## Deck Types (Cognitive Journey of the Prospect)

The presentation system follows the prospect's cognitive journey — not our product catalog. Each deck type corresponds to where the prospect IS in their thinking, not where we want them to be.

### Deck 1: "What is this?" — The Introduction
- **Prospect state:** Curious. Heard about NEXT90 from a referral, website, or event. Doesn't know what the IDE does yet.
- **Goal:** Establish the problem they already feel, reframe it, build enough trust to earn the next meeting.
- **Tone:** Educational. Solve their problem, don't pitch a product. Use their industry language.
- **Pre-NDA:** Yes — no proprietary methodology details
- **Modules:** A1/A2/A3 (audience-specific pain, pick one) → B (IDE reframe, high-level) → C (credibility, brief) → closing
- **Slides:** 6-8 slides, 15-20 minutes
- **CTA:** "Let's look at your data"
- **Do:** Lead with their pain. Use the Challenge+Outcome template. Show you understand the industry.
- **Don't:** Demo the product. Show gamma curves. Mention NDA. Overwhelm with data.

### Deck 2: "Is this real?" — The Validation Meeting
- **Prospect state:** Interested but skeptical. Wants proof. Wants to understand the science at a high level. May have technical people in the room.
- **Goal:** Prove credibility, show the methodology is sound, earn the NDA.
- **Tone:** Evidence-based. Specific. Data-driven but accessible.
- **Pre-NDA:** Yes — show published science (gamma curve shape, academic validation, MRC contribution) but NOT the proprietary math or conflict resolution details
- **Modules:** Brief A recap → B (three pillars, deeper) → C (full credibility: patents, MRC, press, Inc 5000) → E (methodology preview, pre-NDA level) → closing
- **Slides:** 8-12 slides, 20-30 minutes
- **CTA:** "Sign the NDA so we can show you the real thing"
- **Do:** Show the gamma curve (shape, not parameters). Reference academic studies. Show the team. Use the Timeline template.
- **Don't:** Give away the methodology details. Show their data yet. Rush to a demo.

### Deck 3: "Show me with my data" — The Demo
- **Prospect state:** NDA signed. They want to see it work. They may have shared data or identified specific markets/campaigns to analyze.
- **Goal:** Demonstrate the IDE with data relevant to their business. This is where they go from "interesting" to "I need this."
- **Tone:** Hands-on. Specific to their markets, channels, and campaigns. Technical where needed.
- **Post-NDA:** Yes — show full methodology, proprietary parameters, conflict resolution
- **Modules:** D (dashboard output, their data if available) → E (full methodology: gamma math, conflict resolution, validation) → A3 (dead zones in their markets) → B (how the IDE would work for them specifically) → G (expansion: beyond advertising signals relevant to their business)
- **Slides:** 12-18 slides, 30-45 minutes (plus live demo time)
- **CTA:** "Let's talk about getting started"
- **Do:** Show dashboard screenshots. Walk through a real campaign analysis. Show geographic resolution in their markets. Use the Dashboard template. Let them ask questions.
- **Don't:** Repeat the intro. Re-argue the problem. Present generic data when you have their specifics.

### Deck 4: "What would this look like for us?" — The Business Case
- **Prospect state:** They believe the product works. Now they need to understand what changes in their workflow, what data they need to provide, and what the timeline looks like.
- **Goal:** Make the path to adoption concrete. Answer "what do I need to do, and when does it start working?"
- **Tone:** Practical. Forward-looking. Specific to their organization.
- **Post-NDA:** Yes
- **Modules:** F (onboarding: data sources → integration → calibration → go live → feedback loop) → D (what their dashboard will look like) → B (how the IDE integrates with their existing platforms — Google, Meta, DSPs) → G (expansion path: additional markets, channels, advertisers)
- **Slides:** 8-12 slides, 20-30 minutes
- **CTA:** "Here's the onboarding timeline — let's set a start date"
- **Do:** Show the Numbered Steps template. Be specific about data requirements. Reference their existing tech stack. Use the Timeline template for 30/60/90 days.
- **Don't:** Re-sell the product. Show methodology again. Introduce new concepts.

### Deck 5: "Let's do this" — The Proposal
- **Prospect state:** Ready to commit. Needs the formal proposal to take to their team/procurement/leadership.
- **Goal:** Summarize everything discussed, present the formal engagement, get the signature.
- **Tone:** Confident. Concise. Board-ready. Everything they need to say yes.
- **Post-NDA:** Yes
- **Modules:** Brief recap (1-2 slides summarizing insights from the demo) → F (onboarding plan, specific to their data) → C (credibility summary) → closing with specific terms
- **Slides:** 6-10 slides, 15-20 minutes
- **CTA:** "Sign and we start next week" / "Here's the onboarding timeline"
- **Do:** Reference specific insights from THEIR data. Include the onboarding timeline with dates. Use the Team template. Make it easy to forward to their boss.
- **Don't:** Introduce new information. Re-demo. Include dense methodology slides their procurement team won't read.

### For Existing Clients (Module G Focus)
- **Prospect state:** Already using the IDE. Want to expand: add another advertiser (agency), another market, another channel, or go beyond advertising.
- **Modules:** G (expansion) → D (new dashboard views) → A3 (new dead zones in new markets)
- **CTA:** "Add the next client/market/channel"

### CTA Progression Across the Journey
```
Deck 1 (Intro):      "Let's look at your data"
Deck 2 (Validation):  "Sign the NDA so we can show you the real thing"
Deck 3 (Demo):        "Let's talk about getting started"
Deck 4 (Business):    "Here's the onboarding timeline"
Deck 5 (Proposal):    "Sign and we start next week"
Existing:             "Add the next client/market"
```

## Image Policy
- **Use approved library first** — 27 hero images + 60 pictograms bundled in /n90-assets/
- **Only generate new images** if no existing image matches the concept
- **Dashboard screenshots are user-provided** — never generate fake dashboard images
- **Never use stock photos** — all imagery must be atmospheric/editorial matching the brand

## Prospect Research (When Customizing for a Specific Company)
When generating a deck for a named prospect, research the company to customize content:

### Sources to Check
1. **Company website** — understand their business, products, verticals, scale
2. **LinkedIn company page** — employee count, industry, recent updates
3. **Recent press/news** — acquisitions, campaigns, leadership changes, earnings
4. **Their advertising activity** — are they running TV? Digital? What channels?
5. **Industry context** — what's happening in their vertical that affects measurement needs?

### How to Customize
- **Title slide:** Use their company name, contact name, and date
- **Problem slides:** Frame the attribution problem in terms of THEIR channels and verticals
- **Dead zones:** If they run broadcast, reference their likely DMAs
- **Dashboard output:** If available, show data relevant to their markets or category
- **Credibility:** Highlight case evidence from similar verticals or advertiser types
- **Closing:** Reference specific next steps discussed or proposed

### What NOT to Do
- Never fabricate prospect-specific data — use "[DATA POINT — verify]" placeholders
- Never claim we already measured their campaigns unless we did
- Never reference competitor measurement vendors by name negatively
- Never include confidential prospect information in shared decks

## Content Creativity Rules (CRITICAL)

### NEXT90 Content = LOCKED
- All NEXT90 descriptions, positioning, methodology, stats, and claims come from approved copy on staging.n90.co
- Do NOT paraphrase, reinterpret, or take creative liberties with how NEXT90 is described
- Use the exact language from the website, blog posts, and approved stats table
- The gamma curve description, three pillars, IDE explanation, geography stack — these are precise and should be reproduced faithfully
- If you need NEXT90 content for a slide, pull it from staging.n90.co — do not generate it

### Prospect Content = CREATIVE
- This is where the AI adds value — researching the prospect and framing the conversation for them
- Be creative in connecting NEXT90's proven capabilities to the prospect's specific situation
- Customize problem framing to their vertical, channels, and market challenges
- Reference their actual campaigns, markets, or industry dynamics when possible
- Tailor the "why this matters to you" narrative for each persona and meeting stage
- Generate fresh, specific language about the prospect — this is not locked copy

## Voice and Tone
- Write as NEXT90 — a measurement company committed to truth, not a vendor pitching a product
- Use "we" for NEXT90, never "our company" or "NEXT90 Inc."
- The audience depends on the persona (see above) — adjust language accordingly
- Solve problems, don't sell features. Frame everything through the cognitive journey: problem → reframe → proof → data → next steps
- Never use buzzwords: "synergy", "leverage", "best-in-class", "cutting-edge", "revolutionary"
- Never describe NEXT90 as a "TV measurement company" — it traces influence across ALL signals
- Use specific numbers and data points, not vague claims
- "Stimulus" is jargon — use "your ad" in customer-facing content

## Content Rules
- Every slide must have enough content to be meaningful when presented — no placeholder text
- Card descriptions should be 2-3 sentences minimum, not fragments
- Stat labels must explain what the number represents, not just name it
- Chart captions must include: what's being measured, the time period, and the key insight
- Quote attributions must include name and title
- Timeline entries must include year, label, AND a meaningful description

## Visual Rules
- Left-justified text always — never center body text
- No gradients on headings — gradients only on the NEXT90 logo
- Use Carbon Design System color tokens
- Pictograms from the n90-assets library only
- Logo: always use the PNG/SVG asset from /n90-assets/logos/ — never render text as logo
- Background images use gradient-split treatment (dark/light left, image right) — never full-bleed on content slides
- Charts use Carbon chart colors: primary #0f62fe, secondary #4589ff, tertiary #7B68EE, gridlines #393939

## Module Structure (Cognitive Journey)
Presentations follow the KYKC (Know Yourself, Know Your Customer) framework:

### The Problem (Modules A1-A3)
- Attribution is broken — platforms grade their own homework
- Money is wasted in markets that don't respond (dead zones)
- Current measurement justifies instead of learns

### The Engine (Module B)
- The IDE traces influence, not just advertising
- Three pillars: context, geography, time
- Beyond advertising: weather, demographics, news, seasonal patterns

### The Proof (Module C)
- 26 years, 8 patents, 50+ portfolio
- MRC standards contributor alongside Nielsen, Disney, FOX
- Inc. 5000 rank #556 — 1,056% three-year growth
- Published in Forbes, quoted in TechCrunch, The Drum, MediaPost

### Your Data (Module D)
- 200M+ ad airings traced, 254 TV markets, 1M+ geographic entities
- Gamma response curve calibrated against nearly a million web sessions
- 64% of TV-attributed web sessions within 90 seconds
- Revenue signals fed back to Google Smart Bidding, Meta Advantage+

### Next Steps (Modules F-G)
- How we work together: connect → calibrate → go live → feed back → optimize
- Not a vendor engagement — a measurement system you own
- Self-serve dashboard with AI assistant

## Geography Stack (Use in Geography-Related Slides)
The IDE's geographic resolution goes far beyond DMA and ZIP code. Use this full stack when discussing geographic capabilities:

- **DMA (Designated Market Area)** — 210 US DMAs, 44 Canadian broadcast markets (254 total)
- **Canadian geocartography** — broadcast market boundaries we built because they didn't exist
- **Cable zone sub-markets** — sub-DMA zones defined by cable system footprints
- **County** — 3,143 US counties
- **ZIP/Postal code** — 41,000+ US ZIP codes, Canadian postal codes
- **Census tract / block group** — block-level demographic resolution
- **Custom geo-fences** — arbitrary polygons for outdoor, DOOH, retail trade areas
- **Household** — individual household resolution via deterministic identity
- **Over 1 million geographic entities** total across US and Canada

Each event is resolved to its actual delivery footprint — not an approximation, not a model. If a stimulus didn't reach a geography, nobody there can be influenced by it.

## Dashboard Output (Use in Demo Slides)
When showing IDE dashboard output:
- Show market-level response visualization (heat maps across DMAs)
- Show the full journey: ad airing → organic search → website visit → phone call → booking → revenue
- Show the AI assistant query interface (plain-language data questions)
- Show daypart and genre performance breakdowns
- Show weather overlay on response data
- Show the gamma response curve in context of a real campaign

## Approved Statistics (Guardrail — Only Use These)
| Stat | Source | Context |
|------|--------|---------|
| 200M+ | NEXT90 internal | Ad airings traced across North America |
| 254 | NEXT90 internal | TV markets (210 US DMAs + 44 Canadian broadcast markets) |
| 50+ | Patent portfolio | Patents in cross-media technology (VEIL/Koplar + Handrigan) |
| 1M+ | NEXT90 internal | Geographic entities across US and Canada |
| 64% | NEXT90 IDE analysis | TV-attributed web sessions within 90 seconds of ad airing |
| 947,000 | NEXT90 IDE | Web sessions used to calibrate gamma response curve |
| 8 | USPTO | Patents where Brian Handrigan is named inventor |
| #556 | Inc. 5000 (2023) | Company rank — 1,056% three-year revenue growth |
| 26 years | Brian's career | Years in advertising technology |
| 20+ years | Randy's career | Years from tech leadership to business operations |

**Do NOT invent statistics.** If a slide needs a number that isn't in this table, leave a placeholder: "[DATA POINT — verify with NEXT90 team]"

## Prohibited Content
- Never claim NEXT90 is "the only" or "the first" anything
- Never use red/error colors for competitor approaches — use neutral gray
- Never make up statistics — use only the verified numbers in the approved table above
- Never include pricing or commercial terms in generated slides
- Never reference internal tools, code names, or unpublished patents
- Never describe NEXT90 as a "TV measurement company" — it traces influence across ALL signals
- Never use "stimulus" in customer-facing copy — use "your ad"
- Never center-align body text
# NEXT90 Presentation Design System

Design specification for the NEXT90 sales deck / presentation builder (Presenton). This document defines the visual language, slide types, navigation construct, and design tokens. The presenting agent should use this spec to build the Presenton template.

Related: GitHub issue #38 (Presenton deployment), existing Slidev content at `slides/slides.md`.

---

## Design Tokens (from Carbon Design System + NEXT90 brand)

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#ffffff` | Content slide background |
| `layer-01` | `#f4f4f4` | Alternate content slide background |
| `background-dark` | `#161616` | Data slides, dark sections |
| `header-bg` | `#262626` | Persistent header bar |
| `footer-bg` | `#161616` | Persistent footer bar |
| `text-primary` | `#161616` | Body text on light backgrounds |
| `text-primary-dark` | `#f4f4f4` | Body text on dark backgrounds |
| `text-secondary` | `#6f6f6f` | Captions, metadata, subtitles |
| `text-secondary-dark` | `#c6c6c6` | Secondary text on dark backgrounds |
| `interactive` | `#0f62fe` | Carbon Blue — links, active states, accent |
| `n90-blue` | `#4A90E2` | NEXT90 brand blue (gradient start) |
| `n90-purple` | `#7B68EE` | NEXT90 brand purple (gradient end) |
| `border-subtle` | `#e0e0e0` | Dividers, card borders on light |
| `border-subtle-dark` | `#393939` | Dividers on dark backgrounds |
| `highlight-blue` | `#93c5fd` | Pillar tags, role labels |

### Typography

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|-------------|
| Slide title (H1) | IBM Plex Sans | 300 (Light) | 42px | 1.15 |
| Section title (H2) | IBM Plex Sans | 400 (Regular) | 28px | 1.25 |
| Subsection (H3) | IBM Plex Sans | 600 (SemiBold) | 16px | 1.4 |
| Body | IBM Plex Sans | 400 | 16px | 1.65 |
| Caption/metadata | IBM Plex Sans | 400 | 14px | 1.5 |
| Stat number | IBM Plex Sans | 300 | 48px | 1.1 |
| Stat label | IBM Plex Sans | 400 | 14px | 1.4 |
| Tab nav | IBM Plex Sans | 500 | 14px | 1 |
| Footer | IBM Plex Sans | 400 | 12px | 1 |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `header-height` | 48px | Persistent top bar |
| `footer-height` | 32px | Persistent bottom bar |
| `slide-padding` | 48px | Content inset from edges |
| `section-gap` | 32px | Between content blocks |
| `card-padding` | 24px | Inside cards/callouts |

---

## Persistent Chrome

### Header Bar (every slide except Title and Closing)

```
┌─────────────────────────────────────────────────────────────────┐
│ [NEXT90 logo]          [Module A] [Module B] [Module C] [...]   │
│                         ────────                                │
│                         (active = blue underline)               │
└─────────────────────────────────────────────────────────────────┘
```

- Background: `header-bg` (#262626)
- NEXT90 reversed logo, left-aligned, height ~24px
- Module tabs right-aligned, `tab` typography
- Active module: `interactive` (#0f62fe) underline, white text
- Inactive modules: `text-secondary-dark` (#c6c6c6), no underline
- Tabs are **dynamically generated** from the CRM-assembled module list
- Clicking a tab navigates to that module's section divider

### Footer Bar (every slide except Title and Closing)

```
┌─────────────────────────────────────────────────────────────────┐
│ Prepared for Acme Corp  |  March 2026          Slide 4 of 22   │
└─────────────────────────────────────────────────────────────────┘
```

- Background: `footer-bg` (#161616)
- Left: "Prepared for [Company Name] | [Date]" — `footer` typography, `text-secondary-dark`
- Right: "Slide N of M" — `footer` typography, `text-secondary-dark`
- Company name and date pulled from CRM Opportunity data

---

## Slide Types

### 1. Title Slide (Opening)

- **No header or footer** — full-bleed, immersive
- Background: "The Signal" image (satellite view of US at night, signal pulse)
- Dark overlay gradient (darker on left)
- NEXT90 logo: centered, large (~200px wide), reversed white
- Below logo: "Prepared for **[Company Name]**" — H2, white
- Below: "[Contact Name] | [Date]" — caption, `text-secondary-dark`
- This is the entrance — it should feel like arriving

### 2. Section Divider

- **Header bar active** — active tab switches to this module
- **No footer** — the divider is a moment, not a data slide
- Background: full-bleed atmospheric image (varies by module — see Image Prompts below)
- Left-side dark gradient overlay for text readability
- Module title: H1, white, left-aligned, positioned in left third
- Module subtitle: caption, `highlight-blue` (#93c5fd)
- Example:
  ```
  THE SCIENCE OF INFLUENCE

  Why Attribution
  Is Broken
  ```

### 3. Content Slide

- **Header + footer active**
- Background: `background` (#ffffff) or `layer-01` (#f4f4f4) alternating
- Title: H2, `text-primary`, left-aligned
- Body: left-justified (NEVER centered), `body` typography
- Carbon pictograms as visual anchors where appropriate (same library as website)
- Callout cards: `background-dark` with `text-primary-dark`, `card-padding`
- Stats blocks: `stat-number` + `stat-label` in horizontal row
- All text left-justified. Centered text is never used for body copy.

### 4. Data/Chart Slide

- **Header + footer active**
- Background: `background-dark` (#161616)
- Layout: 40% left (insight text) / 60% right (visualization)
- Left: Key stat or headline in `stat-number` size, supporting text in `body`
- Right: Chart, IDE screenshot, gamma curve, or data visualization
- Chart colors: `interactive` (#0f62fe) for primary, `n90-purple` for secondary, `text-secondary-dark` for gridlines
- This is where the product proof lives

### 5. Closing/CTA Slide (End)

- **No header or footer** — bookend mirrors the Title slide
- Background: "Convergence" image (road to horizon at blue hour)
- Dark overlay gradient
- Headline: "Let's build something true." — H1, white, left-aligned
- Below: Brian Handrigan + Randy Cairns, titles, emails
- Below: n90.co | Phone number
- Optional: QR code to n90.co/contact in bottom-right
- This should feel like an invitation, not a hard close

---

## Module Structure (7 Modules, CRM-Driven)

Each module consists of: 1 Section Divider + 2-8 Content/Data slides.

| Module | Code | Tab Label | Section Image | Purpose |
|--------|------|-----------|---------------|---------|
| Pain: Attribution | A1 | Attribution | "The Signal" variant | Why current attribution is broken |
| Pain: Wasted Spend | A2 | Waste | City grid (dead zones) | Where money disappears |
| Pain: Dead Zones | A3 | Dead Zones | Aerial grid with dark gap | Markets that don't respond |
| Reframe | B | The IDE | Glass corridor | IDE as the answer |
| Credibility | C | Proof | Auditorium | Patents, MRC, press, Inc 5000 |
| Demo | D | Data | Dark canvas | Live IDE walkthrough or screenshots |
| Methodology | E | How | Fiber optic pulse | Gamma curves, three pillars, conflict resolution |
| Onboarding | F | Start | Convergence road | How we work together, timeline |
| Expansion | G | Grow | Cloudscape | What comes after — beyond advertising |

**CRM-driven assembly:** The Twenty CRM Opportunity determines which modules (tabs) appear. A first meeting might include A1 + B + C + F. A technical deep-dive might include A1 + A3 + D + E. The header tabs update dynamically.

---

## Image Prompts for Section Backgrounds

### Style Guide (paste into every fresh Gemini session)

> **NEXT90 presentation background style:** Photorealistic, cinematic, atmospheric. Dark base (deep navy, charcoal, near-black). Dramatic single-source or ambient lighting. Scale and infrastructure — aerial views, architectural spaces, natural phenomena. Landscape 16:9 orientation (1920x1080 minimum). The left third of the image should be relatively dark and clean for text overlay. NO people as focal point. NO text, logos, or UI. NO macro/product shots. NO saturated colors. Think documentary cinematography meets high-end editorial.

### Prompt 1: "The Signal" (Title slide, Module A1)

> Create a photorealistic atmospheric image: A vast nighttime aerial view of the United States from near-space altitude. City clusters glow amber and white against dark terrain. A single bright pulse of light emanates from one city, sending a faint ripple of light outward across the dark landscape — like a signal propagating. The curvature of the Earth is barely visible at the edges. Deep navy space above, dark landmass below, city lights the only warmth. The left third should be darker (less populated terrain) for text overlay. 16:9 landscape, at least 1920x1080px.

### Prompt 2: "Infrastructure" (Module B — The IDE)

> Create a photorealistic atmospheric image: An empty modern glass corridor shot from one end, looking down its length. Cool blue-white LED strip lighting runs along the ceiling, reflecting off polished concrete floors. Glass walls on both sides reveal dark server rooms with subtle blue indicator lights. The corridor stretches into deep shadow at the far end. Minimal, architectural, precise. The left side of the frame should be slightly darker. 16:9 landscape, at least 1920x1080px.

### Prompt 3: "Geography" (Module A3 — Dead Zones)

> Create a photorealistic atmospheric image: Aerial night view of a suburban grid — residential blocks lit by amber streetlights forming a geometric pattern. One rectangular area in the lower-right quadrant is conspicuously dark — a dead zone with no lights. The contrast between the lit grid and the dark gap is the focal point. Shot from directly above, flat perspective. Deep navy sky. The left third of the image should show the lit grid pattern for text overlay readability. 16:9 landscape, at least 1920x1080px.

### Prompt 4: "Weather" (Module G — Beyond Advertising)

> Create a photorealistic atmospheric image: Dramatic cloudscape from high altitude — massive cumulus clouds building over flat agricultural terrain at golden hour. The sun is low on the right horizon, casting long amber light across the cloud tops while the land below is in deep blue shadow. A river cuts through the patchwork farmland below. The left side of the frame is dominated by dark cloud shadow, creating a natural text zone. Scale is vast — this is weather as a force, not decoration. 16:9 landscape, at least 1920x1080px.

### Prompt 5: "Dark Canvas" (Module D — Data slides)

> Create a photorealistic atmospheric image: An abstract minimalist composition — a vast dark surface (like polished obsidian or deep water at night) with very subtle texture. A single thin line of cool blue-white light crosses the lower third horizontally, like a distant horizon or a data baseline. The image is 95% dark negative space with just enough texture to not be flat black. Cinematic grain. 16:9 landscape, at least 1920x1080px.

### Prompt 6: "Convergence" (Module F — Onboarding, Closing slide)

> Create a photorealistic atmospheric image: A single straight road stretching to the horizon at blue hour (just after sunset). The sky is a deep gradient from dark navy above to a thin amber band at the horizon. Streetlights on both sides create a perfect vanishing point perspective. Flat Midwest terrain on either side — open, expansive, nothing competing for attention. The road is the only subject. The left third should be open sky for text. 16:9 landscape, at least 1920x1080px.

### Prompt 7: "Observatory" (Module C — Credibility)

> Create a photorealistic atmospheric image: Interior of a large empty auditorium or lecture hall, shot from the back row looking toward the stage. A single podium is lit by a warm spotlight. The seats are empty. The rest of the space fades into deep shadow. Architectural details — tiered seating, acoustic panels, wood and concrete — are barely visible in ambient light. The mood is anticipatory, serious, earned. 16:9 landscape, at least 1920x1080px.

### Prompt 8: "Pulse" (Module E — Methodology, transitions)

> Create a photorealistic atmospheric image: Extreme close-up of fiber optic strands carrying light — but shot with shallow depth of field so most strands are soft bokeh while 2-3 strands in the center are sharp, carrying bright blue and amber light. Background is pure black. The lit strands should curve from the right side of frame toward the left, leaving the left third dark for text. 16:9 landscape, at least 1920x1080px.

---

## Rules

- **Left-justified text always.** Never center body text.
- **No gradient on headings.** Gradients are ONLY for the NEXT90 logo / IDE typography.
- **Carbon Design System rules.** White or `layer-01` for content backgrounds. Dark (`#161616`) for data slides. `interactive` blue for accents.
- **Pictograms from @carbon/pictograms only.** No hand-made SVGs.
- **IBM Plex Sans everywhere.** No fallback to system fonts in the template.
- **Fresh Gemini session per image.** Old sessions bleed context.
- **Remove Gemini starburst watermark** from bottom-right of all generated images.
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
