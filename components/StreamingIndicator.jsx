import { THEME } from "../lib/theme";

export default function StreamingIndicator({ streamText }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{ animation: "spin 1s linear infinite", transformOrigin: "center", flexShrink: 0 }}
        >
          <circle cx="12" cy="12" r="10" stroke={THEME.border} strokeWidth="3" />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={THEME.accent}
            strokeWidth="3"
            strokeDasharray="20 60"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontSize: 11,
            color: THEME.accent,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Analisando sintomas...
        </span>
      </div>

      {streamText && (
        <div
          style={{
            background: THEME.surface,
            border: `1px solid ${THEME.border}`,
            borderRadius: 10,
            padding: "14px 18px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: THEME.textMuted,
            lineHeight: 1.7,
            maxHeight: 180,
            overflowY: "auto",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
          }}
        >
          <span style={{ color: THEME.accent, marginRight: 6 }}>{">"}</span>
          {streamText}
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 12,
              background: THEME.accent,
              marginLeft: 2,
              verticalAlign: "middle",
              animation: "blink 0.8s step-end infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}
