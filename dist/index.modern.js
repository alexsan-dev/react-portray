import { createElement } from 'react';

function usePortray(Component) {
  const withPropsComponent = props => {
    return createElement(Component, Object.assign({}, props, {
      p: {
        'Hola mundo': 'Hello word'
      }
    }));
  };

  return withPropsComponent;
}

export { usePortray };
//# sourceMappingURL=index.modern.js.map
