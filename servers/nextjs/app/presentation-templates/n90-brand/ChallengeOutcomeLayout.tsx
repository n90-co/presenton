import React from 'react'
import * as z from "zod"

export const layoutId = 'n90-challenge-outcome'
export const layoutName = 'NEXT90 Challenge and Outcome'
export const layoutDescription = 'Split slide showing a problem on the left and the NEXT90 solution on the right. Layer-01 card backgrounds. Optional highlight stat at the bottom. Use for before/after comparisons or problem/solution framing.'

const challengeOutcomeSchema = z.object({
  title: z.string().min(3).max(60).default('The attribution problem').meta({ description: "Slide heading" }),
  challengeLabel: z.string().min(2).max(20).default('THE CHALLENGE').meta({ description: "Left column label" }),
  challengeText: z.string().min(10).max(400).default("Google says 50 conversions. Facebook says 40. Your TV vendor says 30. You had 60 actual sales. Add up the claimed conversions and they exceed your real revenue by 2x. Every platform grades its own homework.").meta({ description: "Problem description" }),
  outcomeLabel: z.string().min(2).max(20).default('THE OUTCOME').meta({ description: "Right column label" }),
  outcomeText: z.string().min(10).max(400).default("One unified taxonomy that holds every medium to the same standard. No overcounting. No platform bias. The IDE resolves every event through context, geography, and time — so the numbers add up to reality.").meta({ description: "Solution description" }),
  highlightStat: z.string().min(1).max(20).default('64%').meta({ description: "Big highlight stat" }),
  highlightLabel: z.string().min(2).max(100).default('of TV-attributed web sessions occur within 90 seconds of ad airing').meta({ description: "Stat label" }),
  activeTab: z.string().min(2).max(30).default('The Problem').meta({ description: "Active nav tab" }),
})

export const Schema = challengeOutcomeSchema
export type ChallengeOutcomeData = z.infer<typeof challengeOutcomeSchema>

interface ChallengeOutcomeLayoutProps {
  data?: Partial<ChallengeOutcomeData>
}

const ChallengeOutcomeLayout: React.FC<ChallengeOutcomeLayoutProps> = ({ data: slideData }) => {
  const active = slideData?.activeTab || 'The Problem'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__

  return (
    <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          {tabs.map(tab => (<span key={tab} style={{ fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif", color: tab === active ? '#161616' : '#6f6f6f', padding: '14px 16px', borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent' }}>{tab}</span>))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: '28px', backgroundColor: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>{companyName ? `Prepared for ${companyName}` : 'NEXT90'}</span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      {/* Content */}
      <div style={{ padding: '68px 32px 48px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 20px', textAlign: 'left' }}>
          {slideData?.title || 'The attribution problem'}
        </h2>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1 }}>
          {/* Challenge */}
          <div style={{ backgroundColor: '#f4f4f4', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#8d8d8d', marginBottom: '12px' }}>
              {slideData?.challengeLabel || 'THE CHALLENGE'}
            </span>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6f6f6f', margin: 0, textAlign: 'left' }}>
              {slideData?.challengeText || "Google says 50 conversions. Facebook says 40. Your TV vendor says 30. You had 60 actual sales."}
            </p>
          </div>

          {/* Outcome */}
          <div style={{ backgroundColor: '#f4f4f4', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#0f62fe', marginBottom: '12px' }}>
              {slideData?.outcomeLabel || 'THE OUTCOME'}
            </span>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6f6f6f', margin: 0, textAlign: 'left' }}>
              {slideData?.outcomeText || "One unified taxonomy. No overcounting. No platform bias."}
            </p>
          </div>
        </div>

        {/* Highlight stat */}
        {slideData?.highlightStat && (
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '36px', fontWeight: 300, color: '#0f62fe' }}>{slideData.highlightStat}</span>
            <span style={{ fontSize: '14px', color: '#6f6f6f' }}>{slideData?.highlightLabel}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChallengeOutcomeLayout
