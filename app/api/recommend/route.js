import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { symptoms, info } = await req.json();

  if (!symptoms || symptoms.length === 0) {
    return new Response(JSON.stringify({ error: "Nenhum sintoma informado." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("Sintomas:", symptoms);
  console.log("ℹInfo do paciente:", info);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const infoLine = info?.trim()
    ? `Informações importantes do paciente: ${info.trim()}`
    : "";

  const prompt = `Farmacêutico BR. JSON puro apenas, sem texto extra, sem markdown.
Sintomas ou pedidos: ${symptoms.join(", ")}
${infoLine}
Formato obrigatório: {"medicamentos":[{"nome":"Nome Comercial","principio":"ativo","cobre":["sintoma"],"posologia":"dose","marcas":["Marca1","Marca2"],"aviso":"contraindicações"}]}
Regras: máximo 3 medicamentos, marcas brasileiras reais, respeitar RIGOROSAMENTE as informações do paciente (gravidez, alergias, idade, etc) ao escolher os medicamentos e avisos.`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        console.log("Chamando Gemini...");
        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            const sseData = `data: ${JSON.stringify({
              type: "content_block_delta",
              delta: { type: "text_delta", text },
            })}\n\n`;
            controller.enqueue(new TextEncoder().encode(sseData));
          }
        }

        console.log("Gemini respondeu!");
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error("Erro no Gemini:", err.message);
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}