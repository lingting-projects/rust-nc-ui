import InternalIcon, {Error as ErrorIcon, Loading as LoadingIcon} from './Icon';
import icons from './icons';

export * from './icons';

export {ErrorIcon, LoadingIcon, icons};

type IconComponent = typeof InternalIcon & {
  Error: typeof ErrorIcon;
  Loading: typeof LoadingIcon;
};
const Icon = InternalIcon as IconComponent;
Icon.Error = ErrorIcon;
Icon.Loading = LoadingIcon;
export default Icon;
