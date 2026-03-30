import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-closing-slide'
export const layoutName = 'NEXT90 Closing Slide'
export const layoutDescription = 'Closing CTA slide with full-bleed atmospheric background, headline invitation, co-founder contact details, and website. Use as the final slide of any presentation. Dark cinematic aesthetic matching the title slide as a bookend.'

const closingSlideSchema = z.object({
  headline: z.string().min(3).max(60).default("Let's build something true.").meta({
    description: "Closing headline — invitation, not a hard sell. Should feel like an opening, not an ending.",
  }),
  closingText: z.string().min(10).max(200).default("The commitment is simple: represent reality. The data sometimes shows your best-performing channel isn't performing. We show you anyway. That's the commitment.").meta({
    description: "Supporting closing statement — reinforces the trust/truth thesis",
  }),
  contactName1: z.string().min(2).max(50).default('Brian Handrigan').meta({
    description: "First co-founder name",
  }),
  contactTitle1: z.string().min(2).max(40).default('Co-Founder').meta({
    description: "First co-founder title",
  }),
  contactEmail1: z.string().min(5).max(50).default('brian@n90.co').meta({
    description: "First co-founder email",
  }),
  contactName2: z.string().min(2).max(50).default('Randy Cairns').meta({
    description: "Second co-founder name",
  }),
  contactTitle2: z.string().min(2).max(40).default('Co-Founder').meta({
    description: "Second co-founder title",
  }),
  contactEmail2: z.string().min(5).max(50).default('randy@n90.co').meta({
    description: "Second co-founder email",
  }),
  website: z.string().min(3).max(30).default('n90.co').meta({
    description: "Website URL (without https://)",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://n90.co/blog-why-were-building.jpg',
    __image_prompt__: 'Straight road stretching to horizon at blue hour with streetlights creating vanishing point perspective, Midwest terrain'
  }).meta({
    description: "Full-bleed atmospheric background — convergence road or similar cinematic landscape",
  }),
})

export const Schema = closingSlideSchema
export type ClosingSlideData = z.infer<typeof closingSlideSchema>

interface ClosingSlideLayoutProps {
  data?: Partial<ClosingSlideData>
}

const ClosingSlideLayout: React.FC<ClosingSlideLayoutProps> = ({ data: slideData }) => {
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
          background: 'linear-gradient(to right, rgba(22,22,22,0.92) 0%, rgba(22,22,22,0.75) 40%, rgba(22,22,22,0.5) 70%, rgba(22,22,22,0.3) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(22,22,22,0.85) 0%, rgba(22,22,22,0.3) 50%, transparent 100%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-16 py-12">
        {/* Logo */}
        <div className="mb-auto">
          {(slideData as any)?.__logo_url__ ? (
            <img src={(slideData as any).__logo_url__} alt="NEXT90" className="h-8" />
          ) : (
            <span className="text-2xl font-light tracking-tight" style={{ color: '#f4f4f4' }}>
              NEXT<span style={{ color: '#0f62fe' }}>90</span>
            </span>
          )}
        </div>

        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">
          <h2 className="text-4xl font-light leading-tight mb-4" style={{ color: '#f4f4f4' }}>
            {slideData?.headline || "Let's build something true."}
          </h2>

          <p className="text-base leading-relaxed mb-10" style={{ color: '#c6c6c6', lineHeight: '1.65' }}>
            {slideData?.closingText || Schema._def.defaultValue().closingText}
          </p>

          {/* Contact cards */}
          <div className="flex gap-8">
            {/* Contact 1 */}
            <div className="flex flex-col">
              <span className="text-base font-medium" style={{ color: '#f4f4f4' }}>
                {slideData?.contactName1 || 'Brian Handrigan'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: '#93c5fd', letterSpacing: '0.32px' }}>
                {slideData?.contactTitle1 || 'Co-Founder'}
              </span>
              <span className="text-sm mt-1" style={{ color: '#8d8d8d' }}>
                {slideData?.contactEmail1 || 'brian@n90.co'}
              </span>
            </div>

            {/* Contact 2 */}
            <div className="flex flex-col">
              <span className="text-base font-medium" style={{ color: '#f4f4f4' }}>
                {slideData?.contactName2 || 'Randy Cairns'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: '#93c5fd', letterSpacing: '0.32px' }}>
                {slideData?.contactTitle2 || 'Co-Founder'}
              </span>
              <span className="text-sm mt-1" style={{ color: '#8d8d8d' }}>
                {slideData?.contactEmail2 || 'randy@n90.co'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between mt-auto">
          <span className="text-sm font-medium" style={{ color: '#0f62fe' }}>
            {slideData?.website || 'n90.co'}
          </span>
          <span className="text-xs" style={{ color: '#525252' }}>
            Confidential
          </span>
        </div>
      </div>
    </div>
  )
}

export default ClosingSlideLayout
