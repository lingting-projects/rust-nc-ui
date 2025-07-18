import Icon from '@/components/Icon';
import {I18n} from '@/holder/I18n';
import {createStyles} from 'antd-style';
import rawCopy from 'copy-to-clipboard';
import {useState} from 'react';

export type CopyOptions = {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  onCopy?: (clipboardData: object) => void;
  onSuccess?: () => void;
  onFailed?: () => void;
};

export const copy = (text: string, co?: CopyOptions) => {
  const {
    onSuccess = () => I18n.success('component.copy.success'),
    onFailed = () => I18n.warning('component.copy.fail'),
    ...options
  } = co || {};
  const b = rawCopy(text, options);
  if (b) {
    if (onSuccess) onSuccess();
  } else {
    if (onFailed) onFailed();
  }
};

export type CopyableProps = {
  value: string;
  // 复制成功后变化间隔, 单位: 毫秒
  timeout?: number;
};

const useStyles = createStyles(({token}) => {
  return {
    action: {
      color: token.colorPrimary,
    },
  };
});

export const Copyable = ({value, timeout = 3000}: CopyableProps) => {
  const [copied, setCopied] = useState(false);
  const {styles} = useStyles();

  if (copied) {
    return <Icon type={'CheckOutline'} className={styles.action}/>;
  }

  return (
    <Icon
      type={'CopyOutlined'}
      className={styles.action}
      onClick={() => {
        copy(value, {
          onSuccess() {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, timeout);
          },
        });
      }}
    />
  );
};
