import moment from 'moment';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

export default {
  format(s?: any, format = defaultFormat) {
    if (!s) {
      return '';
    }
    if (typeof s === 'string') {
      return s;
    }
    return s.format(format) as string;
  },
  formatDiffEnd(s?: string, suffix: string = '') {
    if (!s || s.trim().length < 1) {
      return '-';
    }
    return this.formatDiff(undefined, s, suffix);
  },
  formatDiffStart(s?: string, suffix: string = '') {
    if (!s || s.trim().length < 1) {
      return '-';
    }
    return this.formatDiff(s, undefined, suffix);
  },
  formatDiff(startString?: string, endString?: string, suffix: string = '') {
    const start = startString ? moment(startString) : moment();
    const end = endString ? moment(endString) : moment();
    // 差值: 毫秒
    const ms = end.diff(start, 'ms');
    if (ms < 0) {
      return '已过期';
    }
    if (ms < 1000) {
      return '刚刚';
    }

    const s = ms / 1000;
    if (s < 60) {
      return `${s.toFixed(0)} 秒${suffix}`;
    }
    const m = s / 60;
    if (m < 60) {
      return `${m.toFixed(0)} 分钟${suffix}`;
    }
    const h = m / 60;
    if (h < 24) {
      return `${h.toFixed(0)} 小时${suffix}`;
    }
    const d = h / 24;
    if (d < 7) {
      return `${d.toFixed(0)} 天${suffix}`;
    }
    const w = d / 7;
    if (w < 4) {
      return `${w.toFixed(0)} 周${suffix}`;
    }
    const M = d / 4;
    if (M < 12) {
      return `${M.toFixed(0)} 月${suffix}`;
    }
    const y = d / 12;
    return `${y.toFixed(0)} 月${suffix}`;
  },
  formatTimestampBySeconds(timestamp: string | number, pattern: string = 'YYYY-MM-DD hh:mm:ss') {
    return moment.unix(Number(timestamp)).format(pattern);
  },
};
