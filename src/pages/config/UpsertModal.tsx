import { AreaMultipleDict } from '@/components/Area';
import { RadioDict } from '@/components/Dict';
import Icon from '@/components/Icon';
import { TimeDuration } from '@/components/Time';
import { webConfig, webRule, webSubscribe } from '@/services/web';
import DataSizeUtils from '@/util/DataSizeUtils';
import DateTimeUtils from '@/util/DateTimeUtils';
import { ProFormField, ProFormGroup, ProFormItem, ProFormSelect } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Form, Row, Space, Tag, Tooltip, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  open: boolean;
  close: (id?: string) => void;
  vo?: CONFIG.Config;
};

const renderRuleOptions = (selected: any[], disabled: any[], all: RULE.Rule[]) => {
  return all.map((r) => {
    const disable = !selected.includes(r.id) && disabled.includes(r.id);
    return {
      label: (
        <Space>
          <Typography.Text>{r.name}</Typography.Text>
          <Tag color={'blue'}>{r.count}</Tag>
          <Tag color={'geekblue'}>{DateTimeUtils.formatDiffStart(r.updateTime, '前')}</Tag>
        </Space>
      ),
      value: r.id,
      disabled: disable,
    };
  });
};

export default ({ open, close, vo }: Props) => {
  const [form] = Form.useForm<CONFIG.Config>();
  const [subscribes, setSubscribes] = useState<SUBSCRIBE.Subscribe[]>([]);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [rules, setRules] = useState<RULE.Rule[]>([]);
  const [ruleLoading, setRuleLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshSubscribe = useCallback(() => {
    setSubscribeLoading(true);
    webSubscribe
      .list()
      .then((v) => setSubscribes(v))
      .finally(() => setSubscribeLoading(false));
  }, []);

  const refreshRule = useCallback(() => {
    setRuleLoading(true);
    webRule
      .list()
      .then((v) => setRules(v))
      .finally(() => setRuleLoading(false));
  }, []);

  const init = useCallback(() => {
    setLoading(true);
    webConfig
      .initialValue()
      .then((v) => {
        delete v.id;
        delete v.name;
        delete v.subscribeId;
        delete v.ruleDirectIds;
        delete v.ruleProxyIds;
        delete v.ruleRejectIds;
        form.setFieldsValue(v);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    form.resetFields();

    if (open) {
      refreshSubscribe();
      refreshRule();

      if (vo) {
        form.setFieldsValue({ ...vo });
      } else {
        init();
      }
    }
  }, [vo, open]);

  return (
    <>
      <ModalForm<CONFIG.Config, CONFIG.Config>
        open={open}
        form={form}
        loading={loading}
        onLoadingChange={(l) => setLoading(l)}
        modalProps={{ forceRender: true, maskClosable: false }}
        onOpenChange={(flag) => !flag && close()}
        title={`${!!vo?.id ? '修改' : '创建'}配置`}
        onFinish={async (values) =>
          webConfig.upsert(values).then((id) => {
            // 更新则不刷新, 所以不传入id
            close(values.id ? undefined : id);
          })
        }
      >
        <ProFormText name={'id'} hidden={true} />

        <ProFormText name={'name'} label={'配置名称'} rules={[{ required: true }]} />

        <ProFormGroup>
          <ProFormField name={'tun'} label={'TUN模式'}>
            <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
          </ProFormField>
          <ProFormField name={'fakeIp'} label={'FakeIP'}>
            <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
          </ProFormField>
          <ProFormField name={'ipv6'} label={'IPv6'}>
            <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
          </ProFormField>
          <ProFormField
            name={'geoCn'}
            label={
              <>
                <Typography.Text style={{ marginRight: '5px' }}>GeoCn</Typography.Text>
                <Tooltip title={'使用geo的中国数据库, 自动对中国相关IP进行直连'}>
                  <Icon type={'QuestionCircleOutline'} />
                </Tooltip>
              </>
            }
          >
            <RadioDict code={'EnableDict'} props={{ optionType: 'button' }} />
          </ProFormField>
        </ProFormGroup>

        <ProFormSelect
          name={'subscribeId'}
          label={'订阅'}
          fieldProps={{ loading: subscribeLoading }}
          rules={[{ required: true, message: '请选择一个订阅' }]}
          options={subscribes.map((s) => ({
            label: (
              <Space>
                <Typography.Text>{s.name}</Typography.Text>
                <Tag color={'cyan'}>{DataSizeUtils.formatDiff(s.max, s.upload + s.download)}</Tag>
                <Tag color={'magenta'}>{DateTimeUtils.formatDiffEnd(s.expireTime)}</Tag>
                <Tag color={'geekblue'}>{DateTimeUtils.formatDiffStart(s.updateTime, '前')}</Tag>
              </Space>
            ),
            value: s.id,
          }))}
        />

        <ProFormItem noStyle={true} shouldUpdate={true}>
          {(form) => {
            // 获取三个字段的现有值
            const ruleDirectIds = form.getFieldValue('ruleDirectIds') || [];
            const ruleProxyIds = form.getFieldValue('ruleProxyIds') || [];
            const ruleRejectIds = form.getFieldValue('ruleRejectIds') || [];
            // 合并所有已选规则ID
            const selectedRuleIds = [...ruleDirectIds, ...ruleProxyIds, ...ruleRejectIds];

            return (
              <Row justify={'space-between'}>
                <ProFormSelect
                  name={'ruleDirectIds'}
                  label={'直接连接规则'}
                  mode="multiple"
                  fieldProps={{ loading: ruleLoading, maxTagCount: 1 }}
                  formItemProps={{ style: { flexGrow: 1 } }}
                  options={renderRuleOptions(ruleDirectIds, selectedRuleIds, rules)}
                />
                <ProFormSelect
                  name={'ruleProxyIds'}
                  label={'代理连接规则'}
                  mode="multiple"
                  fieldProps={{ loading: ruleLoading, maxTagCount: 1 }}
                  formItemProps={{ style: { flexGrow: 1, marginLeft: '5px' } }}
                  options={renderRuleOptions(ruleProxyIds, selectedRuleIds, rules)}
                  rules={[{ required: true, message: '请选择至少一个规则' }]}
                />
                <ProFormSelect
                  name={'ruleRejectIds'}
                  label={'拒绝连接规则'}
                  mode="multiple"
                  fieldProps={{ loading: ruleLoading, maxTagCount: 1 }}
                  formItemProps={{ style: { flexGrow: 1, marginLeft: '5px' } }}
                  options={renderRuleOptions(ruleRejectIds, selectedRuleIds, rules)}
                />
              </Row>
            );
          }}
        </ProFormItem>

        <Row justify={'space-between'} style={{ flexWrap: 'nowrap' }}>
          <ProFormField name={'includeAreaNon'} label={'无区域节点'}>
            <RadioDict code={'WhetherIncludeDict'} props={{ optionType: 'button' }} />
          </ProFormField>
          <ProFormField
            name={'includeArea'}
            label={'包含区域'}
            formItemProps={{ style: { flexGrow: 1, marginLeft: '5px' } }}
          >
            <AreaMultipleDict type={'select'} props={{ allowClear: true, maxTagCount: 3 }} />
          </ProFormField>
          <ProFormSelect
            name={'includeNameContains'}
            label={'包含名称关键字'}
            mode={'tags'}
            formItemProps={{ style: { flexGrow: 1, marginLeft: '5px' } }}
          />
        </Row>

        <Row justify={'space-between'} style={{ flexWrap: 'nowrap' }}>
          <ProFormField
            name={'excludeArea'}
            label={'排除区域'}
            formItemProps={{ style: { flexGrow: 1, marginLeft: '5px' } }}
          >
            <AreaMultipleDict type={'select'} props={{ allowClear: true, maxTagCount: 3 }} />
          </ProFormField>
          <ProFormSelect
            name={'excludeNameContains'}
            label={'排除名称关键字'}
            mode={'tags'}
            formItemProps={{ style: { flexGrow: 1, marginLeft: '5px' } }}
          />
        </Row>

        <ProFormField name={'interval'} label={'更新间隔'} rules={[{ required: true }]}>
          <TimeDuration defaultSourceType={'hours'} />
        </ProFormField>
      </ModalForm>
    </>
  );
};
