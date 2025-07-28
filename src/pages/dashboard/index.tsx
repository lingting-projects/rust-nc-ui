import Button from '@/components/Button';
import { TextDict } from '@/components/Dict';
import Icon from '@/components/Icon';
import { StatisticPair } from '@/components/Statistic';
import { webConfig, webKernel, webSubscribe } from '@/services/web';
import DataSizeUtils from '@/util/DataSizeUtils';
import DateTimeUtils from '@/util/DateTimeUtils';
import { FooterToolbar } from '@ant-design/pro-components';
import { Alert, Card, Flex, List, Row, Space, Tag, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useCallback, useEffect, useRef, useState } from 'react';

const useStyles = createStyles(({ token }) => {
  return {
    selected: {
      boxShadow: `0 4px 8px ${token.colorPrimaryActive}`,
    },
  };
});

export default () => {
  const {styles} = useStyles();

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [state, setState] = useState<KERNEL.KernelState>();

  const reloadState = useCallback(
    () =>
      webKernel.state().then((v) => {
        setState(v);
        if (v.configId) {
          setSelected(v.configId);
        }
      }),
    [],
  );

  const [configLoading, setConfigLoading] = useState(false);
  const [configs, setConfigs] = useState<CONFIG.Config[]>([]);

  const reloadConfig = useCallback(() => {
    setConfigLoading(true);
    webConfig
      .list()
      .then((v) => setConfigs(v))
      .finally(() => setConfigLoading(false));
  }, []);

  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribes, setSubscribes] = useState<SUBSCRIBE.Subscribe[]>([]);

  const reloadSubscribe = useCallback(() => {
    setSubscribeLoading(true);
    webSubscribe
      .list()
      .then((v) => setSubscribes(v))
      .finally(() => setSubscribeLoading(false));
  }, []);

  useEffect(() => {
    reloadConfig();
    reloadSubscribe();
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // 定时拉取 state
    const fetch = () => {
      reloadState().finally(() => {
        if (isMountedRef.current) {
          timerRef.current = setTimeout(fetch, 1000);
        }
      });
    };

    // 初始请求
    fetch();

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <List
        rowKey="id"
        grid={{ gutter: 16 }}
        dataSource={configs}
        loading={loading || configLoading || subscribeLoading}
        style={{ marginTop: '20px' }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              className={item.id === selected ? styles.selected : undefined}
              hoverable={true}
              styles={{
                body: {
                  paddingBottom: 20,
                  width: '320px',
                },
              }}
              onClick={() => {
                if (state?.running || state?.starting) {
                  return;
                }
                setSelected(item.id);
              }}
            >
              <Card.Meta
                title={
                  <Space>
                    <Typography.Text>{item.name}</Typography.Text>
                    {item.tun && <Tag color={'magenta'}>TUN</Tag>}
                    {item.ipv6 ? <Tag color={'red'}>IPv6</Tag> : <Tag color={'cyan'}>IPv4</Tag>}
                    {item.fakeIp && <Tag color={'geekblue'}>FakeIP</Tag>}
                  </Space>
                }
              />

              <Row
                gutter={4}
                align={'middle'}
                justify={'space-between'}
                style={{ marginTop: '20px', flexWrap: 'nowrap' }}
              >
                <StatisticPair
                  label={'无区域节点'}
                  value={<TextDict code={'WhetherIncludeDict'} value={item.includeAreaNon} />}
                />
                <StatisticPair
                  label={'规则数量'}
                  value={
                    item.ruleDirectIds.length + item.ruleProxyIds.length + item.ruleRejectIds.length
                  }
                />
                <StatisticPair
                  label={'上次更新'}
                  value={DateTimeUtils.formatDiffStart(item.updateTime, '前')}
                />
              </Row>

              {subscribes
                .filter((s) => s.id === item.subscribeId)
                .map((s, i) => (
                  <Row
                    key={`${s.id}:${i}`}
                    gutter={4}
                    align={'middle'}
                    justify={'space-between'}
                    style={{ marginTop: '20px', flexWrap: 'nowrap' }}
                  >
                    <StatisticPair
                      label={'剩余流量'}
                      value={DataSizeUtils.formatDiff(s.max, s.upload + s.download)}
                    />
                    <StatisticPair
                      label={'有效期'}
                      value={DateTimeUtils.formatDiffEnd(s.expireTime)}
                    />
                    <StatisticPair
                      label={'上次更新'}
                      value={DateTimeUtils.formatDiffStart(s.refreshTime, '前')}
                    />
                  </Row>
                ))}
            </Card>
          </List.Item>
        )}
      />

      {selected && configs.findLast((c) => c.id === selected) && (
        <FooterToolbar
          renderContent={() => {
            let dom;
            if (!state) {
              dom = (
                <Alert
                  showIcon={true}
                  icon={<Icon type={'Loading3QuartersOutlined'} />}
                  message={'正在加载中...'}
                  type={'info'}
                />
              );
            } else if (state.error) {
              dom = (
                <Space>
                  <Alert
                    showIcon={true}
                    message={`${state.reason || '出现未知异常.'} ${
                      state.reboot ? '可以尝试重启程序!' : '可以尝试重新启动!'
                    }`}
                    type={'error'}
                  />

                  <Button
                    text={'重新启动'}
                    type={'primary'}
                    loading={loading}
                    onClick={() => {
                      setLoading(true);
                      webKernel.run(selected).finally(() => {
                        reloadState().finally(() => setLoading(false));
                      });
                    }}
                  />
                </Space>
              );
            } else if (state.installing) {
              dom = (
                <Alert
                  showIcon={true}
                  icon={<Icon type={'LoadingOutlined'} />}
                  message={'正在安装内核...'}
                  type={'info'}
                />
              );
            } else if (state.starting) {
              dom = (
                <Alert
                  showIcon={true}
                  icon={<Icon type={'LoadingOutlined'} />}
                  message={'内核启动中...'}
                  type={'info'}
                />
              );
            } else if (state.stoping) {
              dom = <Alert message={'正在停止运行...'} type={'warning'} />;
            } else if (state.running) {
              dom = (
                <Space>
                  <Alert message={'正在运行当前配置...'} type={'info'} />

                  {state.ui && (
                    <Typography.Link
                      href={state.ui.startsWith('http') ? state.ui : `http://${state.ui}`}
                      target={'_blank'}
                    >
                      管理界面
                      <Icon type={'ExportOutlined'} />
                    </Typography.Link>
                  )}

                  <Button
                    text={'停止'}
                    type={'link'}
                    danger={true}
                    confirm={'确定要停止运行内核吗?'}
                    loading={loading}
                    onClick={() => {
                      setLoading(true);
                      webKernel.stop(selected).finally(() => {
                        reloadState().finally(() => setLoading(false));
                      });
                    }}
                  />
                </Space>
              );
            } else {
              dom = (
                <Button
                  text={'启动'}
                  type={'primary'}
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    webKernel.run(selected).finally(() => {
                      reloadState().finally(() => setLoading(false));
                    });
                  }}
                />
              );
              if (!state.installed) {
                dom = (
                  <Space>
                    <Alert showIcon={true} message={'未安装内核...'} type={'warning'} />
                    {dom}
                  </Space>
                );
              }
            }

            return (
              <Flex
                justify={'center'}
                align={'center'}
                style={{ width: '100%', padding: '16px 24px' }}
              >
                {dom}
              </Flex>
            );
          }}
        />
      )}
    </>
  );
};
