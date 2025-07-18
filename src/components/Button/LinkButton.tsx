import {LinkProps} from 'antd/es/typography/Link';
import InternalButton, {ButtonProps} from './Button';

type Props = Omit<LinkProps, 'disabled' | 'onClick'>;

export type LinkButtonProps = Omit<ButtonProps<Props>, 'type' | 'props'> & Props;

export default ({
                  text,
                  danger,
                  disabled,
                  loading,
                  onClick,
                  confirm,
                  tooltip,
                  ...props
                }: LinkButtonProps) => (
  <InternalButton
    type={'link'}
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
