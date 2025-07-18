import {ButtonProps as RawAntdButtonProps} from 'antd';
import InternalButton, {ButtonProps} from './Button';

type Props = Omit<RawAntdButtonProps, 'disabled' | 'onClick' | 'danger'>;

export type AntdButtonProps = Omit<ButtonProps<Props>, 'type' | 'props'> & Props;

export default ({
                  text,
                  danger,
                  disabled,
                  loading,
                  onClick,
                  confirm,
                  tooltip,
                  ...props
                }: AntdButtonProps) => (
  <InternalButton
    type={'button'}
    text={text}
    danger={danger}
    disabled={disabled}
    loading={loading}
    onClick={onClick}
    confirm={confirm}
    tooltip={tooltip}
    props={props}
  />
);
