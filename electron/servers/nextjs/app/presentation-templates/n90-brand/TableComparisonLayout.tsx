import React from 'react'
import * as z from "zod"

export const layoutId = 'n90-table-comparison'
export const layoutName = 'NEXT90 Table Comparison'
export const layoutDescription = 'Comparison table slide showing NEXT90 IDE against traditional approaches. Dark header row, alternating white/layer-01 rows. Blue highlight for NEXT90 column. Use for competitive differentiation.'

const rowSchema = z.object({
  feature: z.string().min(2).max(40).default('Feature').meta({ description: "Row label (left column)" }),
  col1: z.string().min(1).max(40).default('Value').meta({ description: "First comparison column value" }),
  col2: z.string().min(1).max(40).default('Value').meta({ description: "Second comparison column value" }),
  col3: z.string().min(1).max(40).default('Value').meta({ description: "NEXT90 column value (highlighted)" }),
})

const tableComparisonSchema = z.object({
  title: z.string().min(3).max(60).default('How the IDE compares').meta({ description: "Slide heading" }),
  colHeaders: z.array(z.string()).min(3).max(4).default(['Traditional MTA', 'MMM', 'NEXT90 IDE']).meta({ description: "Column headers (3-4 comparison columns)" }),
  rows: z.array(rowSchema).min(3).max(8).default([
    { feature: 'Granularity', col1: 'Click-level', col2: 'Channel-level', col3: 'Event-level' },
    { feature: 'Speed', col1: 'Real-time', col2: 'Quarterly', col3: 'Real-time' },
    { feature: 'Cross-media', col1: 'No', col2: 'Modeled', col3: 'Deterministic' },
    { feature: 'Non-ad signals', col1: 'No', col2: 'Limited', col3: 'Weather, demos, news' },
    { feature: 'Platform feedback', col1: 'No', col2: 'No', col3: 'Yes — revenue signals' },
    { feature: 'Geography', col1: 'None', col2: 'National', col3: 'DMA → zip code' },
  ]).meta({ description: "Comparison rows" }),
  activeTab: z.string().min(2).max(30).default('The Engine').meta({ description: "Active nav tab" }),
})

export const Schema = tableComparisonSchema
export type TableComparisonData = z.infer<typeof tableComparisonSchema>

interface TableComparisonLayoutProps {
  data?: Partial<TableComparisonData>
}

const TableComparisonLayout: React.FC<TableComparisonLayoutProps> = ({ data: slideData }) => {
  const rows = slideData?.rows || []
  const headers = slideData?.colHeaders || ['Traditional MTA', 'MMM', 'NEXT90 IDE']
  const active = slideData?.activeTab || 'The Engine'
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
        <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#161616', margin: '0 0 20px', textAlign: 'left' }}>
          {slideData?.title || 'How the IDE compares'}
        </h2>

        {/* Table */}
        <div style={{ width: '100%' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: `1fr repeat(${headers.length}, 1fr)`, backgroundColor: '#161616' }}>
            <div style={{ padding: '10px 16px' }} />
            {headers.map((h, i) => (
              <div key={i} style={{ padding: '10px 16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f4' }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row: any, j: number) => (
            <div key={j} style={{
              display: 'grid', gridTemplateColumns: `1fr repeat(${headers.length}, 1fr)`,
              backgroundColor: j % 2 === 0 ? '#ffffff' : '#f4f4f4',
            }}>
              <div style={{ padding: '10px 16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#161616' }}>{row.feature}</span>
              </div>
              {[row.col1, row.col2, row.col3].slice(0, headers.length).map((val: string, k: number) => (
                <div key={k} style={{ padding: '10px 16px' }}>
                  <span style={{ fontSize: '13px', color: k === headers.length - 1 ? '#0f62fe' : '#6f6f6f', fontWeight: k === headers.length - 1 ? 500 : 400 }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableComparisonLayout
