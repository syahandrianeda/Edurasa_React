import { Node } from '@tiptap/core';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const MathBlock = Node.create({
  name: 'math',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      formula: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="math"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    // serialize only the formula attribute; rendering will be done on display/preview
    const formula = (node.attrs && node.attrs.formula) || '';
    return ['div', { 'data-type': 'math', formula, ...HTMLAttributes }];
  },

  addNodeView() {
    return (props: any) => {
      const { node } = props;
      const dom = document.createElement('span');
      dom.setAttribute('data-type', 'math');
      dom.className = 'math-node';
      dom.style.padding = '4px 2px';

      const formula = node.attrs.formula || '';
      try {
        dom.innerHTML = katex.renderToString(formula, { throwOnError: false });
      } catch (err) {
        dom.textContent = formula;
      }

      return {
        dom,
      };
    };
  },
});

export const MathInline = Node.create({
  name: 'math_inline',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,
  draggable: false,

  addAttributes() {
    return {
      formula: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="math-inline"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const formula = (node.attrs && node.attrs.formula) || '';
    return ['span', { 'data-type': 'math-inline', formula, ...HTMLAttributes }];
  },

  addNodeView() {
    return (props: any) => {
      const { node } = props;
      const dom = document.createElement('span');
      dom.setAttribute('data-type', 'math-inline');
      dom.className = 'math-inline-node';

      const formula = node.attrs.formula || '';
      try {
        dom.innerHTML = katex.renderToString(formula, { throwOnError: false });
      } catch (err) {
        dom.textContent = formula;
      }

      return { dom };
    };
  },
});
