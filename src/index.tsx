import * as React from 'react'

// HOC
export function usePortray<T>(Component: Portray.FC<T>) {
  // COMPONENTE
  const withPropsComponent: React.FC<T> = (props: T) => {
    return (
      <Component
        {...props}
        p={{
          'Hola mundo': 'Hello word'
        }}
      />
    )
  }

  // RENDER
  return withPropsComponent
}

// INTERFAZ
export namespace Portray {
  type Props<P> = P & {
    p: {
      [id: string]: string
    }
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
