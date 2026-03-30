import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-dashboard-slide'
export const layoutName = 'NEXT90 Dashboard Output'
export const layoutDescription = 'Full-width or split slide showing actual IDE dashboard output. Use for demo screenshots, data visualizations, market maps, or any output from the Insights & Data Engine. The image should be a screenshot or mockup of real dashboard data. White or dark background depending on context.'

const dashboardSlideSchema = z.object({
  title: z.string().min(3).max(60).default('Your data, your dashboard').meta({
    description: "Slide heading — what the dashboard shows",
  }),
  description: z.string().min(10).max(300).default("Self-serve access to your own data. No black box, no waiting for a vendor to send a report. An AI assistant embedded in every dashboard lets advertisers query their data in plain language. The IDE puts you inside your own measurement — every market, every daypart, every signal.").meta({
    description: "Context for what the dashboard shows — must explain the insight, not just describe the UI",
  }),
  dashboardImage: ImageSchema.default({
    __image_url__: '/n90-assets/images/about-hero.jpg',
    __image_prompt__: 'IDE dashboard showing cross-media attribution data with market-level response visualization'
  }).meta({
    description: "Screenshot or mockup of IDE dashboard output — should show real data visualization",
  }),
  callouts: z.array(z.string()).min(0).max(4).default([
    'Market-level response visualization across 254 DMAs',
    'Real-time detection with microsecond event ordering',
    'AI assistant for plain-language data queries',
    'Revenue-linked conversion tracking fed back to platforms',
  ]).meta({
    description: "Key callout points about what the dashboard shows — 0-4 short bullets",
  }),
  darkMode: z.boolean().default(false).meta({
    description: "Whether to use dark background (true) or white background (false)",
  }),
  activeTab: z.string().min(2).max(30).default('Your Data').meta({ description: "Active nav tab" }),
})

export const Schema = dashboardSlideSchema
export type DashboardSlideData = z.infer<typeof dashboardSlideSchema>
interface DashboardSlideLayoutProps { data?: Partial<DashboardSlideData> }

const DashboardSlideLayout: React.FC<DashboardSlideLayoutProps> = ({ data: slideData }) => {
  const active = slideData?.activeTab || 'Your Data'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__
  const isDark = slideData?.darkMode || false
  const callouts = slideData?.callouts || []
  const bgColor = isDark ? '#161616' : '#ffffff'
  const textColor = isDark ? '#f4f4f4' : '#161616'
  const textSecondary = isDark ? '#c6c6c6' : '#6f6f6f'

  return (
    <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: bgColor }}>
      {/* Header */}
      <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          {tabs.map(tab => (<span key={tab} style={{ fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif", color: tab === active ? '#161616' : '#6f6f6f', padding: '14px 16px', borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent' }}>{tab}</span>))}
        </div>
      </div>
      {/* Footer */}
      <div style={{ height: '28px', backgroundColor: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>{companyName ? `Prepared for ${companyName}` : 'NEXT90'}</span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      {/* Content — title + description left, dashboard image right */}
      <div style={{ padding: '68px 32px 48px', height: '100%', display: 'flex', gap: '24px' }}>
        {/* Left: context */}
        <div style={{ width: '35%', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 400, color: textColor, margin: '0 0 12px', textAlign: 'left' }}>
            {slideData?.title || 'Your data, your dashboard'}
          </h2>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: textSecondary, margin: '0 0 20px', textAlign: 'left' }}>
            {slideData?.description || "Self-serve access to your own data. No black box, no waiting for a vendor to send a report."}
          </p>
          {/* Callout bullets */}
          {callouts.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
              {callouts.map((callout: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#0f62fe', marginTop: '6px', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', lineHeight: 1.4, color: textSecondary }}>{callout}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: dashboard image */}
        <div style={{ width: '65%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={slideData?.dashboardImage?.__image_url__ || '/n90-assets/images/about-hero.jpg'}
            alt={slideData?.title || 'IDE Dashboard'}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              borderRadius: '4px', border: isDark ? '1px solid #393939' : '1px solid #e0e0e0',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardSlideLayout
