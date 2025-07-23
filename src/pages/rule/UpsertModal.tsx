import { TimeDuration } from '@/components/Time';
import { webRule } from '@/services/web';
import { ProFormField } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Form } from 'antd';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  close: (id?: string) => void;
  vo?: RULE.Rule;
};

export default ({ open, close, vo }: Props) => {
  const [form] = Form.useForm<RULE.Rule>();

  useEffect(() => {
    form.resetFields();
    if (vo) {
      form.setFieldsValue({ ...vo });
    }
  }, [vo]);

  return (
    <>
      <ModalForm<RULE.Rule, RULE.Rule>
        open={open}
        form={form}
        modalProps={{ forceRender: true, maskClosable: false }}
        onOpenChange={(flag) => !flag && close()}
        title={`${!!vo?.id ? '修改' : '创建'}规则`}
        onFinish={async (values) =>
          webRule.upsert(values).then((id) => {
            // 更新则不刷新, 所以不传入id
            close(values.id ? undefined : id);
          })
        }
      >
        <ProFormText name={'id'} hidden={true} />

        <ProFormText name={'name'} label={'规则名称'} rules={[{ required: true }]} />

        <ProFormTextArea name={'url'} label={'规则地址'} rules={[{ required: true }]} />

        <ProFormField
          name={'interval'}
          label={'更新间隔'}
          rules={[{ required: true }]}
          initialValue={36000000}
        >
          <TimeDuration defaultSourceType={'hours'} />
        </ProFormField>
      </ModalForm>
    </>
  );
};
