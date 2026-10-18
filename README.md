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
- `src/data/content.js`: textos, cards, FAQ e navegação
- `src/styles.css`: estilos recuperados da build
- `src/assets/hero-architecture.png`: imagem principal recuperada
- `public/favicon.svg`: favicon recuperado
- `public/icons.svg`: arquivo SVG adicional publicado (mantido como backup; não foi identificada referência a ele no bundle da página)

## Limitações e observações

- Não havia arquivos `.map` ou código original da pasta `src`. Portanto, os nomes, divisão em arquivos e formatação do JSX são uma reconstrução, não os arquivos exatos do computador de origem.
- Os CTAs do deploy original são **âncoras que apontam para `#contato`**; o CTA dessa seção também aponta para `#contato`. Nenhuma integração de WhatsApp, formulário ou envio de leads foi encontrada nos arquivos e nenhuma foi inventada.
- O texto e os números da landing page foram transcritos do deploy recebido sem validar afirmações de negócio. Confira dados e alegações antes de publicar.
- O CSS utiliza a mesma estilização do deploy publicado, só reformatada para edição.
- As versões de `vite` e `@vitejs/plugin-react` foram escolhidas para o projeto reconstruído: os arquivos publicados não revelam com precisão as versões das ferramentas originais.
