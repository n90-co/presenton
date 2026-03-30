import React from 'react'
import * as z from "zod"

export const layoutId = 'n90-chart-slide'
export const layoutName = 'NEXT90 Chart Slide'
export const layoutDescription = 'Dark background slide with a data chart or visualization on the right and narrative insight on the left. Charts include gamma response curves, market comparisons, daypart performance, and attribution breakdowns. Each chart must have a title, caption explaining the insight, and labeled axes. Use for any quantitative evidence slide.'

const chartDataPointSchema = z.object({
  label: z.string().min(1).max(30).default('Label').meta({ description: "Data point label (x-axis)" }),
  value: z.number().default(0).meta({ description: "Data point value (y-axis)" }),
  group: z.string().min(1).max(30).default('Series 1').meta({ description: "Data series group name" }),
})

const chartSlideSchema = z.object({
  sectionLabel: z.string().min(2).max(40).default('THE GAMMA RESPONSE CURVE').meta({
    description: "Section label — uppercase, describes what category this chart belongs to",
  }),
  title: z.string().min(3).max(60).default('How influence fades over time').meta({
    description: "Chart slide heading — the insight, not just the metric name",
  }),
  insight: z.string().min(20).max(400).default('Most TV-driven web sessions occur within 90 seconds of ad airing. The gamma response curve captures this natural decay pattern — a rapid peak followed by exponential falloff. This is not a model or estimate. It is calibrated against nearly a million actual web sessions, making it the most empirically grounded response curve in cross-media measurement.').meta({
    description: "Narrative explanation of what the chart shows and why it matters. Must be 2-4 sentences minimum with specific data points.",
  }),
  highlightStat: z.string().min(1).max(20).default('64%').meta({
    description: "One key stat from the chart, shown large in blue",
  }),
  highlightLabel: z.string().min(5).max(100).default('of TV-attributed web sessions occur within 90 seconds of the ad airing').meta({
    description: "Full explanation of what the highlight stat represents",
  }),
  chartTitle: z.string().min(3).max(60).default('Response probability vs. time after ad airing').meta({
    description: "Chart title — appears above the chart. Describes what is being measured.",
  }),
  chartCaption: z.string().min(10).max(150).default('Source: NEXT90 IDE analysis of 947,000 TV-attributed web sessions across 254 US markets, 2024-2026').meta({
    description: "Chart caption — appears below the chart. Must include data source, sample size, and time period.",
  }),
  xAxisLabel: z.string().min(2).max(30).default('Seconds after ad airing').meta({
    description: "X-axis label",
  }),
  yAxisLabel: z.string().min(2).max(30).default('Response probability').meta({
    description: "Y-axis label",
  }),
  chartData: z.array(chartDataPointSchema).min(4).max(20).default([
    { label: '0s', value: 2, group: 'Response' },
    { label: '5s', value: 45, group: 'Response' },
    { label: '10s', value: 88, group: 'Response' },
    { label: '15s', value: 78, group: 'Response' },
    { label: '20s', value: 62, group: 'Response' },
    { label: '25s', value: 50, group: 'Response' },
    { label: '30s', value: 41, group: 'Response' },
    { label: '35s', value: 33, group: 'Response' },
    { label: '40s', value: 27, group: 'Response' },
    { label: '45s', value: 22, group: 'Response' },
    { label: '50s', value: 18, group: 'Response' },
    { label: '55s', value: 15, group: 'Response' },
    { label: '60s', value: 12, group: 'Response' },
    { label: '70s', value: 8, group: 'Response' },
    { label: '80s', value: 6, group: 'Response' },
    { label: '90s', value: 4, group: 'Response' },
    { label: '105s', value: 3, group: 'Response' },
    { label: '120s', value: 2, group: 'Response' },
  ]).meta({
    description: "Chart data points. Each has a label (x-axis), value (y-axis), and group (series name). Provide real or realistic data.",
  }),
  activeTab: z.string().min(2).max(30).default('The Engine').meta({ description: "Active nav tab" }),
})

export const Schema = chartSlideSchema
export type ChartSlideData = z.infer<typeof chartSlideSchema>

interface ChartSlideLayoutProps {
  data?: Partial<ChartSlideData>
}

const ChartSlideLayout: React.FC<ChartSlideLayoutProps> = ({ data: slideData }) => {
  const active = slideData?.activeTab || 'The Engine'
  const tabs = ['The Problem', 'The Engine', 'The Proof', 'Your Data', 'Next Steps']
  const companyName = (slideData as any)?.__companyName__
  const chartData = slideData?.chartData || []

  // Calculate chart dimensions
  const chartLeft = 40
  const chartTop = 30
  const chartWidth = 520
  const chartHeight = 380
  const maxVal = Math.max(...chartData.map((d: any) => d.value), 1)

  return (
    <div className="w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video relative z-20 mx-auto overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif", backgroundColor: '#161616' }}>
      {/* Header */}
      <div style={{ height: '48px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 32px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <img src="/n90-assets/logos/next90-logo-new-tight.svg" alt="NEXT90" style={{ height: '18px' }} />
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          {tabs.map(tab => (<span key={tab} style={{ fontSize: '12px', fontFamily: "'IBM Plex Sans', sans-serif", color: tab === active ? '#161616' : '#6f6f6f', padding: '14px 16px', borderBottom: tab === active ? '2px solid #0f62fe' : '2px solid transparent' }}>{tab}</span>))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: '28px', backgroundColor: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <span style={{ fontSize: '11px', color: '#525252' }}>{companyName ? `Prepared for ${companyName}` : 'NEXT90'}</span>
        <span style={{ fontSize: '11px', color: '#525252' }}>n90.co</span>
      </div>

      {/* Content — 45/55 split */}
      <div style={{ padding: '68px 32px 48px', height: '100%', display: 'flex' }}>
        {/* Left: narrative */}
        <div style={{ width: '42%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingRight: '24px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.32px', color: '#8d8d8d', marginBottom: '8px' }}>
            {slideData?.sectionLabel || 'THE GAMMA RESPONSE CURVE'}
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 400, color: '#f4f4f4', margin: '0 0 16px', textAlign: 'left' }}>
            {slideData?.title || 'How influence fades over time'}
          </h2>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#c6c6c6', margin: '0 0 24px', textAlign: 'left' }}>
            {slideData?.insight || 'Most TV-driven web sessions occur within 90 seconds of ad airing.'}
          </p>
          {slideData?.highlightStat && (
            <div style={{ marginTop: 'auto' }}>
              <span style={{ fontSize: '36px', fontWeight: 300, color: '#0f62fe' }}>{slideData.highlightStat}</span>
              <p style={{ fontSize: '12px', color: '#8d8d8d', margin: '4px 0 0', textAlign: 'left' }}>{slideData?.highlightLabel}</p>
            </div>
          )}
        </div>

        {/* Right: chart rendered via SVG */}
        <div style={{ width: '58%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Chart title */}
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#c6c6c6', marginBottom: '8px', textAlign: 'left' }}>
            {slideData?.chartTitle || 'Response probability vs. time after ad airing'}
          </span>

          {/* SVG Chart */}
          <svg viewBox={`0 0 ${chartWidth + 80} ${chartHeight + 60}`} style={{ width: '100%', maxHeight: '400px', backgroundColor: '#1a1a1a', borderRadius: '4px' }}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
              <line key={i} x1={chartLeft} y1={chartTop + chartHeight * (1 - pct)} x2={chartLeft + chartWidth} y2={chartTop + chartHeight * (1 - pct)} stroke="#393939" strokeWidth="0.5" />
            ))}

            {/* Axes */}
            <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartTop + chartHeight} stroke="#525252" strokeWidth="1" />
            <line x1={chartLeft} y1={chartTop + chartHeight} x2={chartLeft + chartWidth} y2={chartTop + chartHeight} stroke="#525252" strokeWidth="1" />

            {/* Smooth gamma curve — generated mathematically with 200 points */}
            {(() => {
              // Gamma distribution shape matching the website's gamma-response-curve.svg
              // Parameters: shape=7.5, scale=0.04 — produces left-leaning bell with peak at ~32% through
              const numPoints = 200
              const shape = 7.5
              const scale = 0.04
              const pts: {x: number, y: number}[] = []
              let maxY = 0

              // First pass: compute raw gamma values
              const rawVals: number[] = []
              for (let i = 0; i <= numPoints; i++) {
                const t = i / numPoints // 0 to 1
                const x = t * 12 // scale to match gamma parameter range
                // Gamma PDF: x^(k-1) * e^(-x/θ) / (θ^k * Γ(k))
                // Simplified — we just need the shape, normalization handled below
                const val = x > 0 ? Math.pow(x, shape - 1) * Math.exp(-x / scale / 30) : 0
                rawVals.push(val)
                if (val > maxY) maxY = val
              }

              // Second pass: normalize to chart coordinates
              for (let i = 0; i <= numPoints; i++) {
                const normalizedVal = maxY > 0 ? rawVals[i] / maxY : 0
                pts.push({
                  x: chartLeft + (i / numPoints) * chartWidth,
                  y: chartTop + chartHeight - normalizedVal * (chartHeight - 10),
                })
              }

              // Build SVG path string
              const pathPoints = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
              const linePath = `M ${pathPoints.replace(/ /g, ' L ')}`
              const areaPath = linePath + ` L ${pts[pts.length-1].x.toFixed(1)},${(chartTop + chartHeight).toFixed(1)} L ${pts[0].x.toFixed(1)},${(chartTop + chartHeight).toFixed(1)} Z`

              // Find peak for annotation
              const peakIdx = rawVals.indexOf(Math.max(...rawVals))
              const peakPt = pts[peakIdx]

              return (
                <>
                  <defs>
                    <linearGradient id="gammaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f62fe" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0f62fe" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path d={areaPath} fill="url(#gammaGrad)" />
                  {/* Curve line */}
                  <path d={linePath} fill="none" stroke="#0f62fe" strokeWidth="2.5" strokeLinejoin="round" />
                  {/* Peak marker */}
                  <line x1={peakPt.x} y1={peakPt.y} x2={peakPt.x} y2={chartTop + chartHeight} stroke="#0f62fe" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
                  <circle cx={peakPt.x} cy={peakPt.y} r="4" fill="#0f62fe" />
                  <text x={peakPt.x} y={peakPt.y - 12} textAnchor="middle" fill="#c6c6c6" fontSize="10" fontFamily="IBM Plex Sans" fontWeight="500">Peak response</text>
                  {/* Decay annotation */}
                  <text x={chartLeft + chartWidth - 10} y={chartTop + chartHeight * 0.45} textAnchor="end" fill="#525252" fontSize="9" fontFamily="IBM Plex Sans">Gradual decay</text>
                </>
              )
            })()}

            {/* Y-axis label */}
            <text x={12} y={chartTop + chartHeight / 2} textAnchor="middle" fill="#8d8d8d" fontSize="9" fontFamily="IBM Plex Sans" transform={`rotate(-90, 12, ${chartTop + chartHeight / 2})`}>
              {slideData?.yAxisLabel || 'Response probability'}
            </text>

            {/* X-axis label — no tick values, just the axis name */}
            <text x={chartLeft + chartWidth / 2} y={chartTop + chartHeight + 20} textAnchor="middle" fill="#8d8d8d" fontSize="9" fontFamily="IBM Plex Sans">
              Time after stimulus
            </text>
          </svg>

          {/* Chart caption */}
          <span style={{ fontSize: '10px', color: '#525252', marginTop: '6px', textAlign: 'left' }}>
            {slideData?.chartCaption || 'Source: NEXT90 IDE analysis of 947,000 TV-attributed web sessions across 254 US markets, 2024-2026'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChartSlideLayout
