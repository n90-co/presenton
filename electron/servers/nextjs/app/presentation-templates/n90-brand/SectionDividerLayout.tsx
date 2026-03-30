import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-section-divider'
export const layoutName = 'NEXT90 Section Divider'
export const layoutDescription = 'Full-bleed atmospheric background with module title and subtitle. Use to introduce a new section or module of the presentation. Dark cinematic overlay with text left-aligned.'

const sectionDividerSchema = z.object({
  sectionLabel: z.string().min(2).max(40).default('THE SCIENCE OF INFLUENCE').meta({
    description: "Section category label — uppercase, short (e.g. THE SCIENCE OF INFLUENCE, FULL FUNNEL, GEOGRAPHIC INTELLIGENCE)",
  }),
  sectionTitle: z.string().min(3).max(60).default('Why Attribution Is Broken').meta({
    description: "Main section heading — the big idea for this module",
  }),
  sectionSubtitle: z.string().min(0).max(120).default('The numbers have never added up. Here is what actually happens.').meta({
    description: "Optional supporting line below the title",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://n90.co/blog-why-were-building.jpg',
    __image_prompt__: 'Atmospheric highway converging to vanishing point at dusk with streetlights'
  }).meta({
    description: "Full-bleed atmospheric background — dark, cinematic, matches the section topic",
  }),
})

export const Schema = sectionDividerSchema
export type SectionDividerData = z.infer<typeof sectionDividerSchema>

interface SectionDividerLayoutProps {
  data?: Partial<SectionDividerData>
}

const SectionDividerLayout: React.FC<SectionDividerLayoutProps> = ({ data: slideData }) => {
  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={slideData?.backgroundImage?.__image_url__ || 'https://n90.co/blog-why-were-building.jpg'}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(22,22,22,0.92) 0%, rgba(22,22,22,0.7) 45%, rgba(22,22,22,0.3) 80%, rgba(22,22,22,0.15) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(22,22,22,0.6) 0%, transparent 30%)'
        }} />
      </div>

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center px-16 z-20" style={{ backgroundColor: 'rgba(38,38,38,0.85)' }}>
        {(slideData as any)?.__logo_url__ ? (
          <img src={(slideData as any).__logo_url__} alt="NEXT90" className="h-5" />
        ) : (
          <span className="text-sm font-light tracking-tight" style={{ color: '#f4f4f4' }}>
            NEXT<span style={{ color: '#0f62fe' }}>90</span>
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-16 pt-12">
        <div className="max-w-lg">
          {/* Section label */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#93c5fd', letterSpacing: '0.32px' }}>
            {slideData?.sectionLabel || 'THE SCIENCE OF INFLUENCE'}
          </p>

          {/* Section title */}
          <h2 className="text-5xl font-light leading-tight mb-4" style={{ color: '#f4f4f4' }}>
            {slideData?.sectionTitle || 'Why Attribution Is Broken'}
          </h2>

          {/* Accent line */}
          <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: '#0f62fe' }} />

          {/* Subtitle */}
          {slideData?.sectionSubtitle && (
            <p className="text-lg leading-relaxed" style={{ color: '#c6c6c6' }}>
              {slideData.sectionSubtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionDividerLayout
