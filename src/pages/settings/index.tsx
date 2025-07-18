import Button from '@/components/Button';
import {RadioDict} from '@/components/Dict';
import {webSettings} from '@/services/web';
import {useModel} from '@@/exports';
import {FooterToolbar, ProFormField, ProFormSelect} from '@ant-design/pro-components';
import {ProForm, ProFormText} from '@ant-design/pro-form';
import {Card, Flex, Form, Space, Tag, Typography} from 'antd';
import {isEqual} from 'lodash';
import {useCallback, useEffect, useState} from 'react';

export default () => {
  const {loading: updaterLoading, refresh} = useModel('updater');

  const [form] = Form.useForm<SETTINGS.SettingsVO>();

  const [data, setData] = useState<SETTINGS.SettingsVO>();
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
      <ProForm<SETTINGS.SettingsVO>
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

                {data?.activeProfiles &&
                  !data?.activeProfiles.includes('prod') && [
                    <Typography.Text key={'version'} type={'secondary'}>
                      {data?.version}
                    </Typography.Text>,
                    ...Array.from({length: data.activeProfiles.length}, (v, i) => (
                      <Tag key={`ap-${i}`}>{data.activeProfiles[i]}</Tag>
                    )),
                  ]}
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
            <ProFormField name={'startup'} label={'开机自启'}>
              <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
            </ProFormField>

            <ProFormField name={'minimize'} label={'以最小化方式启动'}>
              <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
            </ProFormField>

            <ProFormField
              name={'runOnStarted'}
              label={'自动运行'}
              extra={'启动后自动使用上次选择配置运行.'}
            >
              <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
            </ProFormField>
          </Card>
          <Card title={'公共设置'} loading={loading}>
            <ProFormText name={'testUrl'} label={'测速地址'}/>

            <ProFormText name={'geoCnIpUrl'} label={'中国GeoIp下载地址'}/>

            <ProFormSelect
              name={'cnDnsArray'}
              label={'中国分流DNS'}
              fieldProps={{mode: 'tags', maxTagCount: 3}}
            />

            <ProFormSelect
              name={'proxyDnsArray'}
              label={'代理分流DNS'}
              fieldProps={{mode: 'tags', maxTagCount: 3}}
            />
          </Card>

          <Card title={'SingBox设置'} loading={loading}>
            <ProFormText name={'singVersion'} label={'使用版本'} readonly={true}/>
            <ProFormText name={'singUi'} label={'ClashUi地址'}/>
            <ProFormText name={'singMixListen'} label={'混合协议监听范围'}/>
            <ProFormText name={'singMixPort'} label={'混合协议监听端口'}/>
          </Card>

          <Card title={'GitHub设置'} loading={loading}>
            <ProFormText name={'githubFast'} label={'加速'}/>
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
