import * as React from 'react';
interface PortrayContextProps {
    mainLang?: string;
    langs?: string[];
}
interface PortrayContext {
    setLang: (langCode: string) => void;
    strings: PortrayDict;
    langCode: string;
    mainLang: string;
    langs: string[];
}
export declare function withPortray<T>(Component: React.FC<T>, strings: PortrayDict, settings?: PortrayContextProps): React.FC<T>;
export declare function withStrings<T>(Component: Portray.FC<T>): React.FC<T>;
export declare namespace Portray {
    type Props<P> = P & PortrayContext & {
        $: (key: TemplateStringsArray) => string;
    };
    export type FC<P = {}> = FunctionComponent<P>;
    interface FunctionComponent<P = {}> {
        (props: React.PropsWithChildren<Props<P>>, context?: any): React.ReactElement<any, any> | null;
        propTypes?: React.WeakValidationMap<P>;
        contextTypes?: React.ValidationMap<any>;
        defaultProps?: Partial<P>;
        displayName?: string;
    }
    export {};
}
export default Portray;
