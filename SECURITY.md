# Política de segurança

O site é estático (HTML, CSS e JavaScript, hospedado no GitHub Pages): não tem login,
banco de dados nem coleta de dados de visitantes.

## Proteções aplicadas

- HTTPS em todas as páginas.
- Política de segurança de conteúdo (Content Security Policy) que só permite scripts,
  estilos e fontes do próprio site, do Google Fonts e do VLibras.
- `referrer` restrito e links externos com `rel="noopener"`.
- Nenhuma chave, senha ou token no código.

## Como relatar uma vulnerabilidade

Envie os detalhes para **arthurborgess21@gmail.com** (o contato também está em
`/.well-known/security.txt`). Por favor, não abra uma issue pública antes da correção.
A resposta inicial é dada em até 7 dias.

---

**Security policy (English):** this is a static website with no login, database or
visitor data collection. To report a vulnerability, email arthurborgess21@gmail.com and
please avoid public issues before a fix.
