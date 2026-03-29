import { THEME } from "../lib/theme";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: `1px solid ${THEME.border}`,
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        background: THEME.surface,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          background: THEME.accent,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#0B1120" />
          <path
            d="M2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="#0B1120"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.accent,
            letterSpacing: "0.05em",
            margin: 0,
          }}
        >
          FARMAGUIA
        </p>
        <p
          style={{
            fontSize: 11,
            color: THEME.textMuted,
            margin: 0,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Sistema de Recomendação Farmacêutica · v1.0
        </p>
      </div>

      <div style={{ fontSize: 11, color: THEME.textMuted, textAlign: "right" }}>
        <div style={{ color: THEME.accent, marginBottom: 2 }}>● SISTEMA ATIVO</div>
        <div>Auxiliar Farmacêutico IA</div>
      </div>
    </header>
  );
}
