import React from 'react'
import * as z from "zod"
import { IconSchema } from '../defaultSchemes'

export const layoutId = 'n90-content-slide'
export const layoutName = 'NEXT90 Content Slide'
export const layoutDescription = 'White background content slide with title, body text, and 2-4 bullet cards on Carbon layer-01 tiles with pictogram icons. White header with cognitive journey tabs, dark footer. Left-justified text throughout.'

const bulletSchema = z.object({
  heading: z.string().min(2).max(40).default('Key Point').meta({
    description: "Bold heading for this card",
  }),
  description: z.string().min(10).max(200).default('Supporting detail that explains the key point with specific evidence.').meta({
    description: "Supporting text for this card",
  }),
  icon: IconSchema.default({
    __icon_url__: '',
    __icon_query__: 'data analytics'
  }).meta({
    description: "Carbon pictogram icon — use queries like: context, geographic, time, weather, conversion, data-insight",
  }),
})

const contentSlideSchema = z.object({
  title: z.string().min(3).max(60).default('What the Data Shows').meta({
    description: "Slide heading — clear, specific, left-aligned",
  }),
  description: z.string().min(10).max(300).default('The IDE traces influence across every channel and every signal through one unified taxonomy. Three pillars determine whether influence actually occurred.').meta({
    description: "Body paragraph supporting the title",
  }),
  bullets: z.array(bulletSchema).min(2).max(4).default([
    { heading: 'Context', description: 'What else was happening — weather, programming, day of week, competitive activity.', icon: { __icon_url__: 'https://n90.co/pictograms/context.svg', __icon_query__: 'context analysis' } },
    { heading: 'Geography', description: 'Which market to measure — 254 TV markets, over 1M geographic entities.', icon: { __icon_url__: 'https://n90.co/pictograms/geography.svg', __icon_query__: 'geographic location' } },
    { heading: 'Time', description: 'When the ad aired and when the response occurred — gamma time-decay calibration.', icon: { __icon_url__: 'https://n90.co/pictograms/time.svg', __icon_query__: 'time clock' } },
  ]).meta({
    description: "2-4 cards with headings, descriptions, and Carbon pictogram icons from n90.co/pictograms/",
  }),
})

export const Schema = contentSlideSchema
export type ContentSlideData = z.infer<typeof contentSlideSchema>

interface ContentSlideLayoutProps {
  data?: Partial<ContentSlideData>
}

const N90Header: React.FC<{ activeTab?: string; companyName?: string }> = ({ activeTab, companyName }) => {
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  return (
    <div style={{
      height: '48px',
      backgroundColor: 'var(--cds-background, #ffffff)',
      borderBottom: '1px solid var(--cds-border-subtle, #e0e0e0)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      position: 'absolute',
      top: 0, left: 0, right: 0,
      zIndex: 20,
    }}>
      <img src="https://n90.co/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 0 }}>
        {tabs.map(tab => (
          <span key={tab} style={{
            fontSize: '12px',
            fontFamily: "'IBM Plex Sans', sans-serif",
            color: tab === activeTab ? 'var(--cds-text-primary, #161616)' : 'var(--cds-text-secondary, #6f6f6f)',
            padding: '14px 16px',
            borderBottom: tab === activeTab ? '2px solid var(--cds-interactive, #0f62fe)' : '2px solid transparent',
            cursor: 'pointer',
          }}>
            {tab}
          </span>
        ))}
      </div>
      {companyName && (
        <span style={{ fontSize: '12px', color: 'var(--cds-text-placeholder, #8d8d8d)', marginLeft: '24px' }}>
          {companyName}
        </span>
      )}
    </div>
  )
}

const N90Footer: React.FC<{ companyName?: string }> = ({ companyName }) => (
  <div style={{
    height: '28px',
    backgroundColor: 'var(--cds-background-inverse, #161616)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
  }}>
    <span style={{ fontSize: '11px', color: 'var(--cds-text-disabled, #525252)' }}>
      {companyName ? `Prepared for ${companyName}  |  March 2026` : 'NEXT90'}
    </span>
    <span style={{ fontSize: '11px', color: 'var(--cds-text-disabled, #525252)' }}>n90.co</span>
  </div>
)

const ContentSlideLayout: React.FC<ContentSlideLayoutProps> = ({ data: slideData }) => {
  const bullets = slideData?.bullets || []
  const companyName = (slideData as any)?.__companyName__

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: 'var(--cds-background, #ffffff)' }}
    >
      <N90Header activeTab="The Engine" companyName={companyName} />
      <N90Footer companyName={companyName} />

      {/* Content — Carbon grid layout */}
      <div style={{ padding: '68px 32px 48px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Title — matches website h2: 1.75rem weight 400 */}
        <h2 style={{
          fontSize: '28px', fontWeight: 400, color: 'var(--cds-text-primary, #161616)',
          margin: '0 0 12px', textAlign: 'left',
        }}>
          {slideData?.title || 'What the Data Shows'}
        </h2>

        {/* Body */}
        <p style={{
          fontSize: '15px', lineHeight: 1.65, color: 'var(--cds-text-secondary, #6f6f6f)',
          margin: '0 0 24px', textAlign: 'left', maxWidth: '800px',
        }}>
          {slideData?.description || 'The IDE traces influence across every channel and every signal through one unified taxonomy.'}
        </p>

        {/* Carbon Tile cards — matching abt-signals pattern */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${bullets.length}, 1fr)`,
          gap: '1px',
          backgroundColor: 'var(--cds-border-subtle, #e0e0e0)',
          flex: 1,
        }}>
          {bullets.map((bullet: any, idx: number) => (
            <div key={idx} style={{
              backgroundColor: 'var(--cds-layer-01, #f4f4f4)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Pictogram — real SVG from n90.co */}
              {bullet.icon?.__icon_url__ && (
                <img
                  src={bullet.icon.__icon_url__}
                  alt={bullet.heading}
                  style={{ width: '48px', height: '48px', marginBottom: '16px' }}
                />
              )}
              {/* Heading — matches website: 1rem semibold */}
              <h3 style={{
                fontSize: '15px', fontWeight: 600, color: 'var(--cds-text-primary, #161616)',
                margin: '0 0 8px', textAlign: 'left',
              }}>
                {bullet.heading}
              </h3>
              {/* Body — 0.875rem text-secondary */}
              <p style={{
                fontSize: '13px', lineHeight: 1.5, color: 'var(--cds-text-secondary, #6f6f6f)',
                margin: 0, textAlign: 'left',
              }}>
                {bullet.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { N90Header, N90Footer }
export default ContentSlideLayout
