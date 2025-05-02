/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    'virto-connect': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      id?: string;
      server?: string;
      'provider-url'?: string;
      ref?: React.RefObject<any>;
      style?: React.CSSProperties;
    };
  }
}

declare module 'virto-connect' {
  export interface VirtoConnectElement extends HTMLElement {
    open: () => void;
    close: () => void;
  }
} 