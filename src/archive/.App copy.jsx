import * as d3 from "d3";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

export const Barplot = ({ data = [] }) => {
  const width = 500;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 20, left: 120 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // D3 scales for math only
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, chartHeight])
    .padding(0.25);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students) || 100])
    .range([0, chartWidth]);

  return (
    <svg
      width={width}
      height={height}
      style={{ background: "#fff", fontFamily: "system-ui, sans-serif" }}
    >
      {/* Chart area group */}
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Subtle gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <line
            key={`grid-${tick}`}
            x1={xScale.range()[1] * tick}
            y1={0}
            x2={xScale.range()[1] * tick}
            y2={chartHeight}
            stroke="#f0f0f0"
            strokeWidth={1}
          />
        ))}

        {/* Bars */}
        {data.map((d) => (
          <rect
            key={`bar-${d.country}`}
            y={yScale(d.country)}
            x={0}
            width={xScale(d.students)}
            height={yScale.bandwidth()}
            fill="#2E5090"
            opacity={0.85}
            style={{ transition: "opacity 0.2s" }}
          />
        ))}

        {/* Country labels (left side) */}
        {data.map((d) => (
          <text
            key={`country-${d.country}`}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            x={-10}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={13}
            fontWeight={500}
            fill="#333"
          >
            {d.country}
          </text>
        ))}

        {/* Value labels (on bars) */}
        {data.map((d) => (
          <text
            key={`value-${d.country}`}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            x={xScale(d.students) + 8}
            dominantBaseline="middle"
            fontSize={12}
            fill="#555"
          >
            {d.students}
          </text>
        ))}
      </g>

      {/* Axis labels */}
      <text
        x={width / 2}
        y={height - 2}
        textAnchor="middle"
        fontSize={11}
        fill="#888"
      >
        Number of Students
      </text>
    </svg>
  );
};

export const Barplot2 = ({ data = [] }) => {
  const width = 500;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 20, left: 120 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // 1️⃣ Do some math with D3
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, chartHeight])
    .padding(0.25);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students) || 100])
    .range([0, chartWidth]);

  // 2️⃣ Render with React (JSX!) using the D3 maths
  return (
    <svg width={width} height={height} style={{ background: "#fff" }}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d) => (
          <rect
            key={d.country}
            y={yScale(d.country)}
            x={0}
            width={xScale(d.students)}
            height={yScale.bandwidth()}
            fill="#E8A87C"
          />
        ))}
        {data.map((d) => (
          <text
            key={`label-${d.country}`}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            x={-10}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={12}
            fill="#333"
          >
            {d.country}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default function App() {
  return (
    <div style={{ padding: "40px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "30px", color: "#333" }}>Students by Country</h1>
      <Barplot data={data} />

      <h1 style={{ marginTop: "60px", marginBottom: "30px", color: "#333" }}>
        Students by Country (Alt Style)
      </h1>
      <Barplot2 data={data} />
    </div>
  );
}
