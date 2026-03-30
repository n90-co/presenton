import React from 'react'
import * as z from "zod"
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'n90-data-slide'
export const layoutName = 'NEXT90 Data Slide'
export const layoutDescription = 'Dark background slide for data visualization, charts, statistics, and metrics. Split layout: insight text on the left 40%, chart or image on the right 60%. Use for presenting data, IDE screenshots, gamma curves, or any quantitative evidence.'

const metricSchema = z.object({
  value: z.string().min(1).max(20).default('200M+').meta({
    description: "Metric value — large stat number (e.g. 200M+, 64%, 254)",
  }),
  label: z.string().min(2).max(60).default('ad airings traced').meta({
    description: "Metric label — what this number represents",
  }),
})

const dataSlideSchema = z.object({
  title: z.string().min(3).max(60).default('The Infrastructure Behind the Engine').meta({
    description: "Slide heading — describes what data is being shown",
  }),
  insight: z.string().min(10).max(250).default('Real-time detection across 254 TV markets. Microsecond event ordering. Over a million geographic entities. The IDE processes billions of events to trace influence from ad exposure to revenue.').meta({
    description: "Key insight or narrative text — the story behind the data",
  }),
  metrics: z.array(metricSchema).min(2).max(4).default([
    { value: '200M+', label: 'ad airings traced across North America' },
    { value: '254', label: 'TV markets including Canadian broadcast' },
    { value: '50+', label: 'patents in cross-media technology' },
    { value: '1M+', label: 'geographic entities across US and Canada' },
  ]).meta({
    description: "2-4 key metrics with large stat values",
  }),
  chartImage: ImageSchema.default({
    __image_url__: '',
    __image_prompt__: 'Data visualization dashboard with gamma curve chart showing TV ad response decay over time'
  }).meta({
    description: "Optional chart image, IDE screenshot, or data visualization for the right panel",
  }),
})

export const Schema = dataSlideSchema
export type DataSlideData = z.infer<typeof dataSlideSchema>

interface DataSlideLayoutProps {
  data?: Partial<DataSlideData>
}

const DataSlideLayout: React.FC<DataSlideLayoutProps> = ({ data: slideData }) => {
  const metrics = slideData?.metrics || Schema._def.defaultValue().metrics

  return (
    <div
      className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden"
      style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#161616' }}
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

      {/* Content: 40/60 split */}
      <div className="flex h-full pt-12">
        {/* Left panel: text + metrics */}
        <div className="w-2/5 flex flex-col justify-center px-16 py-10">
          {/* Section label */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8d8d8d', letterSpacing: '0.32px' }}>
            WHAT WE'VE BUILT
          </p>

          {/* Title */}
          <h2 className="text-2xl font-normal mb-4" style={{ color: '#f4f4f4', textAlign: 'left' }}>
            {slideData?.title || 'The Infrastructure Behind the Engine'}
          </h2>

          {/* Insight text */}
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#c6c6c6', textAlign: 'left', lineHeight: '1.6' }}>
            {slideData?.insight || Schema._def.defaultValue().insight}
          </p>
        </div>

        {/* Right panel: metrics grid or chart */}
        <div className="w-3/5 flex flex-col justify-center px-10 py-10">
          {slideData?.chartImage?.__image_url__ ? (
            <img
              src={slideData.chartImage.__image_url__}
              alt={slideData?.title || ''}
              className="w-full h-auto max-h-96 object-contain rounded"
            />
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric: any, idx: number) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-4xl font-light" style={{ color: '#f4f4f4' }}>
                    {metric.value}
                  </span>
                  <span className="text-sm mt-2 leading-snug" style={{ color: '#8d8d8d' }}>
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-between px-16" style={{ backgroundColor: '#0d0d0d' }}>
        <span className="text-xs" style={{ color: '#525252' }}>
          {(slideData as any)?.__companyName__ ? `Prepared for ${(slideData as any).__companyName__}` : 'NEXT90'}
        </span>
        <span className="text-xs" style={{ color: '#525252' }}>n90.co</span>
      </div>
    </div>
  )
}

export default DataSlideLayout
