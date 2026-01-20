export default function SvgMarker() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        {/* ===================== ZERO (●) ===================== */}
        <marker
          id="zero"
          viewBox="0 0 12 12"
          refX="12"
          refY="6"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <circle cx="6" cy="6" r="3" fill="currentColor" />
        </marker>

        {/* ===================== ONE (|) ===================== */}
        <marker
          id="one"
          viewBox="0 0 12 12"
          refX="12"
          refY="6"
          markerWidth="6"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 6 0 L 6 12" stroke="currentColor" strokeWidth="1.5" />
        </marker>

        {/* ===================== MANY (<) ===================== */}
        <marker
          id="many"
          viewBox="0 0 12 12"
          refX="12"
          refY="6"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 6 L 8 0 M 0 6 L 8 6 M 0 6 L 8 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </marker>

        {/* ===================== ONE AND ONLY ONE (||) ===================== */}
        <marker
          id="one-only"
          viewBox="0 0 12 12"
          refX="12"
          refY="6"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M 4 0 L 4 12 M 8 0 L 8 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </marker>

        {/* ===================== ZERO OR ONE (●|) ===================== */}
        <marker
          id="zero-or-one"
          viewBox="0 0 18 12"
          refX="18"
          refY="6"
          markerWidth="10"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          {/* solid zero */}
          <circle cx="4" cy="6" r="2" fill="currentColor" />
          {/* one bar */}
          <path d="M 8 0 L 8 12" stroke="currentColor" strokeWidth="1.5" />
        </marker>

        {/* ===================== ONE OR MANY (|<) ===================== */}
        <marker
          id="one-or-many"
          viewBox="0 0 18 12"
          refX="18"
          refY="6"
          markerWidth="10"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          {/* one bar */}
          <path d="M 4 0 L 4 12" stroke="currentColor" strokeWidth="1.5" />
          {/* crow foot */}
          <path
            d="M 6 6 L 16 0 M 6 6 L 16 6 M 6 6 L 16 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </marker>

        {/* ===================== ZERO OR MANY (●<) ===================== */}
        <marker
          id="zero-or-many"
          viewBox="0 0 20 12"
          refX="20"
          refY="6"
          markerWidth="12"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          {/* solid zero */}
          <circle cx="4" cy="6" r="2" fill="currentColor" />
          {/* crow foot */}
          <path
            d="M 6 6 L 18 0 M 6 6 L 18 6 M 6 6 L 18 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </marker>
      </defs>
    </svg>
  );
}
