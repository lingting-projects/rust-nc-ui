import {webRule} from '@/services/web';
import {ModalForm, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import {Form, Typography} from 'antd';
import {useEffect} from 'react';

type Props = {
  open: boolean;
  close: (id?: string) => void;
  vo?: RULE.Rule;
};

export default ({open, close, vo}: Props) => {
  const [form] = Form.useForm<RULE.Rule>();

  useEffect(() => {
    form.resetFields();
    if (vo) {
      form.setFieldsValue({...vo});
    }
  }, [vo]);

  return (
    <>
      <ModalForm<RULE.Rule, RULE.Rule>
        open={open}
        form={form}
        modalProps={{forceRender: true, maskClosable: false}}
        onOpenChange={(flag) => !flag && close()}
        title={`${!!vo?.id ? '修改' : '创建'}规则`}
        onFinish={async (values) =>
          webRule.upsert(values).then((id) => {
            // 更新则不刷新, 所以不传入id
            close(values.id ? undefined : id);
          })
        }
      >
        <ProFormText name={'id'} hidden={true}/>

        <ProFormText name={'name'} label={'规则名称'} rules={[{required: true}]}/>

        <ProFormTextArea name={'url'} label={'规则地址'} rules={[{required: true}]}/>

        <ProFormText
          name={'interval'}
          label={'更新间隔'}
          rules={[{required: true}]}
          initialValue={'PT10H'}
          extra={
            <Typography.Text type={'secondary'}>
              如果输入纯数字则该单位为秒. 支持
              <Typography.Link
                href={'https://en.wikipedia.org/wiki/ISO_8601#Durations'}
                target={'_blank'}
                title={'ISO_8601'}
                copyable={true}
              >
                ISO_8601
              </Typography.Link>
              标准. PT10H 表示10小时更新一次.
            </Typography.Text>
          }
        />

        <ProFormText name={'count'} hidden={true}/>
        <ProFormText name={'processCount'} hidden={true}/>
        <ProFormText name={'domainCount'} hidden={true}/>
        <ProFormText name={'ipCount'} hidden={true}/>
        <ProFormText name={'otherCount'} hidden={true}/>
        <ProFormText name={'updateTime'} hidden={true}/>
      </ModalForm>
    </>
  );
};
