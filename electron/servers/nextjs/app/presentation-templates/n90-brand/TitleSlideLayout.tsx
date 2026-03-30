import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-title-slide'
export const layoutName = 'NEXT90 Title Slide'
export const layoutDescription = 'Opening title slide with full-bleed atmospheric background image, NEXT90 logo centered, prospect company name, contact name, and date. Dark cinematic aesthetic. Use for the first slide of any presentation.'

const titleSlideSchema = z.object({
  title: z.string().min(3).max(60).default('The Insights & Data Engine').meta({
    description: "Presentation title or tagline — what this deck is about",
  }),
  companyName: z.string().min(2).max(80).default('Acme Corp').meta({
    description: "Prospect company name this presentation is prepared for",
  }),
  contactName: z.string().min(2).max(60).default('Jane Smith').meta({
    description: "Name of the prospect contact receiving this presentation",
  }),
  presentationDate: z.string().min(2).max(30).default('March 2026').meta({
    description: "Date of the presentation — use current month and year",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://n90.co/about-hero.jpg',
    __image_prompt__: 'Satellite view of United States at night with city lights glowing amber against dark terrain'
  }).meta({
    description: "Full-bleed atmospheric background image — dark, cinematic, aerial or landscape",
  }),
})

export const Schema = titleSlideSchema
export type TitleSlideData = z.infer<typeof titleSlideSchema>

interface TitleSlideLayoutProps {
  data?: Partial<TitleSlideData>
}

const TitleSlideLayout: React.FC<TitleSlideLayoutProps> = ({ data: slideData }) => {
  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slideData?.backgroundImage?.__image_url__ || 'https://n90.co/about-hero.jpg'}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with left-side gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(22,22,22,0.92) 0%, rgba(22,22,22,0.75) 40%, rgba(22,22,22,0.5) 70%, rgba(22,22,22,0.35) 100%)'
        }} />
        {/* Bottom fade */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(22,22,22,0.8) 0%, transparent 40%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-16 py-12">
        {/* Logo top-left */}
        <div className="mb-auto">
          {(slideData as any)?.__logo_url__ ? (
            <img src={(slideData as any).__logo_url__} alt="NEXT90" className="h-8" />
          ) : (
            <span className="text-2xl font-light tracking-tight" style={{ color: '#f4f4f4' }}>
              NEXT<span style={{ color: '#0f62fe' }}>90</span>
            </span>
          )}
        </div>

        {/* Center content */}
        <div className="flex flex-col items-start justify-center flex-1 max-w-xl">
          {/* Title */}
          <h1 className="text-5xl font-light leading-tight mb-6" style={{ color: '#f4f4f4' }}>
            {slideData?.title || 'The Insights & Data Engine'}
          </h1>

          {/* Accent line */}
          <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: '#0f62fe' }} />

          {/* Prepared for */}
          <p className="text-lg mb-1" style={{ color: '#c6c6c6' }}>
            Prepared for
          </p>
          <p className="text-2xl font-medium mb-8" style={{ color: '#f4f4f4' }}>
            {slideData?.companyName || 'Acme Corp'}
          </p>
        </div>

        {/* Bottom: contact + date */}
        <div className="flex items-end justify-between mt-auto">
          <p className="text-sm" style={{ color: '#8d8d8d' }}>
            {slideData?.contactName || 'Jane Smith'} &middot; {slideData?.presentationDate || 'March 2026'}
          </p>
          <p className="text-xs" style={{ color: '#525252' }}>
            Confidential
          </p>
        </div>
      </div>
    </div>
  )
}

export default TitleSlideLayout
