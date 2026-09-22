// ============================================================
// backlogReader.js — lê o arquivo de Backlog, que o SPX exporta como
// planilha (.xlsx/.xls), mas também aceita .csv. Usa o SheetJS (XLSX)
// pra planilha e o PapaParse pra csv — os dois já vêm carregados na
// página (CDN).
// ============================================================

export async function processBacklogFile(file) {
  const nome = (file.name || '').toLowerCase();

  if (nome.endsWith('.csv')) {
    const texto = await file.text();
    const resultado = Papa.parse(texto, { header: true, skipEmptyLines: true });
    return {
      data: resultado.data || [],
      fields: (resultado.meta && resultado.meta.fields) || [],
    };
  }

  const buffer = await file.arrayBuffer();
  const planilha = XLSX.read(buffer, { type: 'array' });
  const aba = planilha.Sheets[planilha.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(aba, { defval: '' });

  return {
    data,
    fields: data.length ? Object.keys(data[0]) : [],
  };
}
