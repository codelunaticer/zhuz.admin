import type { Context } from 'vm';

/**
 * 获取当前电脑地址
 * @returns
 */
export const getIpAddress = () => {
  const interfaces = require('os').networkInterfaces();

  for (const devName in interfaces) {
    const temp = interfaces[devName];

    for (let i = 0; i < temp.length; i++) {
      const alias = temp[i];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

/**
 * 获取客户端ip地址
 * @param ctx
 * @returns
 */
export const getClientIpAddress = (ctx: Context) => {
  const headers = ctx.headers;

  if (headers['x-forwarded-for']) {
    const ipList = headers['x-forwarded-for'].split(',');

    return ipList[0];
  }
  return '0.0.0.0';
};
