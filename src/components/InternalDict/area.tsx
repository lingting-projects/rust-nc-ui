import {Area, AreaLabel, AreaLabelProps, countries} from '@/components/Area';
import {INFRA} from '@/types/infra';

const areaDict = {
  id: '',
  code: 'AreaDict',
  name: '区域字典',
  valueType: 'STRING',
  items: [] as INFRA.DictVO['items'],
  _internal: {
    selectFilter: (item, input) => {
      const iv = input?.trim();
      // 不填的时候全匹配
      if (!iv || iv.length < 1) {
        return true;
      }
      const upper = iv.toUpperCase();
      if (item.key.includes(iv) || item.key.includes(upper)) {
        return true;
      }
      const source: Area = item._internal?.source;
      if (!source) {
        return false;
      }

      if (source.dialCode.includes(iv)) {
        return true;
      }

      if (
        source.name.includes(iv) ||
        source.name.includes(upper) ||
        source.name.toUpperCase().includes(upper)
      ) {
        return true;
      }

      if (
        source.enName.includes(iv) ||
        source.enName.includes(upper) ||
        source.enName.toUpperCase().includes(upper)
      ) {
        return true;
      }

      return (
        source.localName.includes(iv) ||
        source.localName.includes(upper) ||
        source.localName.toUpperCase().includes(upper)
      );
    },
  } as INFRA.DictVO['_internal'],
} as const;

Object.keys(countries).forEach((code, index) => {
  // @ts-ignore
  const area: Area = countries[code];
  // @ts-ignore
  areaDict.items.push({
    id: '',
    key: area.code,
    value: area.code,
    sort: index,
    status: 'ENABLE',
    i18n: {
      'zh-CN': area.name,
      'en-US': area.enName,
    },
    attributes: {},
    _internal: {
      source: area,
      renderLabel: (_, props?: AreaLabelProps) => {
        const {flag, dial, local} = props || {};
        return <AreaLabel area={area} flag={flag} dial={dial} local={local}/>;
      },
    },
  });
});

export default [areaDict];
