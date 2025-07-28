import Button from '@/components/Button';
import { TextDict } from '@/components/Dict';
import Icon from '@/components/Icon';
import { StatisticPair } from '@/components/Statistic';
import { webConfig } from '@/services/web';
import DateTimeUtils from '@/util/DateTimeUtils';
import { Card, List, Popconfirm, Row, Space, Tag, Tooltip, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import UpsertModal from './UpsertModal';

export default () => {
  const [open, setOpen] = useState(false);
  const [vo, setVo] = useState<CONFIG.Config>();
  const [loading, setLoading] = useState(false);
  const [datasource, setDatasource] = useState<CONFIG.Config[]>([]);

  const reload = useCallback(() => {
    setLoading(true);
    webConfig
      .list()
      .then((v) => setDatasource(v))
      .finally(() => setLoading(false));
  }, []);

  const refresh = useCallback((id?: string) => {
    setLoading(true);
    webConfig.refresh(id).finally(() => reload());
  }, []);

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <Card
        title={'配置列表'}
        bordered={false}
        extra={
          <Space>
            <Button text={'查询'} type={'default'} onClick={reload} />
            <Button text={'新增'} type={'primary'} onClick={() => setOpen(true)} />
            <Button text={'全部刷新'} type={'link'} onClick={() => refresh()} />
          </Space>
        }
        styles={{
          body: {
            height: 0,
            padding: 0,
          },
        }}
      />

      <List
        rowKey="id"
        grid={{ gutter: 16 }}
        dataSource={datasource}
        loading={loading}
        style={{ marginTop: '20px' }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable={true}
              styles={{
                body: {
                  paddingBottom: 20,
                  width: '320px',
                },
              }}
              actions={[
                <Tooltip key="reload" title="刷新">
                  <Icon type={'ReloadOutlined'} onClick={() => refresh(item.id)} />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <Icon
                    type={'EditOutlined'}
                    onClick={() => {
                      setVo(item);
                      setOpen(true);
                    }}
                  />
                </Tooltip>,
                <Tooltip title="删除" key="delete">
                  <Popconfirm
                    title={'确定删除此配置吗?'}
                    okText={'确定'}
                    cancelText={'取消'}
                    onConfirm={() => {
                      webConfig.remove(item.id).then(() => reload());
                    }}
                  >
                    <Icon type={'DeleteOutline'} color={'danger'} />
                  </Popconfirm>
                </Tooltip>,
              ]}
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
                  label={'配置数量'}
                  value={
                    item.ruleDirectIds.length + item.ruleProxyIds.length + item.ruleRejectIds.length
                  }
                />
                <StatisticPair
                  label={'上次更新'}
                  value={DateTimeUtils.formatDiffStart(item.refreshTime, '前')}
                />
              </Row>
            </Card>
          </List.Item>
        )}
      />

      <UpsertModal
        vo={vo}
        open={open}
        close={(id) => {
          if (id) {
            refresh(id);
          } else {
            reload();
          }
          setOpen(false);
          setVo(undefined);
        }}
      />
    </>
  );
};
