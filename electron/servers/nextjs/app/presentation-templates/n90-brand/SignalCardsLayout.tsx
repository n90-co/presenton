import React from 'react'
import * as z from "zod"
import { IconSchema } from '../defaultSchemes'

export const layoutId = 'n90-signal-cards'
export const layoutName = 'NEXT90 Signal Cards'
export const layoutDescription = 'Two-column card layout for non-advertising signals like weather and demographics. Layer-01 backgrounds with pictograms. Use for beyond-advertising content, signal explanation, or feature comparison.'

const signalSchema = z.object({
  heading: z.string().min(2).max(30).default('Signal Name').meta({ description: "Card heading" }),
  description: z.string().min(10).max(250).default('What this signal measures and why it matters.').meta({ description: "Card body" }),
  icon: IconSchema.default({ __icon_url__: '/n90-assets/pictograms/weather.svg', __icon_query__: 'weather' }).meta({ description: "Carbon pictogram" }),
})

const signalCardsSchema = z.object({
  title: z.string().min(3).max(60).default('Beyond advertising signals').meta({ description: "Slide heading" }),
  description: z.string().min(10).max(200).default("Most platforms trace advertising and stop. The IDE traces all influence — because advertising is never the only thing happening.").meta({ description: "Body text" }),
  signals: z.array(signalSchema).min(2).max(2).default([
    { heading: 'Weather', description: 'A 115-degree day in Phoenix changes call volume for HVAC companies within hours. Precipitation patterns shift demand for agricultural equipment across regions.', icon: { __icon_url__: '/n90-assets/pictograms/weather.svg', __icon_query__: 'weather' } },
    { heading: 'Demographics', description: 'Block-level census data and household characteristics determine who responds to what, and where. Agriculture data creates precision audiences no DSP carries.', icon: { __icon_url__: '/n90-assets/pictograms/demographics.svg', __icon_query__: 'demographics' } },
  ]).meta({ description: "Two signal cards" }),
  emphasis: z.string().min(0).max(150).default("This is why it's called the Insights & Data Engine, not a TV measurement platform.").meta({ description: "Emphasis line below cards" }),
  activeTab: z.string().min(2).max(30).default('The Engine').meta({ description: "Active nav tab" }),
})

export const Schema = signalCardsSchema
export type SignalCardsData = z.infer<typeof signalCardsSchema>
interface SignalCardsLayoutProps { data?: Partial<SignalCardsData> }

const SignalCardsLayout: React.FC<SignalCardsLayoutProps> = ({ data: slideData }) => {
  const signals = slideData?.signals || []
  const active = slideData?.activeTab || 'The Engine'
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

      <div style={{ padding: '68px 32px 48px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 8px', textAlign: 'left' }}>{slideData?.title || 'Beyond advertising signals'}</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#6f6f6f', margin: '0 0 20px', textAlign: 'left' }}>{slideData?.description || "Most platforms trace advertising and stop."}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: '#e0e0e0', flex: 1 }}>
          {signals.map((signal: any, i: number) => (
            <div key={i} style={{ backgroundColor: '#f4f4f4', padding: '24px' }}>
              {signal.icon?.__icon_url__ && <img src={signal.icon.__icon_url__} alt={signal.heading} style={{ width: '48px', height: '48px', marginBottom: '12px' }} />}
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#161616', margin: '0 0 8px', textAlign: 'left' }}>{signal.heading}</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#6f6f6f', margin: 0, textAlign: 'left' }}>{signal.description}</p>
            </div>
          ))}
        </div>

        {slideData?.emphasis && (
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#161616', margin: '16px 0 0', textAlign: 'left' }}>{slideData.emphasis}</p>
        )}
      </div>
    </div>
  )
}

export default SignalCardsLayout
