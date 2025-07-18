import Button from '@/components/Button';
import Icon from '@/components/Icon';
import {StatisticPair} from '@/components/Statistic';
import UpsertModal from '@/pages/subscribe/UpsertModal';
import {webSubscribe} from '@/services/web';
import DataSizeUtils from '@/util/DataSizeUtils';
import DateTimeUtils from '@/util/DateTimeUtils';
import {Card, List, Popconfirm, Row, Space, Tooltip} from 'antd';
import {useCallback, useEffect, useState} from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [vo, setVo] = useState<SUBSCRIBE.Subscribe>();
  const [loading, setLoading] = useState(false);
  const [datasource, setDatasource] = useState<SUBSCRIBE.Subscribe[]>([]);

  const reload = useCallback(() => {
    setLoading(true);
    webSubscribe
      .list()
      .then((v) => setDatasource(v))
      .finally(() => setLoading(false));
  }, []);

  const refresh = useCallback((id?: string) => {
    setLoading(true);
    webSubscribe.refresh(id).finally(() => reload());
  }, []);

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <Card
        title={'订阅列表'}
        bordered={false}
        extra={
          <Space>
            <Button text={'查询'} type={'default'} onClick={reload}/>
            <Button text={'新增'} type={'primary'} onClick={() => setOpen(true)}/>
            <Button text={'全部刷新'} type={'link'} onClick={() => refresh()}/>
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
        grid={{gutter: 16}}
        dataSource={datasource}
        loading={loading}
        style={{marginTop: '20px'}}
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
                  <Icon type={'ReloadOutlined'} onClick={() => refresh(item.id)}/>
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
                    title={'确定删除此订阅吗?'}
                    okText={'确定'}
                    cancelText={'取消'}
                    onConfirm={() => {
                      webSubscribe.remove(item.id).then(() => reload());
                    }}
                  >
                    <Icon type={'DeleteOutline'} color={'danger'}/>
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <Card.Meta title={item.name}/>

              <Row
                gutter={4}
                align={'middle'}
                justify={'space-between'}
                style={{marginTop: '20px', flexWrap: 'nowrap'}}
              >
                <StatisticPair
                  label={'剩余流量'}
                  value={DataSizeUtils.formatDiff(item.max, item.used)}
                />
                <StatisticPair
                  label={'有效期'}
                  value={DateTimeUtils.formatDiffEnd(item.expireTime)}
                />
                <StatisticPair
                  label={'上次更新'}
                  value={DateTimeUtils.formatDiffStart(item.updateTime, '前')}
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
