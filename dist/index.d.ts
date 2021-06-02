import * as React from 'react';
export declare function usePortray<T>(Component: Portray.FC<T>): React.FC<T>;
export declare namespace Portray {
    type Props<P> = P & {
        p: {
            [id: string]: string;
        };
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
