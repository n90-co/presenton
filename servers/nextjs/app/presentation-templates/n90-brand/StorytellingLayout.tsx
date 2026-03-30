import React from 'react'
import * as z from "zod"
import { IconSchema } from '../defaultSchemes'

export const layoutId = 'n90-storytelling'
export const layoutName = 'NEXT90 Storytelling Cards'
export const layoutDescription = 'Three insight cards showing real data stories. Each card has a pictogram, heading, and narrative description. White background with subtle card dividers. Use for case evidence, insights in action, or data stories.'

const storySchema = z.object({
  heading: z.string().min(2).max(40).default('Insight Title').meta({ description: "Story headline" }),
  description: z.string().min(10).max(250).default('Description of what the data showed.').meta({ description: "Narrative description" }),
  icon: IconSchema.default({ __icon_url__: '/n90-assets/pictograms/data-insight.svg', __icon_query__: 'data insight' }).meta({ description: "Carbon pictogram" }),
})

const storytellingSchema = z.object({
  title: z.string().min(3).max(60).default('What the data showed').meta({ description: "Slide heading" }),
  subtitle: z.string().min(0).max(100).default("These aren't testimonials. They're evidence.").meta({ description: "Emphasis subtitle" }),
  stories: z.array(storySchema).min(2).max(3).default([
    { heading: 'News vs. Entertainment', description: 'Broadcast in the upper Midwest: news programming drove 3x more digital response than entertainment. Viewers in a learning mindset respond differently.', icon: { __icon_url__: '/n90-assets/pictograms/viewer-mindset.svg', __icon_query__: 'viewer mindset' } },
    { heading: 'Linear Dead Zones', description: '25% of broadcast coverage areas showed zero digital response. Those became the most efficient programmatic targets in the campaign.', icon: { __icon_url__: '/n90-assets/pictograms/dead-zone.svg', __icon_query__: 'dead zone' } },
    { heading: 'Revenue-Linked Feedback', description: 'Feed Google actual job revenue instead of form fills. Smart Bidding behavior changed within days. The platform started optimizing for real outcomes.', icon: { __icon_url__: '/n90-assets/pictograms/feedback.svg', __icon_query__: 'feedback loop' } },
  ]).meta({ description: "2-3 data stories with pictograms" }),
  activeTab: z.string().min(2).max(30).default('The Proof').meta({ description: "Active nav tab" }),
})

export const Schema = storytellingSchema
export type StorytellingData = z.infer<typeof storytellingSchema>
interface StorytellingLayoutProps { data?: Partial<StorytellingData> }

const StorytellingLayout: React.FC<StorytellingLayoutProps> = ({ data: slideData }) => {
  const stories = slideData?.stories || []
  const active = slideData?.activeTab || 'The Proof'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__

  return (
    <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#ffffff' }}>
      <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>{tabs.map(tab => (<span key={tab} style={{ fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif", color: tab === active ? '#161616' : '#6f6f6f', padding: '14px 16px', borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent' }}>{tab}</span>))}</div>
      </div>
      <div style={{ height: '28px', backgroundColor: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>{companyName ? `Prepared for ${companyName}` : 'NEXT90'}</span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      <div style={{ padding: '68px 32px 48px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 4px', textAlign: 'left' }}>{slideData?.title || 'What the data showed'}</h2>
        <p style={{ fontSize: '16px', fontWeight: 500, color: '#161616', margin: '0 0 20px', textAlign: 'left' }}>{slideData?.subtitle || "These aren't testimonials. They're evidence."}</p>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stories.length}, 1fr)`, gap: '1px', backgroundColor: '#e0e0e0', flex: 1 }}>
          {stories.map((story: any, i: number) => (
            <div key={i} style={{ backgroundColor: '#ffffff', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              {story.icon?.__icon_url__ && <img src={story.icon.__icon_url__} alt={story.heading} style={{ width: '40px', height: '40px', marginBottom: '12px' }} />}
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#161616', margin: '0 0 8px', textAlign: 'left' }}>{story.heading}</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#6f6f6f', margin: 0, textAlign: 'left' }}>{story.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorytellingLayout
