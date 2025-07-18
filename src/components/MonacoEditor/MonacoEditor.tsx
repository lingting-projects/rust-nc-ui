import {PageLoading} from '@ant-design/pro-layout';
import Editor, {loader, Monaco} from '@monaco-editor/react';
import {editor} from 'monaco-editor';
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {
  defaultGetOptions,
  defaultOptions,
  mergeLoaderConfig,
  mergeOptions,
  MonacoEditorProps,
} from './typings';

export default ({language, options, onChange, action, onMount, ...props}: MonacoEditorProps) => {
  const ref = useRef<editor.IStandaloneCodeEditor>();

  const editorOptions = useMemo(() => mergeOptions(defaultOptions, options), [options]);

  const editorOnChange = useCallback(
    (value: string | undefined, ev: editor.IModelContentChangedEvent) => {
      if (!onChange) {
        return;
      }
      const v = ref.current?.getValue(defaultGetOptions) || value;
      onChange(v, ev);
    },
    [onChange],
  );

  const editorOnMount = useCallback(
    (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      ref.current = editor;
      if (onMount) {
        onMount(editor, monaco);
      }
    },
    [onMount],
  );

  useEffect(() => {
    loader.config(mergeLoaderConfig());
  }, []);

  useImperativeHandle(
    action,
    () => ({
      editor: ref.current,
      getValue: (po) => {
        const options = {...defaultGetOptions, ...po};
        return ref.current?.getValue(options) || '';
      },
      setValue: (value) => ref.current?.setValue(value),
    }),
    [ref.current],
  );

  useEffect(() => {
    ref.current?.updateOptions(editorOptions);
  }, [editorOptions, ref.current]);

  return (
    <Editor
      loading={<PageLoading/>}
      theme="light"
      {...props}
      options={editorOptions}
      onMount={editorOnMount}
      language={language}
      onChange={editorOnChange}
    />
  );
};
