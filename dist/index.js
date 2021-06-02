var React = require('react');

function usePortray(Component) {
  var withPropsComponent = function withPropsComponent(props) {
    return React.createElement(Component, Object.assign({}, props, {
      p: {
        'Hola mundo': 'Hello word'
      }
    }));
  };

  return withPropsComponent;
}

exports.usePortray = usePortray;
//# sourceMappingURL=index.js.map
