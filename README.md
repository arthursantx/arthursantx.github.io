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
- **Acessibilidade:** link para pular ao conteúdo, foco visível, menu móvel com `aria-expanded` e tecla Esc, mensagens de erro do formulário anunciadas para leitores de tela e animações desligadas para quem prefere menos movimento.
- **SEO:** metadados, Open Graph (`assets/img/og.jpg`), dados estruturados `Person`, `sitemap.xml`, `robots.txt` e página 404.

## Estrutura

```
index.html               página principal (8 seções)
projetos/nexus/          estudo de caso do NEXUS
assets/css/site.css      estilos e sistema visual
assets/js/site.js        menu, seção ativa, animações, formulário e CONFIG
assets/img/og.jpg        imagem de compartilhamento
favicon.svg  404.html  sitemap.xml  robots.txt  .nojekyll
```

Para adicionar um projeto: copie `projetos/nexus/`, ajuste o conteúdo, inclua um cartão na seção `#projetos` de `index.html` e a URL no `sitemap.xml`.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```
