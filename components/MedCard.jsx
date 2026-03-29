import { THEME } from "../lib/theme";

export default function MedCard({ med, index, allSymptoms }) {
  const cobreAll = allSymptoms.every((s) =>
    (med.cobre || []).some(
      (c) =>
        c.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(c.toLowerCase())
    )
  );

  const naoCobre = allSymptoms.filter(
    (s) =>
      !(med.cobre || []).some(
        (c) =>
          c.toLowerCase().includes(s.toLowerCase()) ||
          s.toLowerCase().includes(c.toLowerCase())
      )
  );

  const isPrimary = cobreAll || index === 0;

  return (
    <div
      style={{
        background: THEME.surface,
        border: `1px solid ${isPrimary ? THEME.accent : THEME.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
        boxShadow: isPrimary ? `0 0 0 1px ${THEME.accentGlow}, 0 4px 24px ${THEME.accentGlow}` : "none",
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: "inline-block",
          padding: "2px 10px",
          borderRadius: 20,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 12,
          background: isPrimary ? "rgba(0,201,167,0.15)" : "rgba(96,165,250,0.1)",
          color: isPrimary ? THEME.accent : THEME.info,
          border: `1px solid ${isPrimary ? THEME.accentDim : "rgba(96,165,250,0.3)"}`,
        }}
      >
        {isPrimary ? "▲ Recomendado principal" : `Complementar ${index}`}
      </div>

      {/* Nome */}
      <p
        style={{
          fontSize: isPrimary ? 16 : 14,
          fontWeight: 700,
          color: isPrimary ? THEME.accent : THEME.info,
          margin: "0 0 4px",
          letterSpacing: "0.03em",
        }}
      >
        {med.nome || med.nome_generico}
      </p>

      {/* Princípio ativo */}
      {med.principio && (
        <p style={{ fontSize: 11, color: THEME.textMuted, margin: "0 0 12px", letterSpacing: "0.05em" }}>
          {med.principio}
        </p>
      )}

      {/* Sintomas cobertos */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Sintomas cobertos:
        </span>
        <div style={{ marginTop: 6 }}>
          {(med.cobre || med.sintomas_cobertos || []).map((s, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px",
                background: "rgba(0,201,167,0.08)",
                border: "1px solid rgba(0,201,167,0.2)",
                borderRadius: 4,
                fontSize: 11,
                color: THEME.pillText,
                margin: "0 4px 4px 0",
              }}
            >
              ✓ {s}
            </span>
          ))}
        </div>
      </div>

      {/* Não cobre */}
      {naoCobre.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Não cobre:
          </span>
          <div style={{ marginTop: 6 }}>
            {naoCobre.map((s, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  padding: "3px 8px",
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.2)",
                  borderRadius: 4,
                  fontSize: 11,
                  color: THEME.warning,
                  margin: "0 4px 4px 0",
                }}
              >
                ✗ {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Posologia */}
      {med.posologia && (
        <div
          style={{
            fontSize: 12,
            color: THEME.textSub,
            lineHeight: 1.6,
            marginTop: 10,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 6,
            borderLeft: `2px solid ${THEME.border}`,
          }}
        >
          <strong style={{ color: THEME.textSub }}>Posologia: </strong>
          {med.posologia}
        </div>
      )}

      {/* Aviso */}
      {(med.aviso || med.contraindicacoes) && (
        <div
          style={{
            fontSize: 12,
            color: THEME.textSub,
            lineHeight: 1.6,
            marginTop: 6,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 6,
            borderLeft: `2px solid ${THEME.danger}`,
          }}
        >
          <strong style={{ color: THEME.danger }}>⚠ Aviso: </strong>
          {med.aviso || med.contraindicacoes}
        </div>
      )}

      {/* Marcas */}
      {med.marcas?.length > 0 && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: `1px solid ${THEME.border}`,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: THEME.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 6,
            }}
          >
            Marcas disponíveis
          </div>
          {med.marcas.map((b, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${THEME.border}`,
                borderRadius: 6,
                fontSize: 12,
                color: THEME.textSub,
                margin: "0 6px 6px 0",
              }}
            >
              {typeof b === "string" ? b : b.nome}
              {b.concentracao && (
                <span style={{ color: THEME.textMuted, fontSize: 10 }}> · {b.concentracao}</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
