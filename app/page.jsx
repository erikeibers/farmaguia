"use client";

import { useState, useRef } from "react";
import Header from "../components/Header";
import SymptomInput from "../components/SymptomInput";
import StreamingIndicator from "../components/StreamingIndicator";
import MedCard from "../components/MedCard";
import { THEME } from "../lib/theme";

export default function Home() {
  const [symptoms, setSymptoms] = useState([]);
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const handleAdd = (parts) => {
    setSymptoms((prev) => {
      const existing = new Set(prev.map((s) => s.toLowerCase()));
      return [...prev, ...parts.filter((p) => !existing.has(p.toLowerCase()))];
    });
  };

  const handleAddInfo = (parts) => {
    setInfos((prev) => {
      const existing = new Set(prev.map((s) => s.toLowerCase()));
      return [...prev, ...parts.filter((p) => !existing.has(p.toLowerCase()))];
    });
  };

  const handleClear = () => {
    setSymptoms([]);
    setInfos([]);
    setResults(null);
    setError(null);
    setStreamText("");
  };

  const handleSearch = async () => {
    if (symptoms.length === 0) return;
    setLoading(true);
    setResults(null);
    setError(null);
    setStreamText("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, info: infos.join(", ") }),
      });

      if (!res.ok) throw new Error("Erro na API");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const jsonStr = line.replace("data: ", "").trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const evt = JSON.parse(jsonStr);
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
              accumulated += evt.delta.text;
              setStreamText(accumulated);
            }
          } catch {}
        }
      }

      const clean = accumulated.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      const normalized = Array.isArray(parsed) ? { medicamentos: parsed } : parsed;
      setResults(normalized);
      setStreamText("");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      setError("Erro ao processar a análise. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, padding: "32px", maxWidth: 900, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <SymptomInput
          symptoms={symptoms}
          onAdd={handleAdd}
          onRemove={(i) => setSymptoms((prev) => prev.filter((_, idx) => idx !== i))}
          infos={infos}
          onAddInfo={handleAddInfo}
          onRemoveInfo={(i) => setInfos((prev) => prev.filter((_, idx) => idx !== i))}
          onSearch={handleSearch}
          onClear={handleClear}
          loading={loading}
        />

        {(loading || results || error) && <div style={{ height: 1, background: THEME.border, margin: "28px 0" }} />}

        {loading && <StreamingIndicator streamText={streamText} />}

        {error && (
          <div style={{ background: "rgba(248,113,113,0.05)", border: `1px solid ${THEME.danger}`, borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ color: THEME.danger, fontSize: 13, margin: 0 }}>⚠ {error}</p>
          </div>
        )}

        {results && !loading && (
          <div ref={resultsRef}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: THEME.textMuted, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: THEME.accent, display: "inline-block" }} />
                Recomendações Farmacológicas
              </div>
              <span style={{ fontSize: 11, color: THEME.textMuted }}>
                {results.medicamentos?.length || 0} medicamento(s) encontrado(s)
              </span>
            </div>

            {(results.medicamentos || []).map((med, i) => (
              <MedCard key={i} med={med} index={i} allSymptoms={symptoms} />
            ))}

            <div style={{ marginTop: 24, padding: "14px 18px", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 8, fontSize: 11, color: THEME.warning, lineHeight: 1.6 }}>
              ⚠ <strong>Aviso:</strong> Este sistema é uma ferramenta de apoio ao profissional farmacêutico. Sempre confirme com o prescritor e analise o histórico do paciente antes de qualquer dispensação.
            </div>
          </div>
        )}

        {!loading && !results && !error && symptoms.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0", color: THEME.textMuted }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>⊕</div>
            <p style={{ fontSize: 13, margin: "0 0 6px" }}>Digite os sintomas do paciente acima</p>
            <p style={{ fontSize: 11, color: THEME.border, margin: 0 }}>O sistema irá recomendar os melhores medicamentos com cobertura máxima</p>
          </div>
        )}
      </main>
    </div>
  );
}