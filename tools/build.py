"""Gera as versões em inglês (/en/) e espanhol (/es/) a partir das páginas em português.

Uso: python3 tools/build.py   (rode na raiz do repositório depois de editar o português)
"""
import re, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from traducoes import T, MANTER

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PAGINAS = ['index.html', 'projetos/nexus/index.html']
IDIOMAS = {'en': (1, 'en', 'en_US'), 'es': (2, 'es', 'es_ES')}
ATRIBUTOS = ('aria-label', 'alt', 'title', 'placeholder')

def traduzir(pagina, idioma):
    col, lang, locale = IDIOMAS[idioma]
    dic = {}
    for linha in T:
        if linha[0] in dic and dic[linha[0]] != linha[col]:
            raise SystemExit(f'tradução duplicada e diferente: {linha[0]!r}')
        dic[linha[0]] = linha[col]
    faltando = []

    def trad(texto):
        nucleo = texto.strip()
        if not nucleo or nucleo in MANTER: return texto
        if nucleo not in dic:
            faltando.append(nucleo); return texto
        ini = texto[:len(texto) - len(texto.lstrip())]; fim = texto[len(texto.rstrip()):]
        return ini + dic[nucleo] + fim

    html = (RAIZ / pagina).read_text()
    html = re.sub(r'\n\s*<li data-so-pt>.*?</li>', '', html)
    caminho = '' if pagina == 'index.html' else pagina[:-len('index.html')]
    partes = re.split(r'(<[^>]+>)', html)
    dentro = None
    for i, p in enumerate(partes):
        if p.startswith('<'):
            nome = re.match(r'</?([a-zA-Z0-9]+)', p)
            nome = nome.group(1).lower() if nome else ''
            if nome in ('script', 'style'):
                dentro = None if p.startswith('</') else nome
            for at in ATRIBUTOS:
                p = re.sub(rf'(\s{at}=")([^"]*)(")', lambda m: m.group(1) + trad(m.group(2)) + m.group(3), p)
            if nome == 'meta' and re.search(r'(name="description"|property="og:(title|description|image:alt)")', p):
                p = re.sub(r'(content=")([^"]*)(")', lambda m: m.group(1) + trad(m.group(2)) + m.group(3), p)
            if nome == 'a' and 'hreflang=' not in p:
                p = re.sub(r'href="/(?!en/|es/|assets/)([^"]*)"', lambda m: f'href="/{idioma}/{m.group(1)}"', p)
            if nome == 'a' and 'data-idioma=' in p:
                p = p.replace(' aria-current="page"', '')
                if f'data-idioma="{idioma}"' in p: p = p.replace(f'data-idioma="{idioma}"', f'data-idioma="{idioma}" aria-current="page"')
            partes[i] = p
        elif dentro is None:
            partes[i] = trad(p)
    html = ''.join(partes)
    html = html.replace('<html lang="pt-BR">', f'<html lang="{lang}">')
    html = html.replace('content="pt_BR"', f'content="{locale}"')
    url = f'https://arthursantx.github.io/{caminho}'
    html = html.replace(f'<link rel="canonical" href="{url}">', f'<link rel="canonical" href="https://arthursantx.github.io/{idioma}/{caminho}">')
    html = html.replace(f'<meta property="og:url" content="{url}">', f'<meta property="og:url" content="https://arthursantx.github.io/{idioma}/{caminho}">')
    return html, sorted(set(faltando))

def main():
    erro = False
    for idioma in IDIOMAS:
        for pagina in PAGINAS:
            html, faltando = traduzir(pagina, idioma)
            if faltando:
                erro = True
                print(f'[{idioma}] {pagina}: sem tradução:'); [print('   ', f) for f in faltando]
            destino = RAIZ / idioma / pagina
            destino.parent.mkdir(parents=True, exist_ok=True)
            destino.write_text(html)
    if erro: raise SystemExit(1)
    print('ok: en/ e es/ gerados')

if __name__ == '__main__':
    main()
