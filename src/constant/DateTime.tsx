import dayjs, {Dayjs} from 'dayjs';
import {DisabledTimes, DisabledDate as RcDisabledDate} from 'rc-picker/lib/interface';

type DisabledDate = RcDisabledDate<Dayjs>;
type DisabledTime = (current: Dayjs) => DisabledTimes;

export default {
  disabled: {
    beforeNow: {
      date: ((current) => {
        return current && current < dayjs().startOf('day');
      }) as DisabledDate,
      time: ((current) => {
        const disabled: DisabledTimes = {};
        const now = dayjs();
        if (!now.isSame(current, 'day')) {
          return disabled;
        }

        disabled.disabledHours = () => {
          const hour = now.hour();
          return Array.from({length: hour}, (v, i) => i);
        };

        disabled.disabledMinutes = (hour) => {
          if (hour !== now.hour()) {
            return [];
          }
          const minute = now.minute();
          return Array.from({length: minute}, (v, i) => i);
        };

        disabled.disabledSeconds = (hour, minute) => {
          if (hour !== now.hour() || minute !== now.minute()) {
            return [];
          }
          const second = now.second();
          return Array.from({length: second}, (v, i) => i);
        };

        disabled.disabledMilliseconds = (hour, minute, second) => {
          if (hour !== now.hour() || minute !== now.minute() || second !== now.second()) {
            return [];
          }
          const millisecond = now.millisecond();
          return Array.from({length: millisecond}, (v, i) => i);
        };

        return disabled;
      }) as DisabledTime,
    },
  },
};
