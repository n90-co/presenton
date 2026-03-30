import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-closing-slide'
export const layoutName = 'NEXT90 Closing Slide'
export const layoutDescription = 'Closing CTA slide with gradient-split layout matching the title slide. Globe image right, headline and co-founder contacts left. Carbon blue CTA button. Use as the final slide.'

const closingSlideSchema = z.object({
  headline: z.string().min(3).max(60).default("Let's build something true.").meta({
    description: "Closing headline — invitation, not a hard sell",
  }),
  closingText: z.string().min(10).max(250).default("The commitment is simple: represent reality. The data sometimes shows your best-performing channel isn't performing. We show you anyway.").meta({
    description: "Supporting statement reinforcing the truth/trust thesis",
  }),
  emphasis: z.string().min(3).max(60).default("That's the commitment.").meta({
    description: "Emphasized closing line — bold weight",
  }),
  ctaText: z.string().min(3).max(40).default('Start the Conversation').meta({
    description: "CTA button text",
  }),
  contactName1: z.string().min(2).max(50).default('Brian Handrigan').meta({ description: "First co-founder name" }),
  contactTitle1: z.string().min(2).max(40).default('Co-Founder').meta({ description: "First co-founder title" }),
  contactEmail1: z.string().min(5).max(50).default('brian@n90.co').meta({ description: "First co-founder email" }),
  contactName2: z.string().min(2).max(50).default('Randy Cairns').meta({ description: "Second co-founder name" }),
  contactTitle2: z.string().min(2).max(40).default('Co-Founder').meta({ description: "Second co-founder title" }),
  contactEmail2: z.string().min(5).max(50).default('randy@n90.co').meta({ description: "Second co-founder email" }),
  website: z.string().min(3).max(30).default('n90.co').meta({ description: "Website URL" }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://staging.n90.co/images/live-map-hero.jpg',
    __image_prompt__: 'Globe from space showing US with glowing activity markers'
  }).meta({
    description: "Globe image — same as title slide for bookend effect",
  }),
})

export const Schema = closingSlideSchema
export type ClosingSlideData = z.infer<typeof closingSlideSchema>

interface ClosingSlideLayoutProps {
  data?: Partial<ClosingSlideData>
}

const ClosingSlideLayout: React.FC<ClosingSlideLayoutProps> = ({ data: slideData }) => {
  const bgUrl = slideData?.backgroundImage?.__image_url__ || 'https://staging.n90.co/images/live-map-hero.jpg'

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#161616' }}
    >
      {/* Gradient-split background — matching title slide */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0" style={{
          width: '55%', backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #161616 40%, rgba(22,22,22,0.6) 65%, transparent 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full" style={{ padding: '48px 64px' }}>
        {/* Logo */}
        <img
          src={(slideData as any)?.__logo_url__ || 'https://staging.n90.co/images/next90-logo-new2-reversed-tight.png'}
          alt="NEXT90" style={{ height: '22px', width: 'auto' }}
        />

        {/* Headline + text */}
        <div className="flex flex-col justify-center flex-1" style={{ maxWidth: '500px' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 300, lineHeight: 1.15, color: '#f4f4f4', margin: '0 0 16px', textAlign: 'left' }}>
            {slideData?.headline || "Let's build something true."}
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#c6c6c6', margin: '0 0 8px', textAlign: 'left' }}>
            {slideData?.closingText || "The commitment is simple: represent reality. The data sometimes shows your best-performing channel isn't performing. We show you anyway."}
          </p>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#f4f4f4', margin: '0 0 24px', textAlign: 'left' }}>
            {slideData?.emphasis || "That's the commitment."}
          </p>

          {/* CTA button — Carbon interactive blue */}
          <a style={{
            display: 'inline-flex', alignItems: 'center', padding: '0 24px', height: '48px',
            backgroundColor: 'var(--cds-interactive, #0f62fe)', color: '#fff',
            textDecoration: 'none', fontSize: '13px', fontFamily: "'IBM Plex Sans', sans-serif",
            width: 'fit-content', marginBottom: '32px',
          }}>
            {slideData?.ctaText || 'Start the Conversation'}
          </a>

          {/* Contacts */}
          <div style={{ display: 'flex', gap: '48px' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#f4f4f4', margin: '0 0 2px' }}>
                {slideData?.contactName1 || 'Brian Handrigan'}
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#93c5fd', margin: '0 0 4px' }}>
                {slideData?.contactTitle1 || 'Co-Founder'}
              </p>
              <p style={{ fontSize: '12px', color: '#8d8d8d', margin: 0 }}>
                {slideData?.contactEmail1 || 'brian@n90.co'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#f4f4f4', margin: '0 0 2px' }}>
                {slideData?.contactName2 || 'Randy Cairns'}
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#93c5fd', margin: '0 0 4px' }}>
                {slideData?.contactTitle2 || 'Co-Founder'}
              </p>
              <p style={{ fontSize: '12px', color: '#8d8d8d', margin: 0 }}>
                {slideData?.contactEmail2 || 'randy@n90.co'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-end">
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f62fe' }}>
            {slideData?.website || 'n90.co'}
          </span>
          <span style={{ fontSize: '12px', color: '#525252' }}>Confidential</span>
        </div>
      </div>
    </div>
  )
}

export default ClosingSlideLayout
