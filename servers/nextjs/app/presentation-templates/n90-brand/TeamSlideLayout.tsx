import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-team-slide'
export const layoutName = 'NEXT90 Team Slide'
export const layoutDescription = 'Two-column team slide showing co-founders with photos, titles, and brief bios. Use for credibility section or closing. Photos are 140x140 with object-fit cover.'

const founderSchema = z.object({
  name: z.string().min(2).max(50).default('Name').meta({ description: "Person name" }),
  title: z.string().min(2).max(40).default('Co-Founder').meta({ description: "Title" }),
  bio: z.string().min(10).max(250).default('Brief bio description.').meta({ description: "Short bio" }),
  photo: ImageSchema.default({ __image_url__: '', __image_prompt__: 'Professional headshot' }).meta({ description: "Headshot photo" }),
})

const teamSlideSchema = z.object({
  title: z.string().min(3).max(60).default('The team').meta({ description: "Slide heading" }),
  founders: z.array(founderSchema).min(1).max(2).default([
    { name: 'Brian Handrigan', title: 'Co-Founder', bio: '26 years in advertising technology. Named inventor on 8 patents. MRC standards contributor. Published in Forbes. Inc. 5000 rank #556.', photo: { __image_url__: '/n90-assets/images/brian-handrigan.png', __image_prompt__: 'Brian Handrigan headshot' } },
    { name: 'Randy Cairns', title: 'Co-Founder', bio: 'Two decades from technology leadership to business operations. Former CEO of WellEx. Operational discipline meets measurement science.', photo: { __image_url__: '/n90-assets/images/randy-cairns.png', __image_prompt__: 'Randy Cairns headshot' } },
  ]).meta({ description: "1-2 team members" }),
  activeTab: z.string().min(2).max(30).default('The Proof').meta({ description: "Active nav tab" }),
})

export const Schema = teamSlideSchema
export type TeamSlideData = z.infer<typeof teamSlideSchema>
interface TeamSlideLayoutProps { data?: Partial<TeamSlideData> }

const TeamSlideLayout: React.FC<TeamSlideLayoutProps> = ({ data: slideData }) => {
  const founders = slideData?.founders || []
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

      <div style={{ padding: '68px 32px 48px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 24px', textAlign: 'left' }}>{slideData?.title || 'The team'}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${founders.length}, 1fr)`, gap: '32px' }}>
          {founders.map((founder: any, i: number) => (
            <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              {founder.photo?.__image_url__ && (
                <img src={founder.photo.__image_url__} alt={founder.name} style={{ width: '140px', height: '140px', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0 }} />
              )}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#161616', margin: '0 0 4px' }}>{founder.name}</h3>
                <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#0f62fe', display: 'block', marginBottom: '8px' }}>{founder.title}</span>
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#6f6f6f', margin: 0, textAlign: 'left' }}>{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamSlideLayout
