# arthursantx.github.io

Site pessoal de **Arthur Borges** — Technology & Business Professional.
Publicado em https://arthursantx.github.io pelo GitHub Pages.

## O que falta preencher

| Item | Onde | Como |
|---|---|---|
| Fotografia profissional | `assets/img/arthur.webp` (4:5, 720×900) | Já publicada. Para trocar, substitua o arquivo mantendo o nome. |
| E-mail | `CONFIG.email` em `assets/js/site.js` | Preenchido: arthurborgess21@gmail.com. |
| Currículo em PDF | `assets/arthur-borges-curriculo.pdf` + `CONFIG.curriculo` | O botão de download aparece quando o campo é preenchido. |
| Envio do formulário | `CONFIG.formEndpoint` | Crie um formulário gratuito no [Formspree](https://formspree.io) e cole o endereço (`https://formspree.io/f/...`). Sem ele, o formulário abre o aplicativo de e-mail do visitante com a mensagem já preenchida para arthurborgess21@gmail.com. |

## Decisões

- **HTML, CSS e JavaScript sem framework.** O site é uma página institucional com poucas interações. Sem etapa de build, ele publica direto no GitHub Pages, carrega rápido e não depende de bibliotecas para continuar funcionando. Se o site crescer (blog, várias páginas geradas a partir de dados), a migração para Next.js ou Astro é direta, porque o conteúdo já está organizado por seções.
- **Tipografia:** Instrument Serif nos títulos, Geist no texto e Geist Mono em rótulos e datas, carregadas do Google Fonts.
- **Conteúdo verdadeiro:** nenhum número, resultado ou cargo foi inventado. O NEXUS aparece como projeto em desenvolvimento até estar funcional.
- **Acessibilidade:** painel no topo (ícone de acessibilidade) com tamanho do texto, alto contraste, fonte de leitura facilitada (Atkinson Hyperlegible), espaçamento de texto, destaque de links, pausa de animações, guia de leitura e, em português, tradução para Libras pelo VLibras (widget oficial do governo, carregado só quando ativado). As escolhas ficam salvas no navegador. Além disso: link para pular ao conteúdo, foco visível, navegação por teclado, Esc fecha menu e painel, mensagens do formulário anunciadas para leitores de tela e respeito ao movimento reduzido do sistema. Todas as páginas passam no axe-core (WCAG 2.1 AA) sem violações.
- **Idiomas:** português (`/`), inglês (`/en/`) e espanhol (`/es/`), com seletor no topo e `hreflang` para buscadores. O português é a fonte; as outras versões são geradas.
- **Diagrama "Onde eu atuo":** Tecnologia, Negócios e Pessoas como três círculos; cada área e interseção mostra como aparece no trabalho real. Sem JavaScript, os textos aparecem em lista.
- **SEO:** metadados, Open Graph (`assets/img/og.jpg`), dados estruturados `Person`, `sitemap.xml`, `robots.txt` e página 404.

## Estrutura

```
index.html               página principal em português (fonte)
projetos/nexus/          estudo de caso do NEXUS
en/  es/                 versões em inglês e espanhol (geradas, não edite à mão)
tools/build.py           gera en/ e es/ a partir do português
tools/traducoes.py       textos traduzidos (português, inglês, espanhol)
assets/css/site.css      estilos e sistema visual
assets/js/site.js        menu, acessibilidade, diagrama, formulário, textos por idioma e CONFIG
assets/img/og.jpg        imagem de compartilhamento
favicon-32.png  404.html  sitemap.xml  robots.txt  .nojekyll
```

Para adicionar um projeto: copie `projetos/nexus/`, ajuste o conteúdo, inclua um cartão na seção `#projetos` de `index.html` e a URL no `sitemap.xml`.

## Editar textos

1. Altere o português em `index.html` ou `projetos/nexus/index.html`.
2. Atualize a linha correspondente em `tools/traducoes.py` (inglês e espanhol).
3. Rode `python3 tools/build.py`. Ele regenera `en/` e `es/` e lista qualquer texto que ficou sem tradução.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```
