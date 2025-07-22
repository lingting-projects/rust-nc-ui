import { I18n } from '@/holder/I18n';
import moment from 'moment';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

export type DataTimeValue = string | number;

export const daysOfMonth = 31;
const _fixed = 2;

const isInvalid = (v?: DataTimeValue): boolean => {
  if (v === undefined || v === null) {
    return true;
  }
  if (typeof v === 'string' && v.trim().length < 1) {
    return true;
  }
  if (typeof v === 'number' && v <= 0) {
    return true;
  }
  return false;
};

export const toNumber = (v: DataTimeValue, fixed: number = _fixed): number => {
  if (v === undefined || v === null) {
    return 0;
  }
  let m = Number(v);
  let f = m.toFixed(fixed);
  return Number(f);
};

const divide = (divided: number, divisor: number, fixed: number = _fixed): number => {
  const m = divided / divisor;
  const f = m.toFixed(fixed);
  return toNumber(f);
};

const durationConverts = {
  year: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return this.year(v, fixed) * 12;
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return this.month(v, fixed) * daysOfMonth;
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return this.day(v, fixed) * 24;
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return this.hours(v, fixed) * 60;
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return this.minute(v, fixed) * 60;
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return this.seconds(v, fixed) * 1000;
    },
  },
  month: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.month(v), 12, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return this.month(v, fixed) * daysOfMonth;
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return this.day(v, fixed) * 24;
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return this.hours(v, fixed) * 60;
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return this.minute(v, fixed) * 60;
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return this.seconds(v, fixed) * 1000;
    },
  },
  day: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.month(v), 12, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.day(v), daysOfMonth, fixed);
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return this.day(v, fixed) * 24;
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return this.hours(v, fixed) * 60;
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return this.minute(v, fixed) * 60;
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return this.seconds(v, fixed) * 1000;
    },
  },
  hours: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.month(v), 12, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.day(v), 12, fixed);
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.hours(v), 24, fixed);
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return this.hours(v, fixed) * 60;
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return this.minute(v, fixed) * 60;
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return this.seconds(v, fixed) * 1000;
    },
  },
  minute: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.month(v), 12, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.day(v), 12, fixed);
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.hours(v), 24, fixed);
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.minute(v), 60, fixed);
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return this.minute(v, fixed) * 60;
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return this.seconds(v, fixed) * 1000;
    },
  },
  seconds: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.month(v), 12, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.day(v), 12, fixed);
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.hours(v), 24, fixed);
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.minute(v), 60, fixed);
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.seconds(v), 60, fixed);
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return this.seconds(v, fixed) * 1000;
    },
  },
  millis: {
    year(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.month(v), 12, fixed);
    },
    month(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.day(v), 12, fixed);
    },
    day(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.hours(v), 24, fixed);
    },
    hours(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.minute(v), 60, fixed);
    },
    minute(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.seconds(v), 60, fixed);
    },
    seconds(v: DataTimeValue, fixed: number = _fixed) {
      return divide(this.millis(v), 1000, fixed);
    },
    millis(v: DataTimeValue, fixed: number = _fixed) {
      return toNumber(v, fixed);
    },
  },
};

export type DateTimeUnit = 'year' | 'month' | 'day' | 'hours' | 'minute' | 'seconds' | 'millis';

type SourceType = keyof typeof durationConverts;

export default {
  durationUnit(v: number, type: SourceType): DateTimeUnit | undefined {
    let millis = durationConverts[type].millis(v);
    if (millis < 0) {
      return undefined;
    }
    if (millis < 1000) {
      return 'millis';
    }

    const s = this.durationConverts.millis.seconds(millis);
    if (s < 60) {
      return 'seconds';
    }
    const m = this.durationConverts.seconds.minute(s);
    if (m < 60) {
      return 'minute';
    }
    const h = this.durationConverts.minute.hours(m);
    if (h < 24) {
      return 'hours';
    }
    const d = this.durationConverts.hours.day(h);
    if (d < 7) {
      return 'day';
    }
    const M = this.durationConverts.day.month(d);
    if (M < 12) {
      return 'month';
    }
    return 'year';
  },
  durationConverts,
  format(v?: any, format = defaultFormat) {
    if (isInvalid(v)) {
      return '';
    }
    if (typeof v === 'string') {
      return v;
    }
    return v.format(format) as string;
  },
  formatDiffEnd(v?: DataTimeValue, suffix: string = '') {
    if (isInvalid(v)) {
      return '-';
    }
    return this.formatDiff(undefined, v, suffix);
  },
  formatDiffStart(v?: DataTimeValue, suffix: string = '') {
    if (isInvalid(v)) {
      return '-';
    }
    return this.formatDiff(v, undefined, suffix);
  },
  formatDiff(startValue?: DataTimeValue, endValue?: DataTimeValue, suffix: string = '') {
    const start = startValue ? moment(startValue) : moment();
    const end = endValue ? moment(endValue) : moment();
    // 差值: 毫秒
    const ms = end.diff(start, 'ms');

    let unit = this.durationUnit(ms, 'millis');
    if (!unit) {
      return '已过期';
    }

    if (unit === 'millis') {
      return '刚刚';
    }

    let millis = this.durationConverts.millis;
    let v = millis[unit](ms, 0);
    let text = I18n.text(`util.datetime.unit.${unit}`);
    return `${v} ${text}${suffix}`;
  },
  formatTimestampBySeconds(timestamp: DataTimeValue, pattern: string = 'YYYY-MM-DD hh:mm:ss') {
    return moment.unix(Number(timestamp)).format(pattern);
  },
};
