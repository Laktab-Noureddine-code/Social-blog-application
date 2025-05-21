/* eslint-disable react/prop-types */
import  { useEffect } from 'react';
import { common, createLowlight } from 'lowlight';
import './BlogPreview.css';

// Créer une instance lowlight avec les langages communs
const lowlight = createLowlight(common);

// Importer les langages supplémentaires
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import php from 'highlight.js/lib/languages/php';

// Enregistrer les langages
lowlight.register('javascript', javascript);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('java', java);
lowlight.register('python', python);
lowlight.register('php', php);

const BlogPreview = ({ content }) => {
  useEffect(() => {
    // Sélectionner tous les blocs de code dans l'aperçu
    const codeBlocks = document.querySelectorAll('.blog-preview pre code');
    
    codeBlocks.forEach(block => {
      // Obtenir le langage à partir de l'attribut class (language-xxx)
      const classNames = block.className.split(' ');
      const languageClass = classNames.find(className => className.startsWith('language-'));
      const language = languageClass ? languageClass.replace('language-', '') : 'javascript';
      
      try {
        // Appliquer la coloration syntaxique avec lowlight
        const result = lowlight.highlight(language, block.textContent);
        
        // Remplacer le contenu du bloc par le HTML généré par lowlight
        let html = '';
        result.children.forEach(node => {
          if (node.type === 'element') {
            html += `<span class="${node.properties.className.join(' ')}">${node.children[0].value}</span>`;
          } else if (node.type === 'text') {
            html += node.value;
          }
        });
        
        block.innerHTML = html;
      } catch (error) {
        console.error(`Erreur lors de la coloration syntaxique pour ${language}:`, error);
      }
    });
  }, [content]);

  return (
    <div className="blog-preview">
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogPreview;