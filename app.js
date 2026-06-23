import { i18n, _ } from './i18n.js';

/**
 * Função de Renderização: Captura os elementos HTML pelo ID e injeta as strings traduzidas.
 */
function render() {
  // Atualiza títulos e textos soltos
  document.getElementById('app-title').innerText = _('messages.welcome');
  
  // Atualiza o Menu Superior do iGeomJS
  document.getElementById('menu-file').innerText = _('menu.file');
  document.getElementById('menu-edit').innerText = _('menu.edit');
  document.getElementById('menu-view').innerText = _('menu.view');
  document.getElementById('menu-help').innerText = _('menu.help');

  // Atualiza os botões de ferramentas usando Template Literals (injetando ícones + texto)
  document.getElementById('btn-point').innerHTML = `📍 ${_('tools.point')}`;
  document.getElementById('btn-line').innerHTML = `📏 ${_('tools.line')}`;
  document.getElementById('btn-circle').innerHTML = `⭕ ${_('tools.circle')}`;
  document.getElementById('btn-intersection').innerHTML = `✖️ ${_('tools.intersection')}`;
}

/**
 * Função de Inicialização do Sistema
 */
function init() {
  // 1. Vincula o clique dos botões seletores de idioma ao Motor i18n
  document.getElementById('btn-lang-pt').addEventListener('click', () => i18n.setLanguage('pt-br'));
  document.getElementById('btn-lang-en').addEventListener('click', () => i18n.setLanguage('en'));
  document.getElementById('btn-lang-es').addEventListener('click', () => i18n.setLanguage('es'));

  // 2. Registra o ouvinte do evento customizado. 
  // Sempre que o motor disparar 'languageChanged', a interface roda a função render() automaticamente.
  window.addEventListener('languageChanged', () => {
    render();
  });

  // 3. Sistema Inteligente de Detecção de Idioma:
  // Ordem de prioridade: 1º Parâmetro da URL (?lang=en) -> 2º Idioma do Navegador -> 3º Português (Fallback)
  const urlParams = new URLSearchParams(window.location.search);
  const detectLang = urlParams.get('lang') || navigator.language || 'pt-br';
  
  i18n.setLanguage(detectLang);
  
  // Executa a primeira renderização para desenhar os textos iniciais na tela
  render();
}

// Garante que o script só vai rodar quando o navegador tiver desenhado todo o esqueleto do HTML
document.addEventListener('DOMContentLoaded', init);