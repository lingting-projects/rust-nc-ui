import Icon from '@/components/Icon';

export * from './request';

export const patchRoutes: (props: { routes: any }) => void = ({routes}) => {
  Object.keys(routes).forEach((key) => {
    const {icon} = routes[key];
    if (icon && typeof icon === 'string') {
      routes[key].icon = <Icon type={icon}/>;
    }
  });
};
