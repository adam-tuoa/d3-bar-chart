import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import TotalBox from "./components/TotalBox";

const data = [
  { country: "United States", students: 68, flag: "🇺🇸" },
  { country: "France", students: 21, flag: "🇫🇷" },
  { country: "United Kingdom", students: 21, flag: "🇬🇧" },
  { country: "Germany", students: 20, flag: "🇩🇪" },
  { country: "Switzerland", students: 13, flag: "🇨🇭" },
  { country: "Spain", students: 10, flag: "🇪🇸" },
  { country: "Netherlands", students: 9, flag: "🇳🇱" },
  { country: "India", students: 9, flag: "🇮🇳" },
  { country: "Singapore", students: 8, flag: "🇸🇬" },
  { country: "Ireland", students: 8, flag: "🇮🇪" },
  { country: "Sweden", students: 7, flag: "🇸🇪" },
  { country: "Australia", students: 7, flag: "🇦🇺" },
  { country: "Canada", students: 6, flag: "🇨🇦" },
  { country: "Finland", students: 5, flag: "🇫🇮" },
  { country: "Mexico", students: 4, flag: "🇲🇽" },
  { country: "Brazil", students: 4, flag: "🇧🇷" },
  { country: "Saudi Arabia", students: 3, flag: "🇸🇦" },
  { country: "Romania", students: 3, flag: "🇷🇴" },
  { country: "Philippines", students: 3, flag: "🇵🇭" },
  { country: "New Zealand", students: 3, flag: "🇳🇿" },
];

export const Barplot2 = ({ data = [], width = 650, height = 600 }) => {
  const margin = { top: 20, right: 40, bottom: 20, left: 200 };
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
            fill="#F59E0B"
            rx={10}
            ry={10}
          />
        ))}
        {data.map((d) => (
          <text
            key={`value-${d.country}`}
            x={xScale(d.students) + 8}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            dominantBaseline="middle"
            fontSize={14}
            fill="#333"
            fontWeight={500}
          >
            {d.students}
          </text>
        ))}
        {data.map((d) => (
          <foreignObject
            key={`label-${d.country}`}
            x={-220}
            y={yScale(d.country) + yScale.bandwidth() / 2 - 12}
            width={215}
            height={30}
          >
            <div style={{ textAlign: "right", fontSize: 18, color: "#333" }}>
              {d.country} {d.flag}
            </div>
          </foreignObject>
        ))}
      </g>
    </svg>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(650);
  const [chartHeight, setChartHeight] = useState(600);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 80; // account for padding
        const isMobile = window.innerWidth < 768;

        // Responsive sizing
        const width = Math.min(containerWidth, isMobile ? containerWidth : 650);
        const height = isMobile ? 800 : 600;

        setChartWidth(width);
        setChartHeight(height);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: "40px",
        background: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <h1 style={{ marginBottom: "30px", color: "#333" }}>
          D3 ❤️ React Goes Global
        </h1>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          A chart showing the geographic student diversity of D3 ❤️ React's
          inaugural cohort.
        </p>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Barplot2 data={data} width={chartWidth} height={chartHeight} />
          <div
            style={{
              position: "absolute",
              bottom: Math.max(chartHeight * 0.15, 50),
              right: "30px",
            }}
          >
            <TotalBox
              total={data.reduce((sum, d) => sum + d.students, 0)}
              countries={data.length}
            />
          </div>
        </div>
      </div>
      <Footer
        attribution={{
          text: "Yan Holtz's D3-loves-react course",
          href: "http://d3-loves-react.com",
        }}
        links={[
          {
            href: "https://adam-tuoa.github.io/homepage/",
            label: "Homepage",
            icon: "home",
          },
          {
            href: "https://github.com/adam-tuoa",
            label: "GitHub",
            icon: "github",
          },
        ]}
      />
    </div>
  );
}
