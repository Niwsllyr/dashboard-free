// ============================================================
// csvReader.js — lê um arquivo .csv escolhido pelo usuário (SLA, DS,
// PNR ou Manifesto) e devolve as linhas já separadas por coluna.
// Usa o PapaParse, que já vem carregado na página (CDN).
// ============================================================

export async function processCSV(file) {
  const texto = await file.text();
  const resultado = Papa.parse(texto, {
    header: true,
    skipEmptyLines: true,
  });
  return {
    data: resultado.data || [],
    fields: (resultado.meta && resultado.meta.fields) || [],
  };
}
