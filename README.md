# Plenno Capital — landing page (Vite + React)

Este projeto foi **reconstruído** a partir dos arquivos públicos do deploy Netlify enviados pelo proprietário. A estrutura original dos arquivos JSX não pôde ser recuperada diretamente, mas os textos, dados, marcação React, estilos e imagens foram recuperados ou reconstituídos a partir do JavaScript e CSS publicados.

## Rodar localmente

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

## Gerar a build para publicação

```bash
npm run build
```

O resultado estará na pasta `dist/`. Para publicar manualmente no Netlify, faça upload **da pasta `dist`** no painel de deploys.

## Organização

- `src/App.jsx`: composição principal da página
- `src/sections/Sections.jsx`: seções e componentes de layout
- `src/components/Shared.jsx`: componentes reutilizáveis
- `src/components/Reveal.jsx`, `AnimatedCounter.jsx` e `SiteHeader.jsx`: reveal, contadores e navegação responsiva
- `src/hooks/`: observação de entrada no viewport e preferência de redução de movimento
- `src/data/content.js`: textos, cards, FAQ e navegação
- `src/styles.css`: estilos recuperados da build
- `src/assets/hero-architecture.png`: imagem principal recuperada
- `public/favicon.svg`: favicon recuperado
- `public/icons.svg`: arquivo SVG adicional publicado (mantido como backup; não foi identificada referência a ele no bundle da página)

## Limitações e observações

- Não havia arquivos `.map` ou código original da pasta `src`. Portanto, os nomes, divisão em arquivos e formatação do JSX são uma reconstrução, não os arquivos exatos do computador de origem.
- Os CTAs iniciais levam a `#contato`. O botão "Quero falar com a Plenno" abre `https://wa.me/556283045044`, e o contato do rodapé usa `mailto:administrativo@plennocapital.com`. Ambos são configurados em `src/data/content.js`; o número informado foi preservado com o código de país `55`.
- O texto e os números da landing page foram transcritos do deploy recebido sem validar afirmações de negócio. Confira dados e alegações antes de publicar.
- O CSS preserva a composição do deploy e acrescenta entrada da hero, reveal no scroll, microinterações e ajustes mobile. Contadores e barras executam uma vez ao entrar no viewport; com `prefers-reduced-motion`, todo o conteúdo aparece diretamente no estado final.
- As versões de `vite` e `@vitejs/plugin-react` foram escolhidas para o projeto reconstruído: os arquivos publicados não revelam com precisão as versões das ferramentas originais.
