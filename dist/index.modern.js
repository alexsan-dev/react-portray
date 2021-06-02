import { createContext, useState, createElement, useContext } from 'react';

const defContext = {
  langs: ['en', 'es'],
  setLang: () => {},
  mainLang: 'en',
  langCode: 'en',
  strings: {}
};
const portrayContext = createContext(defContext);
function withPortray(Component, strings, settings) {
  const PortrayWrappedComponent = props => {
    const mainLang = (settings === null || settings === void 0 ? void 0 : settings.mainLang) || 'en';
    const [langCode, setLang] = useState(mainLang);
    return createElement(portrayContext.Provider, {
      value: {
        langCode,
        setLang,
        mainLang,
        strings,
        langs: (settings === null || settings === void 0 ? void 0 : settings.langs) || ['en', 'es']
      }
    }, createElement(Component, Object.assign({}, props)));
  };

  return PortrayWrappedComponent;
}

function getTextFromDict(key, ctx) {
  const trimmedKey = key[0].trim();

  if (trimmedKey in ctx.strings) {
    const text = ctx.strings[trimmedKey][ctx.langCode];
    return text === '$' ? trimmedKey : text;
  } else {
    const tmpStrings = { ...ctx.strings
    };
    tmpStrings[trimmedKey] = Object.fromEntries(ctx.langs.map(langCode => [langCode, langCode === ctx.mainLang ? '$' : '']));
    return trimmedKey;
  }
}

function withStrings(Component) {
  const WithStringsComponent = props => {
    const ctx = useContext(portrayContext);

    function $(key) {
      return getTextFromDict(key, ctx);
    }

    return createElement(Component, Object.assign({}, props, ctx, {
      "$": $
    }));
  };

  return WithStringsComponent;
}

export { withPortray, withStrings };
//# sourceMappingURL=index.modern.js.map
