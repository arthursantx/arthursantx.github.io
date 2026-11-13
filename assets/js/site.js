// Arthur Borges · interações do site (sem dependências).

/**
 * Preencha quando os dados estiverem disponíveis. Campos vazios ficam ocultos no site.
 * - email: endereço profissional exibido em Contato.
 * - curriculo: caminho do PDF, por exemplo "/assets/arthur-borges-curriculo.pdf".
 * - formEndpoint: endereço que recebe o formulário (ex.: Formspree, "https://formspree.io/f/SEU_ID").
 *   Sem ele, o formulário abre o aplicativo de e-mail do visitante com a mensagem já preenchida.
 */
const CONFIG = {
  email: 'arthurborgess21@gmail.com',
  curriculo: '',
  formEndpoint: '',
  linkedin: 'https://www.linkedin.com/in/arthurborgessantos/',
};

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js');
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
  aplicarConfiguracao();
  prepararTopo();
  prepararMenu();
  prepararSecaoAtiva();
  prepararRevelacao();
  prepararFormulario();
  const ano = document.querySelector('[data-ano]');
  if (ano) ano.textContent = String(new Date().getFullYear());
});

function aplicarConfiguracao() {
  if (CONFIG.email) {
    document.querySelectorAll('[data-se-configurado="email"]').forEach((el) => (el.hidden = false));
    document.querySelectorAll('[data-link-email]').forEach((a) => (a.href = `mailto:${CONFIG.email}`));
    document.querySelectorAll('[data-texto-email]').forEach((el) => (el.textContent = CONFIG.email));
  }
  if (CONFIG.curriculo) {
    document.querySelectorAll('[data-se-configurado="curriculo"]').forEach((el) => (el.hidden = false));
    document.querySelectorAll('[data-link-curriculo]').forEach((a) => (a.href = CONFIG.curriculo));
  }
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
    if (rotulo) rotulo.textContent = aberto ? 'Fechar menu' : 'Abrir menu';
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
function validarContato({ nome, email, mensagem }) {
  const erros = {};
  if (!nome.trim()) erros.nome = 'Conte como posso te chamar.';
  if (!email.trim()) erros.email = 'Informe um e-mail para eu responder.';
  else if (!EMAIL_VALIDO.test(email.trim())) erros.email = 'Esse e-mail parece incompleto. Confira, por favor.';
  if (mensagem.trim().length < 10) erros.mensagem = 'Escreva um pouco mais sobre o assunto (mínimo de 10 caracteres).';
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
      const assunto = v.assunto.trim() || `Contato pelo site · ${v.nome.trim()}`;
      const corpo = `${v.mensagem.trim()}\n\n${v.nome.trim()}\n${v.email.trim()}`;
      window.location.href =
        `mailto:${CONFIG.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      status.className = 'formulario-status aviso';
      status.innerHTML =
        'Abrimos seu aplicativo de e-mail com a mensagem pronta; é só enviar. Se nada abriu, escreva para ' +
        `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a> ou fale comigo pelo ` +
        `<a href="${CONFIG.linkedin}" target="_blank" rel="noopener">LinkedIn</a>.`;
      return;
    }

    enviar.disabled = true;
    enviar.textContent = 'Enviando…';
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
      status.textContent = 'Mensagem enviada. Obrigado pelo contato, respondo assim que possível.';
    } catch {
      status.className = 'formulario-status erro';
      status.textContent = 'Não foi possível enviar agora. Tente de novo em instantes ou use o LinkedIn.';
    } finally {
      enviar.disabled = false;
      enviar.textContent = 'Enviar mensagem';
    }
  });
}

if (typeof module !== 'undefined') module.exports = { validarContato };
