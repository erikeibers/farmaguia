"use client";

import { useState, useRef } from "react";
import { THEME } from "../lib/theme";

function TagInput({ value, onChange, onAdd, tags, onRemove, placeholder, accentColor, tagBg, tagBorder, tagText }) {
  const ref = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) { onAdd(value); onChange(""); }
    }
  };

  return (
    <>
      <div
        style={{ background: THEME.surface, border: `1px solid ${value ? accentColor + "66" : THEME.border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 10, transition: "border-color 0.2s", cursor: "text" }}
        onClick={() => ref.current?.focus()}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <textarea
            ref={ref}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: THEME.text, fontSize: 14, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.6, resize: "none", boxSizing: "border-box", minHeight: 60 }}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <button
            onClick={() => { if (value.trim()) { onAdd(value); onChange(""); ref.current?.focus(); } }}
            disabled={!value.trim()}
            style={{ background: value.trim() ? accentColor : "transparent", border: `1px solid ${value.trim() ? accentColor : THEME.border}`, borderRadius: 8, padding: "8px 14px", color: value.trim() ? "#0B1120" : THEME.textMuted, fontSize: 12, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em", cursor: value.trim() ? "pointer" : "not-allowed", whiteSpace: "nowrap", transition: "all 0.2s", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke={value.trim() ? "#0B1120" : THEME.textMuted} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Adicionar
          </button>
        </div>
        <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
          <kbd style={{ background: THEME.border, borderRadius: 3, padding: "1px 6px", fontSize: 10, color: THEME.textSub, fontFamily: "monospace" }}>Enter</kbd>
          <span>ou toque em Adicionar</span>
        </div>
      </div>

      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          {tags.map((s, i) => (
            <div key={i} style={{ background: tagBg, border: `1px solid ${tagBorder}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, color: tagText, display: "flex", alignItems: "center", gap: 6 }}>
              {s}
              <button style={{ background: "none", border: "none", color: tagBorder, cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1 }} onClick={() => onRemove(i)}>×</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function SymptomInput({ symptoms, onAdd, onRemove, onSearch, onClear, loading, infos, onAddInfo, onRemoveInfo }) {
  const [symptomInput, setSymptomInput] = useState("");
  const [infoInput, setInfoInput] = useState("");

  const addSymptom = (raw) => {
    const parts = raw.split(/[\n,;]+/).map((s) => s.trim()).filter((s) => s.length > 1);
    if (parts.length === 0) return;
    onAdd(parts);
  };

  const addInfo = (raw) => {
    const parts = raw.split(/[\n,;]+/).map((s) => s.trim()).filter((s) => s.length > 1);
    if (parts.length === 0) return;
    onAddInfo(parts);
  };

  return (
    <div style={{ marginBottom: 24 }}>

      {/* Sintomas */}
      <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: THEME.textMuted, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: THEME.accent, display: "inline-block" }} />
        Registro de Sintomas
      </div>
      <TagInput
        value={symptomInput}
        onChange={setSymptomInput}
        onAdd={addSymptom}
        tags={symptoms}
        onRemove={onRemove}
        placeholder={"Digite um sintoma ou pedido...\nEx: febre, dor de cabeça, quero pomada para brotoeja"}
        accentColor={THEME.accent}
        tagBg={THEME.pill}
        tagBorder={THEME.accentDim}
        tagText={THEME.pillText}
      />

      {/* Informações do paciente */}
      <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: THEME.textMuted, marginBottom: 10, marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: THEME.warning, display: "inline-block" }} />
        Informações do Paciente
        <span style={{ fontSize: 9, color: THEME.textMuted, textTransform: "none", letterSpacing: 0, fontStyle: "italic" }}>(opcional)</span>
      </div>
      <TagInput
        value={infoInput}
        onChange={setInfoInput}
        onAdd={addInfo}
        tags={infos}
        onRemove={onRemoveInfo}
        placeholder={"Ex: grávida, alergia a dipirona, criança de 5 anos..."}
        accentColor={THEME.warning}
        tagBg="rgba(251,191,36,0.08)"
        tagBorder="rgba(251,191,36,0.4)"
        tagText={THEME.warning}
      />

      {/* Botões */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginTop: 20 }}>
        <button
          style={{ background: THEME.accent, border: "none", borderRadius: 8, padding: "12px 28px", color: "#0B1120", fontSize: 13, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 8, opacity: symptoms.length === 0 || loading ? 0.5 : 1, cursor: symptoms.length === 0 || loading ? "not-allowed" : "pointer" }}
          onClick={onSearch}
          disabled={symptoms.length === 0 || loading}
        >
          {loading ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite", transformOrigin: "center" }}>
              <circle cx="12" cy="12" r="10" stroke="#0B1120" strokeWidth="3" strokeDasharray="20 60" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#0B1120" strokeWidth="2.5" />
              <path d="M21 21l-4.35-4.35" stroke="#0B1120" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
          {loading ? "ANALISANDO..." : "BUSCAR MEDICAMENTOS"}
        </button>

        {(symptoms.length > 0 || infos.length > 0) && (
          <button style={{ background: "transparent", border: `1px solid ${THEME.border}`, borderRadius: 8, padding: "12px 20px", color: THEME.textMuted, fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em" }} onClick={onClear}>
            LIMPAR
          </button>
        )}

        {symptoms.length > 0 && (
          <span style={{ fontSize: 11, color: THEME.textMuted, marginLeft: "auto" }}>
            {symptoms.length} sintoma{symptoms.length !== 1 ? "s" : ""} · {infos.length} info{infos.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}