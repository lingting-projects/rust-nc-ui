import {
  MonacoDiffEditor,
  MonacoDiffEditorAction,
  MonacoDiffEditorProps,
} from '@/components/MonacoEditor';
import { TimeDuration } from '@/components/Time';
import { webRule } from '@/services/web';
import { ProFormField, ProFormItem, ProFormRadio } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Form, Row } from 'antd';
import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  close: (id?: string) => void;
  vo?: RULE.Rule;
};

type VO = RULE.Rule & { type: 'local' | 'remote' };

const contentDefault =
  '# DOMAIN,nc.example.org\n' +
  '# DOMAIN-KEYWORD,example\n' +
  '# DOMAIN-SUFFIX,example.org\n' +
  '# DST-PORT,22\n' +
  '# IP-CIDR,172.20.0.0/14\n' +
  '# IP-CIDR6,fd93:0d0b:4e8a:2233::/64\n' +
  '# PROCESS-NAME,lingting-nc\n' +
  '';

export default ({ open, close, vo }: Props) => {
  const editor = useRef<MonacoDiffEditorAction>();
  const [form] = Form.useForm<VO>();

  useEffect(() => {
    form.resetFields();
    if (vo) {
      let isRemote = vo.url && vo.url.startsWith('http');
      form.setFieldsValue({
        ...vo,
        type: isRemote ? 'remote' : 'local',
        interval: isRemote ? vo.interval : 0,
      });
    }
  }, [vo]);

  return (
    <>
      <ModalForm<VO, VO>
        open={open}
        form={form}
        modalProps={{ forceRender: true, maskClosable: false }}
        onOpenChange={(flag) => !flag && close()}
        title={`${!!vo?.id ? '修改' : '创建'}规则`}
        onFinish={async (values) => {
          const data = { ...values };
          // @ts-ignore
          delete data.type;
          if (values.type === 'local') {
            data.url = '';
            data.content = editor.current?.getModified() || '';
            data.interval = 0;
          }

          return webRule.upsert(data).then((id) => {
            // 更新则不刷新, 所以不传入id
            close(values.id ? undefined : id);
          });
        }}
      >
        <ProFormText name={'id'} hidden={true} />

        <Row>
          <ProFormText
            name={'name'}
            label={'规则名称'}
            rules={[{ required: true }]}
            formItemProps={{ style: { flexGrow: 1, marginRight: '8px' } }}
          />

          <ProFormItem noStyle={true} dependencies={['type']}>
            {(form) => {
              let type = form.getFieldValue('type');
              if (type === 'local') {
                return <></>;
              }

              return (
                <>
                  <ProFormField
                    name={'interval'}
                    label={'更新间隔'}
                    rules={[{ required: true }]}
                    initialValue={36000000}
                    formItemProps={{ style: { marginLeft: '8px' } }}
                  >
                    <TimeDuration defaultSourceType={'hours'} />
                  </ProFormField>
                </>
              );
            }}
          </ProFormItem>
          <ProFormRadio.Group
            label={'规则类型'}
            name={'type'}
            options={[
              { label: '本地', value: 'local' },
              { label: '远程', value: 'remote' },
            ]}
            fieldProps={{ optionType: 'button' }}
            initialValue={'remote'}
          />
        </Row>

        <ProFormItem noStyle={true} dependencies={['type']}>
          {(form) => {
            let type = form.getFieldValue('type');
            const dom = [
              <ProFormField<MonacoDiffEditorProps>
                key={'local-content'}
                label={'规则内容'}
                hidden={type !== 'local'}
              >
                <MonacoDiffEditor
                  language={'shell'}
                  action={editor}
                  options={{
                    readOnly: false,
                    renderSideBySide: false,
                  }}
                  original={vo?.content || contentDefault}
                  modified={vo?.content || contentDefault}
                  height={'300px'}
                />
              </ProFormField>,
            ];

            if (type !== 'local') {
              dom.push(
                <ProFormTextArea
                  key={'remote-url'}
                  name={'url'}
                  label={'规则地址'}
                  rules={[{ required: true }]}
                />,
              );
            }

            return dom;
          }}
        </ProFormItem>
      </ModalForm>
    </>
  );
};
