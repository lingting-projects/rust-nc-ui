import ObjectUtils from '@/util/ObjectUtils';

const trueArray = ['1', 'true', 'y', 'yes', 'ok', 't'];
const falseArray = ['0', 'false', 'n', 'no', 'f'];

export default {
  isTrue: (source?: any) => {
    if (ObjectUtils.isNull(source)) {
      return false;
    }

    const lowerValue = source.toLowerCase();

    if (trueArray.includes(lowerValue)) {
      return true;
    }

    if (falseArray.includes(lowerValue)) {
      return false;
    }

    const number = Number(lowerValue);
    if (!Number.isNaN(number)) {
      // 大于0 为 true
      return number > 0;
    }
    return Boolean(source);
  },
  isFalse: (source?: any) => {
    if (ObjectUtils.isNull(source)) {
      return false;
    }

    const lowerValue = source.toLowerCase();

    if (trueArray.includes(lowerValue)) {
      return false;
    }

    if (falseArray.includes(lowerValue)) {
      return true;
    }

    const number = Number(lowerValue);
    if (!Number.isNaN(number)) {
      // 大于0 为 true
      return number < 1;
    }
    return !Boolean(source);
  },
};
