// REACT
import * as React from 'react'

export const portrayAppCtx = (stringsDict: PortrayDict) => {
  // RUTA DE STRINGS
  const srcPath = caller().map((value: caller.CallSite) => {
    const fileName: string = value.getFileName()
    return `${fileName.substr(
      0,
      fileName.lastIndexOf('/')
    )}/src/Lang/Strings.json`
  })[2]

  // REESCRIBIR STRINGS
  const srcPathSolved: string = path.resolve(srcPath)
  fs.exists(srcPathSolved, (exists: boolean) => {
    if (exists) {
      fs.readFile(srcPathSolved, (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) console.warn(err)
        else {
          // NUEVO DICCIONARIO
          const newStrings = {
            ...stringsDict,
            // @ts-ignore
            ...JSON.parse(data)
          } as PortrayDict

          // ESCRIBIR ARCHIVO
          fs.writeFile(
            srcPathSolved,
            JSON.stringify(newStrings),
            (err: NodeJS.ErrnoException) => {
              if (err) console.warn(err)
            }
          )
        }
      })
    }
  })
}

// MAIN HOC
interface PortrayContextProps {
  mainLang?: string
  langs?: string[]
}

// CONTEXTO
interface PortrayContext {
  setLang: (langCode: string) => void
  updateStrings: (strings: PortrayDict) => void
  strings: PortrayDict
  langCode: string
  mainLang: string
  langs: string[]
}
const defContext: PortrayContext = {
  langs: ['en', 'es'],
  updateStrings: () => {},
  setLang: () => {},
  mainLang: 'en',
  langCode: 'en',
  strings: {}
}
const portrayContext: React.Context<PortrayContext> =
  React.createContext(defContext)

export function withPortray<T>(
  Component: React.FC<T>,
  strings: PortrayDict,
  settings?: PortrayContextProps
) {
  // COMPONENTE
  const PortrayWrappedComponent: React.FC<T> = (props: T) => {
    // ESTADO
    const mainLang: string = settings?.mainLang || 'en'
    const [langCode, setLang] = React.useState<string>(mainLang)

    // STRINGS
    const stringsRef: React.MutableRefObject<PortrayDict> =
      React.useRef(strings)
    const updateStrings = (newStrings: PortrayDict) =>
      (stringsRef.current = newStrings)

    // RENDER
    return (
      <portrayContext.Provider
        value={{
          langCode,
          setLang,
          mainLang,
          strings,
          updateStrings,
          langs: settings?.langs || ['en', 'es']
        }}
      >
        <Component {...props} />
      </portrayContext.Provider>
    )
  }

  // RENDER
  return PortrayWrappedComponent
}

// OBTENER TEXTO
function getTextFromDict(key: TemplateStringsArray, ctx: PortrayContext) {
  // FORMATO DE KEY
  const trimmedKey: string = key[0].trim()

  // VERIFICAR SI EXISTE
  if (trimmedKey in ctx.strings) {
    const text: string = ctx.strings[trimmedKey][ctx.langCode]
    return text === '$' ? trimmedKey : text
  } else {
    // CREAR
    const tmpStrings: PortrayDict = { ...ctx.strings }
    tmpStrings[trimmedKey] = Object.fromEntries(
      ctx.langs.map((langCode: string) => [
        langCode,
        langCode === ctx.mainLang ? '$' : ''
      ])
    )

    // RETORNAR
    return trimmedKey
  }
}

// HOC
export function withStrings<T>(Component: Portray.FC<T>) {
  // COMPONENTE
  const WithStringsComponent: React.FC<T> = (props: T) => {
    // CONTEXTO
    const ctx = React.useContext(portrayContext)
    function $(key: TemplateStringsArray) {
      return getTextFromDict(key, ctx)
    }

    // RENDER
    return <Component {...props} {...ctx} $={$} />
  }

  // RENDER
  return WithStringsComponent
}

export namespace Portray {
  type Props<P> = P &
    PortrayContext & {
      $: (key: TemplateStringsArray) => string
    }

  export type FC<P = {}> = FunctionComponent<P>

  interface FunctionComponent<P = {}> {
    (
      props: React.PropsWithChildren<Props<P>>,
      context?: any
    ): React.ReactElement<any, any> | null
    propTypes?: React.WeakValidationMap<P>
    contextTypes?: React.ValidationMap<any>
    defaultProps?: Partial<P>
    displayName?: string
  }
}

// EXPORTAR
export default Portray
