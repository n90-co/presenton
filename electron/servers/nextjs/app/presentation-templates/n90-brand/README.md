# NEXT90 Presenton Template — n90-brand

## Template Files

| File | Layout ID | Purpose |
|------|-----------|---------|
| `TitleSlideLayout.tsx` | `n90-title-slide` | Opening slide — full-bleed hero, logo, prospect name, date |
| `SectionDividerLayout.tsx` | `n90-section-divider` | Module entrance — full-bleed hero, section label + title |
| `ContentSlideLayout.tsx` | `n90-content-slide` | Body content — white bg, title, body text, bullet cards with icons |
| `DataSlideLayout.tsx` | `n90-data-slide` | Data/metrics — dark bg, 40/60 split, stats grid or chart image |
| `ClosingSlideLayout.tsx` | `n90-closing-slide` | CTA/closing — full-bleed hero, headline, co-founder contacts |

## Installation

Copy the `n90-brand/` folder into the Presenton instance at:
```
electron/servers/nextjs/app/presentation-templates/n90-brand/
```

Then register in `presentation-templates/index.tsx` — import each layout and add to the `templates` array.

## Design System

- **Font:** IBM Plex Sans (Light 300, Regular 400, SemiBold 600)
- **Primary color:** Carbon Blue `#0f62fe`
- **Brand gradient:** `#4A90E2` → `#7B68EE` (logo/IDE typography only — never on headings)
- **Dark backgrounds:** `#161616` (data slides, footers), `#262626` (header bars)
- **Light backgrounds:** `#ffffff` (content), `#f4f4f4` (alternate/cards)
- **Text light:** `#f4f4f4` (primary on dark), `#c6c6c6` (secondary on dark)
- **Text dark:** `#161616` (primary on light), `#6f6f6f` (secondary on light)
- **Accent:** `#93c5fd` (labels, tags)

## Pictograms

60 Carbon Design System pictograms are available at `https://n90.co/pictograms/[name].svg`. Key ones:

- `context.svg`, `geographic.svg`, `time.svg` — Three pillars
- `conversion.svg`, `connect.svg`, `data-insight.svg` — Measurement
- `weather.svg`, `demographics.svg`, `agriculture.svg` — Non-ad signals
- `chart--multi-type.svg`, `coverage-gap.svg` — Data viz
- `agencies.svg`, `advertisers.svg`, `publishers.svg` — Audiences

## Rules

- Left-justified text always. Never center body text.
- No gradient on headings. Gradients ONLY for logo/IDE typography.
- Slide aspect ratio: 1280x720 (16:9).
- Header bar: 48px, `#262626`, logo left, company name right.
- Footer bar: 32px, `#161616`, prospect name left, n90.co right.
- Title and Closing slides have NO header/footer — they are immersive bookends.
- Section Dividers have header bar only, no footer.
- Background images: atmospheric, dark, cinematic. Never stock photo. Never macro.
