import AntdButton from './AntdButton';
import LinkButton from './LinkButton';
import TextButton from './TextButton';

type ButtonComponent = typeof AntdButton & {
  Text: typeof TextButton;
  Link: typeof LinkButton;
};

const Button = AntdButton as ButtonComponent;
Button.Text = TextButton;
Button.Link = LinkButton;

export default Button;
