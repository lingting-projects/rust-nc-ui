import {abs} from 'stylis';

export default {
  formatDiff(max?: number, min?: number, decimals: number = 2): string {
    const start = max === null || typeof max === 'undefined' ? 0 : max;
    const end = min === null || typeof min === 'undefined' ? 0 : min;
    const diff = abs(start - end);
    const format = this.format(diff, decimals);
    if (start < end) {
      return `-${format}`;
    }
    return format;
  },
  /**
   * 将字节大小转换为合适的单位
   * @param {number} bytes - 文件大小（字节）
   * @param {number} [decimals=2] - 保留的小数位数
   * @returns {string} 格式化后的文件大小字符串
   */
  format(bytes: number, decimals: number = 2): string {
    if (bytes <= 0) return '-';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // 计算并保留指定小数位数
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

    return `${formattedSize} ${sizes[i]}`;
  },
};
