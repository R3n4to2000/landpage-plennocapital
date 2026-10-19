# Decisoes

- Usar `#020711`, `#D4B474`, `#F5F2EA` e `#FFFFFF` como tokens principais da landing page.
- Manter a hero com arquitetura premium noturna, texto a esquerda, CTA dourado e metricas na base para seguir a referencia visual fornecida.
- Usar os assets oficiais em `src/assets/brand/`, preservando proporcoes e cores; os placeholders anteriores foram substituidos.
- Centralizar dados comerciais, navegacao e contatos em `src/data/content.js`.
- Refinamento de 2026-10-18: preservar textos, valores, imagem, identidade e ordem das secoes; usar React + CSS sem dependencias novas para motion.
- Usar IntersectionObserver para revelar grupos uma unica vez e requestAnimationFrame para contadores de 1500ms, com formatacao pt-BR e valor final acessivel e estavel.
- Animar barras de comparacao por scaleX, preservando os preenchimentos de 64%, 82% e 48% e stagger de 100ms.
- Respeitar prefers-reduced-motion em CSS e JavaScript, inclusive quando a preferencia muda durante a sessao; exibir valores finais imediatamente.
- Em telas de ate 1080px, usar menu compacto com aria-expanded, Escape, fechamento por link, clique externo e saida do foco.
- Usar administrativo@plennocapital.com com mailto e WhatsApp https://wa.me/556283045044 no CTA final. Preservar o numero 6283045044 informado, acrescentando somente o codigo de pais 55.
