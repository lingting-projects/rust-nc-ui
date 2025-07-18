import BadgeDict from './badge';
import CheckBoxDict from './checkbox';
import type {DictKeys, DictProps} from './dict';
import {InternalDict, MultipleDict, SingleDict} from './dict';
import RadioDict from './radio';
import SelectDict from './select';
import TagDict from './tag';
import TextDict from './text';

export * from './badge';
export * from './checkbox';
export * from './radio';
export * from './select';
export * from './tag';
export * from './text';

export {
  BadgeDict,
  CheckBoxDict,
  DictKeys,
  DictProps,
  MultipleDict,
  RadioDict,
  SelectDict,
  SingleDict,
  TagDict,
  TextDict,
};

type DictComponent = typeof InternalDict & {
  Single: typeof SingleDict;
  Multiple: typeof MultipleDict;

  Badge: typeof BadgeDict;
  Text: typeof TextDict;
  Tag: typeof TagDict;

  CheckBox: typeof CheckBoxDict;
  Radio: typeof RadioDict;
  Select: typeof SelectDict;
};

const Dict = InternalDict as DictComponent;
Dict.Single = SingleDict;
Dict.Multiple = MultipleDict;

Dict.Badge = BadgeDict;
Dict.Text = TextDict;
Dict.Tag = TagDict;

Dict.CheckBox = CheckBoxDict;
Dict.Radio = RadioDict;
Dict.Select = SelectDict;

export default Dict;
