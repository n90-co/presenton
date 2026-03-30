import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-section-divider'
export const layoutName = 'NEXT90 Section Divider'
export const layoutDescription = 'Gradient-split section divider: dark left with section label and title, atmospheric image fading in from right. White header with active cognitive journey tab. Use to introduce new presentation modules.'

const sectionDividerSchema = z.object({
  sectionLabel: z.string().min(2).max(40).default('THE PROBLEM').meta({
    description: "Section category — uppercase (e.g. THE PROBLEM, THE ENGINE, THE PROOF, YOUR DATA, NEXT STEPS)",
  }),
  sectionTitle: z.string().min(3).max(80).default('Why Attribution Is Broken').meta({
    description: "Main section heading — the big idea",
  }),
  sectionSubtitle: z.string().min(0).max(150).default('The numbers have never added up. Here is what actually happens.').meta({
    description: "Supporting line below the title",
  }),
  activeTab: z.string().min(2).max(30).default('The Problem').meta({
    description: "Which cognitive journey tab is active (The Problem, The Engine, The Proof, Your Data, Next Steps)",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://n90.co/blog-campaign-reviews.jpg',
    __image_prompt__: 'Dark atmospheric boardroom with spotlight on report, cinematic'
  }).meta({
    description: "Atmospheric image for right side — gradient-split treatment",
  }),
})

export const Schema = sectionDividerSchema
export type SectionDividerData = z.infer<typeof sectionDividerSchema>

interface SectionDividerLayoutProps {
  data?: Partial<SectionDividerData>
}

const SectionDividerLayout: React.FC<SectionDividerLayoutProps> = ({ data: slideData }) => {
  const bgUrl = slideData?.backgroundImage?.__image_url__ || 'https://n90.co/blog-campaign-reviews.jpg'
  const active = slideData?.activeTab || 'The Problem'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: 'var(--cds-background-inverse, #161616)' }}
    >
      {/* Gradient-split background */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0" style={{
          width: '55%',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #161616 40%, rgba(22,22,22,0.6) 65%, transparent 100%)',
        }} />
      </div>

      {/* White header with active tab */}
      <div style={{
        height: '48px', backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex', alignItems: 'center', padding: '0 32px',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      }}>
        <img src="https://n90.co/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
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

      {/* Content — left side */}
      <div className="relative z-10 flex flex-col justify-center h-full" style={{ padding: '68px 64px 48px', maxWidth: '500px' }}>
        <span style={{
          fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const,
          letterSpacing: '0.32px', color: 'var(--cds-link-primary-hover, #93c5fd)',
          marginBottom: '12px',
        }}>
          {slideData?.sectionLabel || 'THE PROBLEM'}
        </span>

        <h2 style={{
          fontSize: '44px', fontWeight: 300, lineHeight: 1.15,
          color: '#f4f4f4', margin: '0 0 16px', textAlign: 'left',
        }}>
          {slideData?.sectionTitle || 'Why Attribution Is Broken'}
        </h2>

        {slideData?.sectionSubtitle && (
          <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#c6c6c6', margin: 0, textAlign: 'left' }}>
            {slideData.sectionSubtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default SectionDividerLayout
