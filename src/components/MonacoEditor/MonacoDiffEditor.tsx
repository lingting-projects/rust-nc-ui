import { PageLoading } from '@ant-design/pro-layout';
import { DiffEditor, Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import {
  defaultDiffOptions,
  defaultGetOptions,
  mergeOptions,
  MonacoDiffEditorProps,
} from './typings';
import IStandaloneDiffEditor = editor.IStandaloneDiffEditor;

export default ({ options, action, onMount, ...props }: MonacoDiffEditorProps) => {
  const ref = useRef<IStandaloneDiffEditor>();
  const editorOptions = useMemo(() => mergeOptions(defaultDiffOptions, options), [options]);

  const editorOnMount = useCallback(
    (editor: editor.IStandaloneDiffEditor, monaco: Monaco) => {
      ref.current = editor;
      if (onMount) {
        onMount(editor, monaco);
      }
    },
    [onMount],
  );

  useImperativeHandle(
    action,
    () => ({
      editor: ref.current,
      getOriginal: (po) => {
        const options = { ...defaultGetOptions, ...po };
        return ref.current?.getOriginalEditor().getValue(options) || '';
      },
      getModified: (po) => {
        const options = { ...defaultGetOptions, ...po };
        return ref.current?.getModifiedEditor().getValue(options) || '';
      },
    }),
    [ref.current],
  );

  return (
    <DiffEditor
      loading={<PageLoading />}
      {...props}
      options={editorOptions}
      onMount={editorOnMount}
    />
  );
};
