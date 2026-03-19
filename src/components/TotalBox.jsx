export default function TotalBox({ total, countries }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(245, 158, 11, 0.25)",
        borderRadius: "12px",
        padding: "16px 20px",
        textAlign: "center",
        minWidth: "140px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>
            Total Students
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#F59E0B",
              marginTop: "4px",
            }}
          >
            {total}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(245, 158, 11, 0.3)" }}></div>
        <div>
          <div style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>
            Countries
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#F59E0B",
              marginTop: "4px",
            }}
          >
            {countries}
          </div>
        </div>
      </div>
    </div>
  );
}
