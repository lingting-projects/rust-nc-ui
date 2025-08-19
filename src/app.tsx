import Icon from '@/components/Icon';
import { resetConfig } from '@/components/MonacoEditor';

export * from './request';

export const rootContainer = (container: any) => {
  resetConfig();
  return container;
};

export const patchRoutes: (props: { routes: any }) => void = ({ routes }) => {
  Object.keys(routes).forEach((key) => {
    const { icon } = routes[key];
    if (icon && typeof icon === 'string') {
      routes[key].icon = <Icon type={icon} />;
    }
  });
};
