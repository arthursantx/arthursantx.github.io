// Arthur Borges · interações do site (sem dependências).

/**
 * Preencha quando os dados estiverem disponíveis. Campos vazios ficam ocultos no site.
 * - email: endereço profissional exibido em Contato.
 * - curriculo: caminho do PDF (texto) ou um por idioma ({ pt, en, es }).
 * - formEndpoint: endereço que recebe o formulário (ex.: Formspree, "https://formspree.io/f/SEU_ID").
 *   Sem ele, o formulário abre o aplicativo de e-mail do visitante com a mensagem já preenchida.
 */
const CONFIG = {
  email: 'arthurborgess21@gmail.com',
  // Um PDF por idioma; o botão só aparece depois que o arquivo existe no site.
  curriculo: {
    pt: '/assets/midia/CV_ArthurBorges_PT.pdf',
    en: '/assets/midia/CV_ArthurBorges_EN.pdf',
    es: '/assets/midia/CV_ArthurBorges_EN.pdf',
  },
  formEndpoint: '',
  linkedin: 'https://www.linkedin.com/in/arthurborgessantos/',
};

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js');
}

/** Textos gerados pelo script, no idioma da página (pt, en ou es). */
const TEXTOS = {
  pt: {
    abrirMenu: 'Abrir menu',
    fecharMenu: 'Fechar menu',
    erroNome: 'Conte como posso te chamar.',
    erroEmail: 'Informe um e-mail para eu responder.',
    erroEmailInvalido: 'Esse e-mail parece incompleto. Confira, por favor.',
    erroMensagem: 'Escreva um pouco mais sobre o assunto (mínimo de 10 caracteres).',
    assuntoPadrao: 'Contato pelo site',
    abrimosEmail: 'Abrimos seu aplicativo de e-mail com a mensagem pronta; é só enviar. Se nada abriu, escreva para',
    ouLinkedin: 'ou fale comigo pelo',
    enviando: 'Enviando…',
    enviar: 'Enviar mensagem',
    enviado: 'Mensagem enviada. Obrigado pelo contato, respondo assim que possível.',
    falhaEnvio: 'Não foi possível enviar agora. Tente de novo em instantes ou use o LinkedIn.',
  },
  en: {
    abrirMenu: 'Open menu',
    fecharMenu: 'Close menu',
    erroNome: 'Please tell me your name.',
    erroEmail: 'Please enter an email so I can reply.',
    erroEmailInvalido: 'This email looks incomplete. Please check it.',
    erroMensagem: 'Please write a bit more (at least 10 characters).',
    assuntoPadrao: 'Contact from the website',
    abrimosEmail: 'Your email app has opened with the message ready to send. If nothing opened, write to',
    ouLinkedin: 'or reach me on',
    enviando: 'Sending…',
    enviar: 'Send message',
    enviado: 'Message sent. Thank you for reaching out, I will reply as soon as possible.',
    falhaEnvio: 'The message could not be sent right now. Please try again shortly or use LinkedIn.',
  },
  es: {
    abrirMenu: 'Abrir menú',
    fecharMenu: 'Cerrar menú',
    erroNome: 'Cuéntame cómo te llamas.',
    erroEmail: 'Escribe un correo para que pueda responderte.',
    erroEmailInvalido: 'Este correo parece incompleto. Revísalo, por favor.',
    erroMensagem: 'Escribe un poco más sobre el tema (mínimo 10 caracteres).',
    assuntoPadrao: 'Contacto desde el sitio',
    abrimosEmail: 'Se abrió tu aplicación de correo con el mensaje listo; solo tienes que enviarlo. Si no se abrió nada, escribe a',
    ouLinkedin: 'o háblame por',
    enviando: 'Enviando…',
    enviar: 'Enviar mensaje',
    enviado: 'Mensaje enviado. Gracias por escribir, responderé lo antes posible.',
    falhaEnvio: 'No fue posible enviar ahora. Inténtalo de nuevo en unos instantes o usa LinkedIn.',
  },
};
const IDIOMA = (typeof document !== 'undefined' && (document.documentElement.lang || 'pt').slice(0, 2)) || 'pt';
const T = TEXTOS[IDIOMA] || TEXTOS.pt;

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
  aplicarConfiguracao();
  prepararTopo();
  prepararMenu();
  prepararSecaoAtiva();
  prepararRevelacao();
  prepararFormulario();
  prepararAcessibilidade();
  prepararVenn();
  const ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = String(new Date().getFullYear());
});

function aplicarConfiguracao() {
  if (CONFIG.email) {
    document.querySelectorAll('[data-se-configurado="email"]').forEach((el) => (el.hidden = false));
    document.querySelectorAll('[data-link-email]').forEach((a) => (a.href = `mailto:${CONFIG.email}`));
    document.querySelectorAll('[data-texto-email]').forEach((el) => (el.textContent = CONFIG.email));
  }
  const curriculo = typeof CONFIG.curriculo === 'object' ? CONFIG.curriculo[IDIOMA] || CONFIG.curriculo.pt : CONFIG.curriculo;
  if (curriculo) {
    quandoExistir(curriculo, () => {
      document.querySelectorAll('[data-se-configurado="curriculo"]').forEach((el) => (el.hidden = false));
      document.querySelectorAll('[data-link-curriculo]').forEach((a) => (a.href = curriculo));
    });
  }
  document.querySelectorAll('[data-video]').forEach((bloco) => {
    const fonte = bloco.querySelector('source');
    if (fonte) quandoExistir(fonte.getAttribute('src'), () => (bloco.hidden = false));
  });
}

/** Mostra um recurso opcional só quando o arquivo já foi publicado (evita links quebrados). */
function quandoExistir(url, mostrar) {
  if (typeof fetch !== 'function') return;
  fetch(url, { method: 'HEAD' }).then((r) => { if (r.ok) mostrar(); }).catch(() => {});
}

function prepararTopo() {
  const topo = document.querySelector('[data-topo]');
  if (!topo) return;
  const atualizar = () => topo.classList.toggle('rolado', window.scrollY > 8);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}

function prepararMenu() {
  const botao = document.querySelector('[data-menu-botao]');
  const menu = document.querySelector('[data-menu]');
  if (!botao || !menu) return;
  const rotulo = botao.querySelector('.visualmente-oculto');

  const definir = (aberto) => {
    botao.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('aberto', aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
    if (rotulo) rotulo.textContent = aberto ? T.fecharMenu : T.abrirMenu;
    if (aberto) menu.querySelector('a')?.focus();
  };

  botao.addEventListener('click', () => definir(botao.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) definir(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      definir(false);
      botao.focus();
    }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (m) => m.matches && definir(false));
}

function prepararSecaoAtiva() {
  const links = [...document.querySelectorAll('[data-menu] a[href^="#"]')];
  const secoes = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!('IntersectionObserver' in window) || !secoes.length) return;

  const visiveis = new Map();
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => visiveis.set(e.target.id, e.isIntersecting));
      // A seção ativa é a primeira, na ordem da página, que ocupa a faixa central da tela.
      const ativa = secoes.find((s) => visiveis.get(s.id));
      links.forEach((a) => {
        if (ativa && a.getAttribute('href') === `#${ativa.id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  secoes.forEach((s) => observador.observe(s));
}

function prepararRevelacao() {
  const itens = document.querySelectorAll('.revelar');
  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzir || !('IntersectionObserver' in window)) {
    itens.forEach((el) => el.classList.add('visivel'));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        // Pequeno atraso entre irmãos para a entrada parecer uma sequência, sem exagero.
        const irmaos = [...e.target.parentElement.children].filter((c) => c.classList.contains('revelar'));
        e.target.style.transitionDelay = `${Math.min(irmaos.indexOf(e.target), 4) * 70}ms`;
        e.target.classList.add('visivel');
        observador.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  itens.forEach((el) => observador.observe(el));
}

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Regras de validação do formulário. Exportável para teste: recebe os valores e devolve os erros por campo. */
function validarContato({ nome, email, mensagem }, textos = T) {
  const erros = {};
  if (!nome.trim()) erros.nome = textos.erroNome;
  if (!email.trim()) erros.email = textos.erroEmail;
  else if (!EMAIL_VALIDO.test(email.trim())) erros.email = textos.erroEmailInvalido;
  if (mensagem.trim().length < 10) erros.mensagem = textos.erroMensagem;
  return erros;
}

function prepararFormulario() {
  const form = document.querySelector('[data-formulario]');
  if (!form) return;
  const status = form.querySelector('[data-status]');
  const enviar = form.querySelector('[data-enviar]');

  const mostrarErros = (erros) => {
    ['nome', 'email', 'mensagem'].forEach((campo) => {
      const input = form.elements[campo];
      const saida = form.querySelector(`#f-${campo}-erro`);
      if (erros[campo]) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', `f-${campo}-erro`);
        saida.textContent = erros[campo];
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        saida.textContent = '';
      }
    });
  };

  const valores = () => ({
    nome: form.elements.nome.value,
    email: form.elements.email.value,
    assunto: form.elements.assunto.value,
    mensagem: form.elements.mensagem.value,
  });

  // Depois da primeira tentativa, os erros somem conforme a pessoa corrige.
  let tentou = false;
  form.addEventListener('input', () => tentou && mostrarErros(validarContato(valores())));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    tentou = true;
    status.className = 'formulario-status';
    status.textContent = '';

    if (form.elements._gotcha.value) return; // robô
    const erros = validarContato(valores());
    mostrarErros(erros);
    const primeiro = ['nome', 'email', 'mensagem'].find((c) => erros[c]);
    if (primeiro) {
      form.elements[primeiro].focus();
      return;
    }

    if (!CONFIG.formEndpoint) {
      // Sem serviço de envio: abre o e-mail do visitante já endereçado e preenchido.
      const v = valores();
      const assunto = v.assunto.trim() || `${T.assuntoPadrao} · ${v.nome.trim()}`;
      const corpo = `${v.mensagem.trim()}\n\n${v.nome.trim()}\n${v.email.trim()}`;
      window.location.href =
        `mailto:${CONFIG.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      status.className = 'formulario-status aviso';
      status.innerHTML =
        `${T.abrimosEmail} ` +
        `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a> ${T.ouLinkedin} ` +
        `<a href="${CONFIG.linkedin}" target="_blank" rel="noopener">LinkedIn</a>.`;
      return;
    }

    enviar.disabled = true;
    enviar.textContent = T.enviando;
    try {
      const resposta = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      form.reset();
      tentou = false;
      status.className = 'formulario-status ok';
      status.textContent = T.enviado;
    } catch {
      status.className = 'formulario-status erro';
      status.textContent = T.falhaEnvio;
    } finally {
      enviar.disabled = false;
      enviar.textContent = T.enviar;
    }
  });
}

/* ---------- Acessibilidade ---------- */

const ESCALAS = [1, 1.15, 1.3, 1.5];
const OPCOES = ['contraste', 'leitura', 'espacamento', 'links', 'movimento', 'guia', 'libras'];
const CHAVE_A11Y = 'ab-acessibilidade';

/** Garante que as preferências salvas tenham só valores conhecidos. Exportável para teste. */
function normalizarPreferencias(bruto) {
  const pref = { escala: 0 };
  const dados = bruto && typeof bruto === 'object' ? bruto : {};
  const escala = Number(dados.escala);
  pref.escala = Number.isInteger(escala) && escala >= 0 && escala < ESCALAS.length ? escala : 0;
  OPCOES.forEach((o) => (pref[o] = dados[o] === true));
  return pref;
}

function lerPreferencias() {
  try {
    return normalizarPreferencias(JSON.parse(localStorage.getItem(CHAVE_A11Y) || '{}'));
  } catch {
    return normalizarPreferencias({});
  }
}

function salvarPreferencias(pref) {
  try {
    localStorage.setItem(CHAVE_A11Y, JSON.stringify(pref));
  } catch {
    /* navegação privada ou armazenamento bloqueado: as escolhas valem só nesta visita */
  }
}

function carregarFonteLeitura() {
  if (document.querySelector('[data-fonte-leitura]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap';
  link.dataset.fonteLeitura = '';
  document.head.appendChild(link);
}

let guia = null;
function moverGuia(e) {
  if (guia) guia.style.top = `${e.clientY}px`;
}
function definirGuia(ativo) {
  if (ativo && !guia) {
    guia = document.createElement('div');
    guia.className = 'a11y-guia';
    guia.setAttribute('aria-hidden', 'true');
    guia.style.top = '50%';
    document.body.appendChild(guia);
    window.addEventListener('pointermove', moverGuia, { passive: true });
  } else if (!ativo && guia) {
    guia.remove();
    guia = null;
    window.removeEventListener('pointermove', moverGuia);
  }
}

let librasCarregado = false;
function carregarLibras() {
  // Widget oficial do Governo Federal (vlibras.gov.br). Só é baixado se a pessoa ativar a opção.
  if (librasCarregado) {
    document.querySelector('[vw]')?.removeAttribute('hidden');
    return;
  }
  librasCarregado = true;
  const caixa = document.createElement('div');
  caixa.setAttribute('vw', '');
  caixa.className = 'enabled';
  caixa.innerHTML = '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
  document.body.appendChild(caixa);
  const script = document.createElement('script');
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  script.onload = () => {
    try {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
      // o widget se monta no evento load, que já aconteceu
      window.dispatchEvent(new Event('load'));
    } catch {
      /* serviço indisponível */
    }
  };
  document.body.appendChild(script);
}

function aplicarPreferencias(pref) {
  const raiz = document.documentElement;
  raiz.style.setProperty('--a11y-escala', String(ESCALAS[pref.escala]));
  ['contraste', 'leitura', 'espacamento', 'links', 'movimento'].forEach((o) => raiz.classList.toggle(`a11y-${o}`, pref[o]));
  if (pref.leitura) carregarFonteLeitura();
  definirGuia(pref.guia);
  if (pref.libras && IDIOMA === 'pt') carregarLibras();
  else document.querySelector('[vw]')?.setAttribute('hidden', '');
}

function prepararAcessibilidade() {
  const botao = document.querySelector('[data-a11y-botao]');
  const painel = document.querySelector('[data-a11y-painel]');
  let pref = lerPreferencias();
  aplicarPreferencias(pref);
  if (!botao || !painel) return;

  const saida = painel.querySelector('[data-a11y-escala]');
  const menos = painel.querySelector('[data-a11y-texto="-1"]');
  const mais = painel.querySelector('[data-a11y-texto="1"]');

  const sincronizar = () => {
    saida.textContent = `${Math.round(ESCALAS[pref.escala] * 100)}%`;
    menos.disabled = pref.escala === 0;
    mais.disabled = pref.escala === ESCALAS.length - 1;
    painel.querySelectorAll('[data-a11y]').forEach((b) => b.setAttribute('aria-pressed', String(pref[b.dataset.a11y])));
  };
  const atualizar = (mudanca) => {
    pref = normalizarPreferencias({ ...pref, ...mudanca });
    aplicarPreferencias(pref);
    salvarPreferencias(pref);
    sincronizar();
  };
  sincronizar();

  const abrir = (aberto) => {
    painel.hidden = !aberto;
    botao.setAttribute('aria-expanded', String(aberto));
    if (aberto) painel.querySelector('button')?.focus();
  };
  botao.addEventListener('click', () => abrir(painel.hidden));
  painel.querySelector('[data-a11y-fechar]')?.addEventListener('click', () => {
    abrir(false);
    botao.focus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !painel.hidden) {
      abrir(false);
      botao.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!painel.hidden && !painel.contains(e.target) && !botao.contains(e.target)) abrir(false);
  });

  painel.querySelectorAll('[data-a11y-texto]').forEach((b) =>
    b.addEventListener('click', () => atualizar({ escala: pref.escala + Number(b.dataset.a11yTexto) })),
  );
  painel.querySelectorAll('[data-a11y]').forEach((b) =>
    b.addEventListener('click', () => atualizar({ [b.dataset.a11y]: !pref[b.dataset.a11y] })),
  );
  painel.querySelector('[data-a11y-restaurar]')?.addEventListener('click', () => atualizar(normalizarPreferencias({})));
}

/* ---------- Diagrama "Onde eu atuo" ---------- */

function prepararVenn() {
  const venn = document.querySelector('[data-venn]');
  const detalhes = document.querySelector('[data-venn-detalhes]');
  if (!venn || !detalhes) return;
  const alvos = [...venn.querySelectorAll('[data-regiao]')];

  const escolher = (regiao) => {
    alvos.forEach((a) => a.setAttribute('aria-pressed', String(a.dataset.regiao === regiao)));
    detalhes.querySelectorAll('[data-regiao-conteudo]').forEach((li) => li.classList.toggle('ativo', li.dataset.regiaoConteudo === regiao));
    // destaca os círculos envolvidos: 'tn' acende tecnologia e negócios
    venn.dataset.ativo = regiao.split('').join(' ');
  };
  alvos.forEach((a) => a.addEventListener('click', () => escolher(a.dataset.regiao)));
  escolher(alvos.find((a) => a.getAttribute('aria-pressed') === 'true')?.dataset.regiao || 'tnp');
}

if (typeof module !== 'undefined') module.exports = { validarContato, TEXTOS, normalizarPreferencias };
