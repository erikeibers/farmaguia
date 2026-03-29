Antes de tudo Esse software não quer substituir um profisional farmaceutico, apenas um auxilio para quem trabalha todo dia atrás do balcão..

Projeto alocado na Vercel

https://farmaguia-pin04b6aj-erikeibers-projects.vercel.app/

# FarmaGuia

Sistema de recomendação farmacêutica por sintomas, usando Google Gemini.

## Como rodar localmente

### 1. Instale o Node.js
Baixe em https://nodejs.org e instale a versão LTS.

### 2. Instale as dependências

npm install


### 3. Configure a chave do Google
Copie o arquivo de exemplo:

cp .env.local.example .env.local


Edite o `.env.local` e coloque sua chave:

GOOGLE_API_KEY=sua-chave-aqui


> Chave gratuita em: https://aistudio.google.com/apikey

### 4. Rode o projeto

npm run dev


Acesse: http://localhost:3000

---

## Estrutura do projeto

```
farmaguia/
├── app/
│   ├── page.jsx                  ← Página principal
│   ├── layout.jsx                ← Layout raiz
│   ├── globals.css               ← Estilos globais
│   └── api/
│       └── recommend/
│           └── route.js          ← API Route com Google Gemini
├── components/
│   ├── Header.jsx                ← Cabeçalho
│   ├── SymptomInput.jsx          ← Campo de sintomas + tags
│   ├── MedCard.jsx               ← Card de cada medicamento
│   └── StreamingIndicator.jsx    ← Loading com stream ao vivo
├── lib/
│   └── theme.js                  ← Cores e design tokens
├── .env.local.example
├── next.config.js
└── package.json
```

## Como funciona

1. Usuário digita sintomas → cada Enter vira uma tag
2. Clica em Buscar → frontend chama /api/recommend
3. API Route chama o Google Gemini com streaming
4. Tokens aparecem em tempo real na tela
5. JSON completo é parseado e os cards são renderizados

A chave fica apenas no .env.local (servidor) — nunca exposta no browser.
