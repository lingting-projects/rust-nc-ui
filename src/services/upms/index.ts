import {Request} from '@/services';

import * as upmsLogin from './login';
import * as upmsUser from './user';

export {upmsLogin, upmsUser};

export default new Request('upms');
