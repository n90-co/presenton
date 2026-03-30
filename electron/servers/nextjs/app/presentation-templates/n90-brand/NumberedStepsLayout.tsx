import React from 'react'
import * as z from "zod"

export const layoutId = 'n90-numbered-steps'
export const layoutName = 'NEXT90 Numbered Steps'
export const layoutDescription = 'Onboarding or process slide with numbered steps. Each step has a blue circle number and description. Use for implementation process, how we work together, or any sequential flow.'

const stepSchema = z.object({
  text: z.string().min(5).max(200).default('Step description').meta({ description: "What happens in this step" }),
})

const numberedStepsSchema = z.object({
  title: z.string().min(3).max(60).default('How we work together').meta({ description: "Slide heading" }),
  steps: z.array(stepSchema).min(3).max(6).default([
    { text: 'Connect your data sources — ad logs, web analytics, CRM, phone system' },
    { text: 'We build your unified taxonomy and calibrate the gamma response model' },
    { text: 'Your dashboard goes live — self-serve, AI-assisted, your data, your questions' },
    { text: 'Revenue signals feed back to Google, Meta, and your DSP algorithms' },
    { text: 'Ongoing optimization — the IDE learns from every cycle' },
  ]).meta({ description: "3-6 sequential steps" }),
  activeTab: z.string().min(2).max(30).default('Next Steps').meta({ description: "Active nav tab" }),
})

export const Schema = numberedStepsSchema
export type NumberedStepsData = z.infer<typeof numberedStepsSchema>

interface NumberedStepsLayoutProps {
  data?: Partial<NumberedStepsData>
}

const NumberedStepsLayout: React.FC<NumberedStepsLayoutProps> = ({ data: slideData }) => {
  const steps = slideData?.steps || []
  const active = slideData?.activeTab || 'Next Steps'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__

  return (
    <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#ffffff' }}>
      <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          {tabs.map(tab => (<span key={tab} style={{ fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif", color: tab === active ? '#161616' : '#6f6f6f', padding: '14px 16px', borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent' }}>{tab}</span>))}
        </div>
      </div>
      <div style={{ height: '28px', backgroundColor: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>{companyName ? `Prepared for ${companyName}` : 'NEXT90'}</span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      <div style={{ padding: '68px 32px 48px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 24px', textAlign: 'left' }}>
          {slideData?.title || 'How we work together'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {steps.map((step: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '12px 0' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0f62fe',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{i + 1}</span>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#161616', margin: 0, textAlign: 'left', paddingTop: '4px' }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NumberedStepsLayout
