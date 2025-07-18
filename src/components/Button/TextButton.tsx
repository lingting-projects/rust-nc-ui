import {TextProps} from 'antd/es/typography/Text';
import InternalButton, {ButtonProps} from './Button';

type Props = Omit<TextProps, 'disabled' | 'onClick'>;

export type TextButtonProps = Omit<ButtonProps<Props>, 'type' | 'props'> & Props;

export default ({
                  text,
                  danger,
                  disabled,
                  loading,
                  onClick,
                  confirm,
                  tooltip,
                  ...props
                }: TextButtonProps) => (
  <InternalButton
    type={'text'}
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
