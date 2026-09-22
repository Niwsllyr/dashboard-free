// ============================================================
// cepresolver.js — descobre a cidade de cada CEP usando a API pública
// do ViaCEP, direto do navegador (nada passa por nenhum servidor
// nosso). Roda em pequenos lotes, pra não abrir uma requisição por
// CEP de uma vez só, e avisa o progresso conforme vai terminando.
// ============================================================

const TAMANHO_DO_LOTE = 6;

export async function resolveCepsToCities(ceps, onProgress) {
  const unicos = [...new Set((ceps || []).filter(Boolean))];
  const resultado = {};
  let feitos = 0;

  for (let i = 0; i < unicos.length; i += TAMANHO_DO_LOTE) {
    const fatia = unicos.slice(i, i + TAMANHO_DO_LOTE);

    await Promise.all(
      fatia.map(async (cepOriginal) => {
        const limpo = String(cepOriginal).replace(/\D/g, '');

        if (limpo.length === 8) {
          try {
            const resposta = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
            const json = await resposta.json();
            if (!json.erro && json.localidade) {
              resultado[cepOriginal] = `${json.localidade} - ${json.uf}`;
            }
          } catch {
            // CEP não resolvido (sem internet, ou API fora do ar) — segue sem essa cidade
          }
        }

        feitos++;
        if (onProgress) onProgress(feitos, unicos.length);
      })
    );
  }

  return resultado;
}
