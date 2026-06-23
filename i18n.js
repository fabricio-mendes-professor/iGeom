import { ptBr } from './lang/pt-br.js';
import { en } from './lang/en.js';
import { es } from './lang/es.js';

// Mapa que conecta a string de configuração ao objeto importado acima
const languages = {
  'pt-br': ptBr,
  'pt': ptBr,
  'en': en,
  'es': es,
  'es-es': es
};

let currentLanguage = 'pt-br'; // Estado interno do idioma atual
let dictionary = languages[currentLanguage]; // Ponteiro para o objeto ativo

export const i18n = {
  /**
   * Altera o idioma atual e emite um evento global para avisar o sistema.
   */
  setLanguage(langCode) {
    if (!langCode) return;
    
    const code = langCode.toLowerCase();
    const shortCode = code.split('-')[0]; // Converte 'en-US' em 'en', ou 'es-AR' em 'es'
    
    let targetLanguage = currentLanguage;

    // Algoritmo de Fallback (procura o código completo, depois o curto)
    if (languages[code]) {
      targetLanguage = code;
    } else if (languages[shortCode]) {
      targetLanguage = shortCode;
    } else {
      console.warn(`Idioma [${langCode}] não suportado. Mantendo [${currentLanguage}].`);
      return;
    }

    // Se o idioma escolhido for diferente do atual, atualiza o ponteiro
    if (targetLanguage !== currentLanguage) {
      currentLanguage = targetLanguage;
      dictionary = languages[targetLanguage];
      
      // MECANISMO DE EVENTOS: Cria um evento customizado no navegador
      const event = new CustomEvent('languageChanged', { detail: { lang: currentLanguage } });
      window.dispatchEvent(event); // Dispara o alarme: "O idioma mudou!"
    }
  },

  getLanguage() {
    return currentLanguage;
  },

  /**
   * Navega dinamicamente dentro do objeto usando caminhos de texto (ex: 'menu.file')
   */
  t(path) {
    try {
      // split('.') transforma 'tools.point' em ['tools', 'point']
      // reduce() caminha pelo objeto: dictionary['tools']['point']
      const result = path.split('.').reduce((obj, key) => obj[key], dictionary);
      return result || path; // Se a chave não existir, retorna a própria chave como string
    } catch (e) {
      return path; // Fallback de segurança caso o caminho quebre
    }
  }
};

// Exportação curta para uso massivo no código
export const _ = i18n.t;