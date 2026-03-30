import React from 'react'
import * as z from "zod"

export const layoutId = 'n90-quote-slide'
export const layoutName = 'NEXT90 Quote Slide'
export const layoutDescription = 'Clean white background slide with a large quote and attribution. Use for founder quotes, customer insights, or key positioning statements. IBM Plex Sans Light typography. Left-justified.'

const quoteSlideSchema = z.object({
  quote: z.string().min(10).max(300).default("We don't take sides. We don't advocate for any channel. We represent what happened and make it actionable.").meta({
    description: "The quote text — impactful, concise, left-aligned",
  }),
  attribution: z.string().min(2).max(80).default('Brian Handrigan, Co-Founder').meta({
    description: "Who said it — name and title",
  }),
  activeTab: z.string().min(2).max(30).default('The Proof').meta({
    description: "Which cognitive journey tab is active",
  }),
})

export const Schema = quoteSlideSchema
export type QuoteSlideData = z.infer<typeof quoteSlideSchema>

interface QuoteSlideLayoutProps {
  data?: Partial<QuoteSlideData>
}

const QuoteSlideLayout: React.FC<QuoteSlideLayoutProps> = ({ data: slideData }) => {
  const active = slideData?.activeTab || 'The Proof'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: 'var(--cds-background, #ffffff)' }}
    >
      {/* White header */}
      <div style={{
        height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0',
        display: 'flex', alignItems: 'center', padding: '0 32px',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <span key={tab} style={{
              fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif",
              color: tab === active ? '#161616' : '#6f6f6f',
              padding: '14px 16px',
              borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent',
            }}>{tab}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        height: '28px', backgroundColor: '#161616',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0,
      }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>
          {companyName ? `Prepared for ${companyName}` : 'NEXT90'}
        </span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      {/* Quote content */}
      <div style={{ padding: '120px 80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <p style={{
          fontSize: '28px', fontWeight: 300, lineHeight: 1.4,
          color: 'var(--cds-text-primary, #161616)', margin: '0 0 24px',
          textAlign: 'left', maxWidth: '800px',
        }}>
          {slideData?.quote || "We don't take sides. We don't advocate for any channel. We represent what happened and make it actionable."}
        </p>
        <span style={{ fontSize: '13px', color: 'var(--cds-text-secondary, #6f6f6f)', textAlign: 'left' }}>
          — {slideData?.attribution || 'Brian Handrigan, Co-Founder'}
        </span>
      </div>
    </div>
  )
}

export default QuoteSlideLayout
