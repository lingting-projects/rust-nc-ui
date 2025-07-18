import {useModel} from '@@/exports';
import BasicLayout from '.';

export default () => {
  const {user} = useModel('context');

  return (
    <BasicLayout
      overrideProps={{
        menuRender: false,
        headerRender: false,
        waterMarkProps: {
          content: `${user?.username}\n${user?.nickname}`,
        },
        route: [],
      }}
    />
  );
};
