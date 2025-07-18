declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | 'prod' | false;

export type XWindow = typeof window & {
  logoutShow?: boolean;
  queryToken?: boolean;
  setRequestPrefix?: (target?: string) => void;
  kmp: (params: {
    request: string;
    persistent: boolean;
    onSuccess: (value: string) => void;
    onFailure: (code: number, message: string) => void;
  }) => void;
};
