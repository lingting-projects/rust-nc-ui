export default {
  isNull: (source?: any) =>
    source === undefined || source === null || typeof source === 'undefined',
};
