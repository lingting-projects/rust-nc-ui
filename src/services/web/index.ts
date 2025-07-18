import {Request} from '@/services';

import * as webConfig from './config';
import * as webInfra from './infra';
import * as webKernel from './kernel';
import * as webRule from './rule';
import * as webSettings from './setting';
import * as webSubscribe from './subscribe';
import * as webUser from './user';

export {webConfig, webInfra, webKernel, webRule, webSettings, webSubscribe, webUser};

export default new Request('web');
