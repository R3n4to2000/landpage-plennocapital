# Arquitetura

- Landing page estatica em Vite + React, JavaScript e CSS tradicional, sem backend.
- `src/main.jsx` importa `src/styles.css` e monta `App` em StrictMode. `src/index.css` e `src/App.css` nao integram o fluxo atual.
- `src/App.jsx` compoe hero, nove secoes de conteudo/contato e rodape; `src/sections/Sections.jsx` mantem sua composicao.
- `src/data/content.js` concentra navegacao, metricas, conteudo repetido, FAQ e contatos.
- `src/components/Shared.jsx` define logo oficial, monograma, CTA e SectionHeading com Reveal.
- `src/components/SiteHeader.jsx` controla menu mobile acessivel; links desktop permanecem visiveis acima de 1080px.
- `src/components/Reveal.jsx` usa `useInView` para revelar blocos e grupos uma unica vez; stagger e microinteracoes ficam em CSS.
- `src/components/AnimatedCounter.jsx` observa viewport, atualiza somente o texto visual com requestAnimationFrame e preserva o valor final para leitores de tela. O espaco do numero final fica reservado para evitar mudanca de layout.
- `src/hooks/useInView.js` desconecta IntersectionObserver apos a entrada e tem fallback quando a API nao existe.
- `src/hooks/useReducedMotion.js` acompanha matchMedia com useSyncExternalStore, inclusive mudancas durante a sessao.
- `src/styles.css` concentra tokens, layout, animacoes, breakpoints e reduced motion. Barras usam scaleX com origem a esquerda.
- `src/assets/brand/` contem os arquivos oficiais; `src/assets/hero-architecture.png` permanece como imagem principal.
- Nao existe grafo em `brain/graphify/` nem `graphify-out/` nesta revisao.
