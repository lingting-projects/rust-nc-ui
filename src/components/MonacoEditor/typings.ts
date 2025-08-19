import { DiffEditorProps, EditorProps } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { MutableRefObject } from 'react';

export const mergeLoaderConfig = () => {
  return { paths: { vs: `${window.location.origin}/vs` } };
};

export type MonacoEditorAction = {
  editor?: editor.IStandaloneCodeEditor;
  getValue: (options?: { preserveBOM: boolean; lineEnding: string }) => string;
  setValue: (value: string) => void;
};

export type Language = 'shell' | 'yml' | 'plaintext' | string;

export type MonacoEditorProps = {
  language: Language;
  action?: MutableRefObject<MonacoEditorAction | undefined>;
} & Omit<EditorProps, 'language'>;

export const defaultOptions: MonacoEditorProps['options'] = {
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  minimap: {
    enabled: true,
    size: 'fill',
  },
  folding: true,
  automaticLayout: true,
};

export const defaultGetOptions = {preserveBOM: false, lineEnding: '\n'};

export type MonacoDiffEditorAction = {
  editor?: editor.IStandaloneDiffEditor;
  getOriginal: (options?: { preserveBOM: boolean; lineEnding: string }) => string;
  getModified: (options?: { preserveBOM: boolean; lineEnding: string }) => string;
};

export type MonacoDiffEditorProps = {
  language: Language;
  action?: MutableRefObject<MonacoDiffEditorAction | undefined>;
} & Omit<DiffEditorProps, 'language'>;

export const defaultDiffOptions: DiffEditorProps['options'] = {
  ...defaultOptions,
  readOnly: true,
  renderGutterMenu: false,
  inDiffEditor: true,
  ignoreTrimWhitespace: true,
  diffAlgorithm: 'advanced',
};

export const mergeOptions = (
  s1?: MonacoEditorProps['options'],
  s2?: MonacoEditorProps['options'],
) => {
  const merged = {...s1, ...s2};
  merged.scrollbar = {...s1?.scrollbar, ...s2?.scrollbar};
  merged.stickyScroll = {...s1?.stickyScroll, ...s2?.stickyScroll};
  merged.find = {...s1?.find, ...s2?.find};
  merged.minimap = {...s1?.minimap, ...s2?.minimap};
  merged.comments = {...s1?.comments, ...s2?.comments};
  return merged;
};
