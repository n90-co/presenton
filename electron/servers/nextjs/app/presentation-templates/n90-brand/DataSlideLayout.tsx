import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-data-slide'
export const layoutName = 'NEXT90 Data Slide'
export const layoutDescription = 'Dark gradient-split slide for data: narrative text and stats on left, chart image or visualization on right. Use for gamma curves, market maps, IDE screenshots, or any quantitative evidence.'

const metricSchema = z.object({
  value: z.string().min(1).max(20).default('200M+').meta({
    description: "Metric value — large stat number",
  }),
  label: z.string().min(2).max(60).default('ad airings traced').meta({
    description: "What this number represents",
  }),
})

const dataSlideSchema = z.object({
  sectionLabel: z.string().min(2).max(40).default('WHAT WE\'VE BUILT').meta({
    description: "Section label — uppercase, short",
  }),
  title: z.string().min(3).max(60).default('The Infrastructure Behind the Engine').meta({
    description: "Slide heading",
  }),
  insight: z.string().min(10).max(300).default('Real-time detection across 254 TV markets. Microsecond event ordering. Over a million geographic entities.').meta({
    description: "Narrative text explaining the data",
  }),
  highlightStat: z.string().min(1).max(20).default('64%').meta({
    description: "One big highlight stat shown in blue",
  }),
  highlightLabel: z.string().min(2).max(80).default('of TV-attributed sessions within 90 seconds').meta({
    description: "Label for the highlight stat",
  }),
  metrics: z.array(metricSchema).min(0).max(4).default([]).meta({
    description: "Optional 2-4 key metrics with stat values — shown if no chart image",
  }),
  chartImage: ImageSchema.default({
    __image_url__: '',
    __image_prompt__: 'Data visualization showing gamma response curve with TV ad response decay over time'
  }).meta({
    description: "Chart image, IDE screenshot, or map for the right panel",
  }),
  backgroundImage: ImageSchema.default({
    __image_url__: '',
    __image_prompt__: 'Globe map showing illuminated TV markets across North America at night'
  }).meta({
    description: "Optional atmospheric image for right side (gradient-split treatment)",
  }),
})

export const Schema = dataSlideSchema
export type DataSlideData = z.infer<typeof dataSlideSchema>

interface DataSlideLayoutProps {
  data?: Partial<DataSlideData>
}

const DataSlideLayout: React.FC<DataSlideLayoutProps> = ({ data: slideData }) => {
  const companyName = (slideData as any)?.__companyName__
  const metrics = slideData?.metrics || []
  const chartUrl = slideData?.chartImage?.__image_url__
  const bgUrl = slideData?.backgroundImage?.__image_url__
  const hasRightImage = chartUrl || bgUrl
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: 'var(--cds-background-inverse, #161616)' }}
    >
      {/* Gradient-split background if we have an image */}
      {bgUrl && (
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
      )}

      {/* White header */}
      <div style={{
        height: '48px',
        backgroundColor: 'var(--cds-background, #ffffff)',
        borderBottom: '1px solid var(--cds-border-subtle, #e0e0e0)',
        display: 'flex', alignItems: 'center', padding: '0 32px',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      }}>
        <img src="https://n90.co/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <span key={tab} style={{
              fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif",
              color: tab === 'Your Data' ? '#161616' : '#6f6f6f',
              padding: '14px 16px',
              borderBottom: tab === 'Your Data' ? '2px solid #0f62fe' : '2px solid transparent',
            }}>{tab}</span>
          ))}
        </div>
      </div>

      {/* Dark footer */}
      <div style={{
        height: '28px', backgroundColor: '#0d0d0d',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0,
      }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>
          {companyName ? `Prepared for ${companyName}` : 'NEXT90'}
        </span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      {/* Content */}
      <div className="relative z-10" style={{ padding: '68px 32px 48px', height: '100%', display: 'flex' }}>
        {/* Left panel — text + stats */}
        <div style={{ width: hasRightImage ? '45%' : '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          {/* Section label */}
          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#8d8d8d', marginBottom: '8px' }}>
            {slideData?.sectionLabel || 'WHAT WE\'VE BUILT'}
          </span>
          {/* Title */}
          <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#f4f4f4', margin: '0 0 16px', textAlign: 'left' }}>
            {slideData?.title || 'The Infrastructure Behind the Engine'}
          </h2>
          {/* Insight */}
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#c6c6c6', margin: '0 0 24px', textAlign: 'left' }}>
            {slideData?.insight || Schema._def.defaultValue().insight}
          </p>
          {/* Highlight stat */}
          {slideData?.highlightStat && (
            <div style={{ marginTop: 'auto' }}>
              <span style={{ fontSize: '38px', fontWeight: 300, color: 'var(--cds-interactive, #0f62fe)' }}>
                {slideData.highlightStat}
              </span>
              <p style={{ fontSize: '12px', color: '#8d8d8d', margin: '4px 0 0' }}>
                {slideData?.highlightLabel}
              </p>
            </div>
          )}
        </div>

        {/* Right panel — chart or metrics */}
        {hasRightImage ? (
          <div style={{ width: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '24px' }}>
            {chartUrl && (
              <img src={chartUrl} alt={slideData?.title || ''} style={{
                maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px',
              }} />
            )}
          </div>
        ) : metrics.length > 0 ? (
          <div style={{ width: '55%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', alignContent: 'center', paddingLeft: '40px' }}>
            {metrics.map((m: any, i: number) => (
              <div key={i}>
                <span style={{ fontSize: '38px', fontWeight: 300, color: '#f4f4f4' }}>{m.value}</span>
                <p style={{ fontSize: '12px', color: '#8d8d8d', marginTop: '8px' }}>{m.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DataSlideLayout
