export default {
  isDev:
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'dev' ||
    process.env.UMI_ENV === 'dev',
  isProd:
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'prod' ||
    process.env.UMI_ENV === 'prod',
};
