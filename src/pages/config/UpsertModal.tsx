import {AreaMultipleDict} from '@/components/Area';
import {RadioDict} from '@/components/Dict';
import Icon from '@/components/Icon';
import {webConfig, webRule, webSubscribe} from '@/services/web';
import DataSizeUtils from '@/util/DataSizeUtils';
import DateTimeUtils from '@/util/DateTimeUtils';
import {ProFormField, ProFormGroup, ProFormItem, ProFormSelect} from '@ant-design/pro-components';
import {ModalForm, ProFormText} from '@ant-design/pro-form';
import {Form, Row, Space, Tag, Tooltip, Typography} from 'antd';
import {useCallback, useEffect, useState} from 'react';

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

export default ({open, close, vo}: Props) => {
  const [form] = Form.useForm<CONFIG.Config>();
  const [subscribes, setSubscribes] = useState<SUBSCRIBE.Subscribe[]>([]);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [rules, setRules] = useState<RULE.Rule[]>([]);
  const [ruleLoading, setRuleLoading] = useState(false);

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

  useEffect(() => {
    refreshSubscribe();
    refreshRule();
    form.resetFields();
    if (vo) {
      form.setFieldsValue({...vo});
    }
  }, [vo]);

  return (
    <>
      <ModalForm<CONFIG.Config, CONFIG.Config>
        open={open}
        form={form}
        modalProps={{forceRender: true, maskClosable: false}}
        onOpenChange={(flag) => !flag && close()}
        title={`${!!vo?.id ? '修改' : '创建'}配置`}
        onFinish={async (values) =>
          webConfig.upsert(values).then((id) => {
            // 更新则不刷新, 所以不传入id
            close(values.id ? undefined : id);
          })
        }
      >
        <ProFormText name={'id'} hidden={true}/>

        <ProFormText name={'name'} label={'配置名称'} rules={[{required: true}]}/>

        <ProFormGroup>
          <ProFormField name={'tun'} label={'TUN模式'} initialValue={true}>
            <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
          </ProFormField>
          <ProFormField name={'fakeIp'} label={'FakeIP'} initialValue={true}>
            <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
          </ProFormField>
          <ProFormField name={'ipv6'} label={'IPv6'} initialValue={false}>
            <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
          </ProFormField>
          <ProFormField
            name={'directGeoCnIp'}
            label={
              <>
                <Typography.Text style={{marginRight: '5px'}}>GeoCnIp</Typography.Text>
                <Tooltip title={'使用geo的中国ip数据库, 自动对中国ip进行直连'}>
                  <Icon type={'QuestionCircleOutline'}/>
                </Tooltip>
              </>
            }
            initialValue={true}
          >
            <RadioDict code={'EnableDict'} props={{optionType: 'button'}}/>
          </ProFormField>
        </ProFormGroup>

        <ProFormSelect
          name={'subscribeId'}
          label={'订阅'}
          fieldProps={{loading: subscribeLoading}}
          rules={[{required: true, message: '请选择一个订阅'}]}
          options={subscribes.map((s) => ({
            label: (
              <Space>
                <Typography.Text>{s.name}</Typography.Text>
                <Tag color={'cyan'}>{DataSizeUtils.formatDiff(s.max, s.used)}</Tag>
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
            const directRuleIds = form.getFieldValue('directRuleIds') || [];
            const proxyRuleIds = form.getFieldValue('proxyRuleIds') || [];
            const rejectRuleIds = form.getFieldValue('rejectRuleIds') || [];
            // 合并所有已选规则ID
            const selectedRuleIds = [...directRuleIds, ...proxyRuleIds, ...rejectRuleIds];

            return (
              <Row justify={'space-between'}>
                <ProFormSelect
                  name={'directRuleIds'}
                  label={'直接连接规则'}
                  mode="multiple"
                  fieldProps={{loading: ruleLoading, maxTagCount: 1}}
                  formItemProps={{style: {flexGrow: 1}}}
                  options={renderRuleOptions(directRuleIds, selectedRuleIds, rules)}
                />
                <ProFormSelect
                  name={'proxyRuleIds'}
                  label={'代理连接规则'}
                  mode="multiple"
                  fieldProps={{loading: ruleLoading, maxTagCount: 1}}
                  formItemProps={{style: {flexGrow: 1, marginLeft: '5px'}}}
                  options={renderRuleOptions(proxyRuleIds, selectedRuleIds, rules)}
                  rules={[{required: true, message: '请选择至少一个规则'}]}
                />
                <ProFormSelect
                  name={'rejectRuleIds'}
                  label={'拒绝连接规则'}
                  mode="multiple"
                  fieldProps={{loading: ruleLoading, maxTagCount: 1}}
                  formItemProps={{style: {flexGrow: 1, marginLeft: '5px'}}}
                  options={renderRuleOptions(rejectRuleIds, selectedRuleIds, rules)}
                />
              </Row>
            );
          }}
        </ProFormItem>

        <Row justify={'space-between'} style={{flexWrap: 'nowrap'}}>
          <ProFormField name={'includeNoArea'} label={'无区域节点'} initialValue={true}>
            <RadioDict code={'WhetherIncludeDict'} props={{optionType: 'button'}}/>
          </ProFormField>
          <ProFormField
            name={'includeArea'}
            label={'区域配置'}
            formItemProps={{style: {marginLeft: '5px'}}}
            initialValue={true}
          >
            <RadioDict code={'WhetherIncludeDict'} props={{optionType: 'button'}}/>
          </ProFormField>
          <ProFormField
            name={'areas'}
            label={'区域'}
            formItemProps={{style: {flexGrow: 1, marginLeft: '5px'}}}
            extra={'根据区域配置, 排除或包含选中区域的节点.'}
            initialValue={['SG', 'US', 'JP']}
          >
            <AreaMultipleDict type={'select'} props={{allowClear: true, maxTagCount: 3}}/>
          </ProFormField>
        </Row>

        <Row justify={'space-between'} style={{flexWrap: 'nowrap'}}>
          <ProFormField name={'includeNameKeyword'} label={'名称关键字配置'} initialValue={false}>
            <RadioDict code={'WhetherIncludeDict'} props={{optionType: 'button'}}/>
          </ProFormField>

          <ProFormSelect
            name={'nameKeywords'}
            label={'名称关键字'}
            mode={'tags'}
            formItemProps={{style: {flexGrow: 1, marginLeft: '5px'}}}
            extra={'根据名称关键字配置, 排除或包含名称中存在关键字的节点'}
            initialValue={['IPLC', '境外', '回国']}
          />
        </Row>

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
