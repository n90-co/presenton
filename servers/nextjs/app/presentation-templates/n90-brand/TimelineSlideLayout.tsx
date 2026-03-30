import React from 'react'
import * as z from "zod"

export const layoutId = 'n90-timeline-slide'
export const layoutName = 'NEXT90 Timeline Slide'
export const layoutDescription = 'White background timeline with milestones. Use for company journey, product evolution, or onboarding process steps. Each milestone has a year/label and description. Carbon border-subtle dividers.'

const milestoneSchema = z.object({
  year: z.string().min(2).max(10).default('2026').meta({ description: "Year or date label" }),
  label: z.string().min(2).max(40).default('Milestone').meta({ description: "Milestone name" }),
  description: z.string().min(10).max(200).default('Description of what happened at this milestone.').meta({ description: "What happened" }),
})

const timelineSlideSchema = z.object({
  title: z.string().min(3).max(60).default('The journey').meta({ description: "Slide heading" }),
  milestones: z.array(milestoneSchema).min(3).max(7).default([
    { year: '2000', label: 'The Signal', description: 'Server logs reveal TV ads drive web traffic — but no way to prove it at scale.' },
    { year: '2007', label: 'Gra Matr', description: 'Brand engagement and digital media strategy. Testing whether influence could be traced.' },
    { year: '2016', label: 'Advocado', description: 'Cross-media data platform connecting offline and online audience insights.' },
    { year: '2018', label: 'Kantar', description: '47 patents in audio/video watermarking. Ad verification at scale.' },
    { year: '2025', label: 'MRC Standards', description: 'Contributed to measurement standards alongside Nielsen, Disney, and FOX.' },
    { year: '2026', label: 'NEXT90', description: 'The infrastructure caught up to the vision. The IDE enters production.' },
  ]).meta({ description: "3-7 milestones in chronological order" }),
  activeTab: z.string().min(2).max(30).default('The Proof').meta({ description: "Active nav tab" }),
})

export const Schema = timelineSlideSchema
export type TimelineSlideData = z.infer<typeof timelineSlideSchema>

interface TimelineSlideLayoutProps {
  data?: Partial<TimelineSlideData>
}

const TimelineSlideLayout: React.FC<TimelineSlideLayoutProps> = ({ data: slideData }) => {
  const milestones = slideData?.milestones || []
  const active = slideData?.activeTab || 'The Proof'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#ffffff' }}
    >
      {/* Header */}
      <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          {tabs.map(tab => (
            <span key={tab} style={{ fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif", color: tab === active ? '#161616' : '#6f6f6f', padding: '14px 16px', borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent' }}>{tab}</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: '28px', backgroundColor: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>{companyName ? `Prepared for ${companyName}` : 'NEXT90'}</span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      {/* Content */}
      <div style={{ padding: '68px 32px 48px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 16px', textAlign: 'left' }}>
          {slideData?.title || 'The journey'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {milestones.map((m: any, i: number) => (
            <div key={i} style={{
              display: 'flex', gap: '24px', padding: '12px 0',
              borderBottom: i < milestones.length - 1 ? '1px solid #e0e0e0' : 'none',
              borderTop: i === 0 ? '1px solid #e0e0e0' : 'none',
            }}>
              <span style={{ fontSize: '24px', fontWeight: 300, color: '#0f62fe', minWidth: '60px', flexShrink: 0 }}>
                {m.year}
              </span>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#161616' }}>{m.label}</span>
                <span style={{ fontSize: '13px', color: '#6f6f6f', marginLeft: '8px' }}> — {m.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineSlideLayout
