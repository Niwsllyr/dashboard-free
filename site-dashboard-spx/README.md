# Site de apresentação — Dashboard SPX

Site estático (só HTML, sem instalar nada). Funciona direto no GitHub Pages.

## Arquivos
- `index.html` — página de apresentação (recursos, demonstrações, planos e contato)
- `demo.html` — demonstração do app de celular (dados fictícios)
- `app/` — demonstração do **painel de computador de verdade** (o próprio dashboard, com trava de Premium)
- `assets/` — logo, ícone e imagem de compartilhamento da página de apresentação

Mantenha a pasta `assets` do lado do `index.html`, e a pasta `app` inteira junto (ela tem os próprios arquivos).

## Como publicar no GitHub Pages
1. No GitHub, crie um repositório novo (ex.: `dashboard-spx-site`).
2. Envie os arquivos (**Add file > Upload files**), mantendo as pastas `assets` e `app`.
3. Em **Settings > Pages**, escolha `main` e a pasta `/ (root)`. Salve.
4. Em 1–2 minutos o site abre em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Trocar o número de contato
O número `98992468209` aparece em:
- `index.html` (vários links `wa.me`)
- `demo.html` (constante `CONTATO_NUM`, perto do fim do arquivo)
- `app/index.html` (constante `CONTATO` dentro do `<script>` de travas, perto do fim do arquivo)

## Sobre a demonstração do celular (`demo.html`)
- Todos os nomes, códigos BR, telefones e números são fictícios.
- O botão de WhatsApp só mostra a mensagem pronta, não abre conversa com ninguém.
- Backlog e PNR completos; SLA e DS com o gráfico básico; o resto é Premium.

## Sobre a demonstração do painel de PC (`app/`)
Esta é uma cópia real do dashboard (mesmos `dashboard.js`, `charts.js`, `metrics.js`,
`styles.css`), sem o login do Supabase (removido por segurança — a chave do Supabase
não pode ficar num site público) e com uma camada de travas:

- **PNR: completo.** Quem visitar pode soltar um `.csv` de PNR de verdade (exportado
  do SPX) e ver o cálculo rodando com os dados reais — nada sai do navegador da
  pessoa, não passa por nenhum servidor nosso.
- **SLA e DS: só o gráfico básico** (distribuição por status). Os cartões de
  indicadores, o ranking e "Atuação dos Entregadores" aparecem borrados com um
  cadeado.
- **O resto** (Backlog, Entregadores, Manifesto, Análise de OP, Histórico, Ver Log,
  Relatório PDF/TXT, Copiar Print) mostra um aviso "Recurso Premium" com o contato,
  em vez da função de verdade.
- Criei três arquivos que o `dashboard.js` precisa mas que nunca tinham sido enviados
  antes — `csvReader.js`, `backlogReader.js` e `cepresolver.js` — reproduzindo o que
  o app real faz (ler CSV/planilha, resolver CEP pela API pública do ViaCEP). Se você
  tiver os arquivos originais, pode substituir por eles.
- Sem internet (ex.: testando localmente sem Wi-Fi) os gráficos e o CSS não carregam,
  porque vêm de CDN — normal, no ar (GitHub Pages) funciona.
