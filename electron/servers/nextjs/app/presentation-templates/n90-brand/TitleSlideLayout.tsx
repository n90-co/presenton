import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-title-slide'
export const layoutName = 'NEXT90 Title Slide'
export const layoutDescription = 'Opening title slide with gradient-split layout: dark left with text, atmospheric image fading in from right. NEXT90 logo, prospect company name, contact, date. Use as the first slide.'

const titleSlideSchema = z.object({
  title: z.string().min(3).max(80).default('The Insights & Data Engine').meta({
    description: "Presentation title — what this deck is about",
  }),
  companyName: z.string().min(2).max(80).default('Acme Corp').meta({
    description: "Prospect company name",
  }),
  contactName: z.string().min(2).max(60).default('Jane Smith').meta({
    description: "Prospect contact name",
  }),
  presentationDate: z.string().min(2).max(30).default('March 2026').meta({
    description: "Presentation date — use current month and year",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://staging.n90.co/images/live-map-hero.jpg',
    __image_prompt__: 'Globe from space showing US with glowing activity markers across cities and TV markets'
  }).meta({
    description: "Atmospheric background image — positioned right with gradient fade left",
  }),
})

export const Schema = titleSlideSchema
export type TitleSlideData = z.infer<typeof titleSlideSchema>

interface TitleSlideLayoutProps {
  data?: Partial<TitleSlideData>
}

const TitleSlideLayout: React.FC<TitleSlideLayoutProps> = ({ data: slideData }) => {
  const bgUrl = slideData?.backgroundImage?.__image_url__ || 'https://staging.n90.co/images/live-map-hero.jpg'

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: 'var(--cds-background-inverse, #161616)' }}
    >
      {/* Gradient-split background: image right, dark fade left */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0" style={{
          width: '55%',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, var(--cds-background-inverse, #161616) 40%, rgba(22,22,22,0.6) 65%, transparent 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full" style={{ padding: '48px 64px' }}>
        {/* Logo */}
        <img
          src={(slideData as any)?.__logo_url__ || 'https://staging.n90.co/images/next90-logo-new2-reversed-tight.png'}
          alt="NEXT90"
          style={{ height: '22px', width: 'auto' }}
        />

        {/* Title — centered vertically, left-aligned */}
        <div className="flex flex-col justify-center flex-1" style={{ maxWidth: '500px' }}>
          <h1 style={{
            fontSize: '44px',
            fontWeight: 300,
            lineHeight: 1.15,
            color: 'var(--cds-text-on-color, #f4f4f4)',
            margin: '0 0 24px',
            textAlign: 'left',
          }}>
            {slideData?.title || 'The Insights & Data Engine'}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--cds-text-helper, #c6c6c6)', margin: '0 0 4px', textAlign: 'left' }}>
            Prepared for
          </p>
          <p style={{ fontSize: '28px', fontWeight: 400, color: 'var(--cds-text-on-color, #f4f4f4)', margin: 0, textAlign: 'left' }}>
            {slideData?.companyName || 'Acme Corp'}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <span style={{ fontSize: '12px', color: 'var(--cds-text-placeholder, #8d8d8d)' }}>
            {slideData?.contactName || 'Jane Smith'}  ·  {slideData?.presentationDate || 'March 2026'}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--cds-text-disabled, #525252)' }}>Confidential</span>
        </div>
      </div>
    </div>
  )
}

export default TitleSlideLayout
