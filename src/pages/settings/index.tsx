import Button from '@/components/Button';
import { RadioDict } from '@/components/Dict';
import { webSettings } from '@/services/web';
import { useModel } from '@@/exports';
import { FooterToolbar, ProFormField, ProFormSelect } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-form';
import { Card, Flex, Form, Space, Typography } from 'antd';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default () => {
  const { loading: updaterLoading, refresh } = useModel('updater');

  const [form] = Form.useForm<SETTINGS.Settings>();

  const [data, setData] = useState<SETTINGS.Settings>();
  const [loading, setLoading] = useState(false);
  const [footer, setFooter] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    webSettings
      .get()
      .then((v) => {
        setData(v);
        form.setFieldsValue(v);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <ProForm<SETTINGS.Settings>
        form={form}
        loading={loading}
        layout={'horizontal'}
        submitter={false}
        onValuesChange={(_, nv) => {
          setFooter(!isEqual(nv, data));
        }}
      >
        <Flex gap="middle" vertical={true}>
          <Card
            title={
              <Space>
                <Typography.Text>软件设置</Typography.Text>

                <Typography.Text key={'version'} type={'secondary'}>
                  {data?.software.version}
                </Typography.Text>
              </Space>
            }
            loading={loading}
            extra={[
              <Button
                key={'updater'}
                type={'primary'}
                text={'检查更新'}
                loading={updaterLoading}
                onClick={refresh}
              />,
            ]}
          >
            <ProFormField name={['software', 'startup']} label={'开机自启'}>
              <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
            </ProFormField>

            <ProFormField name={['software', 'minimize']} label={'以最小化方式启动'}>
              <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
            </ProFormField>

            <ProFormText name={['software', 'version']} hidden={true} readonly={true} />

            <ProFormField
              name={['run', 'auto']}
              label={'自动运行'}
              extra={'启动后自动使用上次选择配置运行.'}
            >
              <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
            </ProFormField>
            <ProFormText name={['run', 'selected']} hidden={true} readonly={true} />

            <ProFormText name={['software', 'fastGithub']} label={'GitHub加速'} readonly={true} />
            <ProFormText name={['software', 'testUrl']} label={'延迟测试地址'} readonly={true} />
          </Card>

          <Card title={'内核设置'} loading={loading}>
            <ProFormText name={['kernel', 'ui']} label={'WebUi地址'} />
            <ProFormText name={['kernel', 'mixedListen']} label={'混合协议监听范围'} />
            <ProFormText name={['kernel', 'mixedPort']} label={'混合协议监听端口'} />

            <ProFormSelect
              name={['kernel', 'dnsCn']}
              label={'中国分流DNS'}
              fieldProps={{ mode: 'tags', maxTagCount: 3 }}
            />

            <ProFormSelect
              name={['kernel', 'dnsProxy']}
              label={'代理分流DNS'}
              fieldProps={{ mode: 'tags', maxTagCount: 3 }}
            />
            <ProFormText
              name={['kernel', 'singBoxVersion']}
              label={'SingBox版本'}
              readonly={true}
            />
          </Card>
        </Flex>

        {footer && (
          <FooterToolbar>
            <Space>
              <Button
                text={'重置'}
                loading={loading}
                onClick={() => form.setFieldsValue(data || {})}
              />

              <Button
                text={'提交'}
                type={'primary'}
                loading={loading}
                onClick={async () => {
                  try {
                    await form.validateFields();
                    setLoading(true);
                    const settings = form.getFieldsValue();
                    await webSettings.upsert(settings);
                    setFooter(false);
                    reload();
                  } catch (error) {
                    setLoading(false);
                  }
                }}
              />
            </Space>
          </FooterToolbar>
        )}
      </ProForm>
    </>
  );
};
