var React = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var defContext = {
  langs: ['en', 'es'],
  setLang: function setLang() {},
  mainLang: 'en',
  langCode: 'en',
  strings: {}
};
var portrayContext = React.createContext(defContext);
function withPortray(Component, strings, settings) {
  var PortrayWrappedComponent = function PortrayWrappedComponent(props) {
    var mainLang = (settings === null || settings === void 0 ? void 0 : settings.mainLang) || 'en';

    var _React$useState = React.useState(mainLang),
        langCode = _React$useState[0],
        setLang = _React$useState[1];

    return React.createElement(portrayContext.Provider, {
      value: {
        langCode: langCode,
        setLang: setLang,
        mainLang: mainLang,
        strings: strings,
        langs: (settings === null || settings === void 0 ? void 0 : settings.langs) || ['en', 'es']
      }
    }, React.createElement(Component, Object.assign({}, props)));
  };

  return PortrayWrappedComponent;
}

function getTextFromDict(key, ctx) {
  var trimmedKey = key[0].trim();

  if (trimmedKey in ctx.strings) {
    var text = ctx.strings[trimmedKey][ctx.langCode];
    return text === '$' ? trimmedKey : text;
  } else {
    var tmpStrings = _extends({}, ctx.strings);

    tmpStrings[trimmedKey] = Object.fromEntries(ctx.langs.map(function (langCode) {
      return [langCode, langCode === ctx.mainLang ? '$' : ''];
    }));
    return trimmedKey;
  }
}

function withStrings(Component) {
  var WithStringsComponent = function WithStringsComponent(props) {
    var ctx = React.useContext(portrayContext);

    function $(key) {
      return getTextFromDict(key, ctx);
    }

    return React.createElement(Component, Object.assign({}, props, ctx, {
      "$": $
    }));
  };

  return WithStringsComponent;
}

exports.withPortray = withPortray;
exports.withStrings = withStrings;
//# sourceMappingURL=index.js.map
