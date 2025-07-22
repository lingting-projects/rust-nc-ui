import { webSubscribe } from '@/services/web';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Form } from 'antd';
import { useEffect } from 'react';
import { ProFormField } from '@ant-design/pro-components';
import { TimeDuration } from '@/components/Time';

type Props = {
  open: boolean;
  close: (id?: string) => void;
  vo?: SUBSCRIBE.Subscribe;
};

export default ({ open, close, vo }: Props) => {
  const [form] = Form.useForm<SUBSCRIBE.Subscribe>();

  useEffect(() => {
    form.resetFields();
    if (vo) {
      form.setFieldsValue({ ...vo });
    }
  }, [vo]);

  return (
    <>
      <ModalForm<SUBSCRIBE.Subscribe, SUBSCRIBE.Subscribe>
        open={open}
        form={form}
        modalProps={{ forceRender: true, maskClosable: false }}
        onOpenChange={(flag) => !flag && close()}
        title={`${!!vo?.id ? '修改' : '创建'}订阅`}
        onFinish={async (values) =>
          webSubscribe.upsert(values).then((id) => {
            // 更新则不刷新, 所以不传入id
            close(values.id ? undefined : id);
          })
        }
      >
        <ProFormText name={'id'} hidden={true} />

        <ProFormText name={'name'} label={'订阅名称'} rules={[{ required: true }]} />

        <ProFormTextArea name={'url'} label={'订阅地址'} rules={[{ required: true }]} />

        <ProFormField
          name={'interval'}
          label={'更新间隔'}
          rules={[{ required: true }]}
          initialValue={36000000}
        >
          <TimeDuration defaultSourceType={'hours'} />
        </ProFormField>

        <ProFormText name={'upload'} hidden={true} />
        <ProFormText name={'download'} hidden={true} />
        <ProFormText name={'max'} hidden={true} />
        <ProFormText name={'expireTime'} hidden={true} />
        <ProFormText name={'updateTime'} hidden={true} />
      </ModalForm>
    </>
  );
};
