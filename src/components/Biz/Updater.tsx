import {webSettings} from '@/services/web';
import {useModel} from '@umijs/max';
import {Alert, Modal} from 'antd';
import {useEffect, useState} from 'react';

export default () => {
  const {open, setOpen, updater, loading, setLoading, stateRef, refresh, refreshState} =
    useModel('updater');

  const [type, setType] = useState<'info' | 'warning' | 'success' | 'error'>('info');
  const [message, setMessage] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (updater?.error) {
      console.log('updater?.error', updater?.error);
      setType('error');
      setMessage(updater.reason || '更新异常!');
      setLoading(false);
      stateRef.current = false;
    } else if (updater?.installed) {
      console.log('updater?.installed', updater?.installed);
      stateRef.current = false;
      setLoading(false);
      setType('info');
      setMessage('安装程序已启动!');
    } else if (updater?.installing) {
      console.log('updater?.installing', updater?.installing);
      setType('info');
      setMessage('正在安装...');
      setLoading(true);
    } else if (updater?.unzipping) {
      console.log('updater?.unzipping', updater?.unzipping);
      setType('info');
      setMessage('正在解压...');
      setLoading(true);
    } else if (updater?.downloading) {
      console.log('updater?.downloading', updater?.downloading);
      setType('info');
      setMessage('正在下载...');
      setLoading(true);
    } else {
      setType('info');
      setMessage('存在新版本, 是否进行更新!');
    }
  }, [updater]);

  return (
    <Modal
      open={open && (updater?.hasNew || updater?.error)}
      maskClosable={false}
      title={'检测到新版本'}
      okButtonProps={{loading, disabled: updater?.installed}}
      okText={'更新'}
      onOk={() => {
        setLoading(true);
        webSettings.updaterInstall().then((v) => {
          refreshState().finally(() => {
          });
          stateRef.current = v;
        });
      }}
      closeIcon={false}
      keyboard={!loading}
      cancelButtonProps={{loading}}
      cancelText={'关闭窗口'}
      onCancel={() => setOpen(false)}
    >
      <Alert showIcon={true} type={type} message={message}/>
    </Modal>
  );
};
