import React from 'react'
import * as z from "zod"
import { IconSchema } from '../defaultSchemes'

export const layoutId = 'n90-content-slide'
export const layoutName = 'NEXT90 Content Slide'
export const layoutDescription = 'Light background content slide with title, body text, and optional bullet points with icons. Left-justified text, IBM Plex Sans typography. Use for explanation, narrative, and detail slides. Includes persistent header bar with NEXT90 branding.'

const bulletSchema = z.object({
  heading: z.string().min(2).max(40).default('Key Point').meta({
    description: "Bold heading for this bullet point",
  }),
  description: z.string().min(10).max(200).default('Supporting detail that explains the key point with specific evidence or data.').meta({
    description: "Supporting text for this bullet point",
  }),
  icon: IconSchema.default({
    __icon_url__: '',
    __icon_query__: 'data analytics'
  }).meta({
    description: "Carbon Design pictogram icon for this bullet — use queries like: data analytics, geographic, weather, conversion, connect, context",
  }),
})

const contentSlideSchema = z.object({
  title: z.string().min(3).max(60).default('What the Data Shows').meta({
    description: "Slide heading — clear, specific, left-aligned",
  }),
  description: z.string().min(10).max(300).default('The IDE traces influence across every channel and every signal through one unified taxonomy. Three pillars determine whether influence actually occurred: context, geography, and time.').meta({
    description: "Body paragraph — concise explanation supporting the title",
  }),
  bullets: z.array(bulletSchema).min(2).max(4).default([
    { heading: 'Context', description: 'What else was happening — weather, programming, day of week, competitive activity.', icon: { __icon_url__: '', __icon_query__: 'context analysis' } },
    { heading: 'Geography', description: 'Which market to measure — 254 TV markets, over 1M geographic entities.', icon: { __icon_url__: '', __icon_query__: 'geographic location' } },
    { heading: 'Time', description: 'When the ad aired and when the response occurred — gamma time-decay calibration.', icon: { __icon_url__: '', __icon_query__: 'time clock' } },
  ]).meta({
    description: "2-4 bullet points with headings, descriptions, and Carbon pictogram icons",
  }),
})

export const Schema = contentSlideSchema
export type ContentSlideData = z.infer<typeof contentSlideSchema>

interface ContentSlideLayoutProps {
  data?: Partial<ContentSlideData>
}

const ContentSlideLayout: React.FC<ContentSlideLayoutProps> = ({ data: slideData }) => {
  const bullets = slideData?.bullets || Schema._def.defaultValue().bullets

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#ffffff' }}
    >
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-16 z-20" style={{ backgroundColor: '#262626' }}>
        <div>
          {(slideData as any)?.__logo_url__ ? (
            <img src={(slideData as any).__logo_url__} alt="NEXT90" className="h-5" />
          ) : (
            <span className="text-sm font-light tracking-tight" style={{ color: '#f4f4f4' }}>
              NEXT<span style={{ color: '#0f62fe' }}>90</span>
            </span>
          )}
        </div>
        {(slideData as any)?.__companyName__ && (
          <span className="text-xs" style={{ color: '#8d8d8d' }}>
            {(slideData as any).__companyName__}
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col h-full px-16 pt-20 pb-10">
        {/* Title */}
        <h2 className="text-3xl font-normal mb-3" style={{ color: '#161616', textAlign: 'left' }}>
          {slideData?.title || 'What the Data Shows'}
        </h2>

        {/* Description */}
        <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: '#525252', textAlign: 'left', lineHeight: '1.65' }}>
          {slideData?.description || Schema._def.defaultValue().description}
        </p>

        {/* Bullet cards */}
        <div className="flex gap-px flex-1" style={{ backgroundColor: '#e0e0e0' }}>
          {bullets.map((bullet: any, idx: number) => (
            <div
              key={idx}
              className="flex-1 flex flex-col p-6"
              style={{ backgroundColor: '#f4f4f4' }}
            >
              {/* Icon */}
              {bullet.icon?.__icon_url__ && (
                <img
                  src={bullet.icon.__icon_url__}
                  alt={bullet.heading}
                  className="w-10 h-10 mb-4"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                />
              )}

              {/* Heading */}
              <h3 className="text-base font-semibold mb-2" style={{ color: '#161616', textAlign: 'left' }}>
                {bullet.heading}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: '#6f6f6f', textAlign: 'left', lineHeight: '1.5' }}>
                {bullet.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-16" style={{ backgroundColor: '#161616' }}>
        <span className="text-xs" style={{ color: '#6f6f6f' }}>
          {(slideData as any)?.__companyName__ ? `Prepared for ${(slideData as any).__companyName__}` : 'NEXT90'}
        </span>
        <span className="text-xs" style={{ color: '#6f6f6f' }}>n90.co</span>
      </div>
    </div>
  )
}

export default ContentSlideLayout
