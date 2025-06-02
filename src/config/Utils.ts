// 获取字符串中的数字
export function getStrNum(str: string | number) {
  const res = str.toString().match(/[\d.]+/);
  return res ? parseFloat(res[0]) : 0;
}

/**
 * @description 获取范围内随机数
 * @param max 最大范围值 可为空 默认100
 * @param min 最小范围值 可为空 默认0
 * @return 随机数
 * 例：getRandom(500) 取 0~500之间的值
 * 例：getRandom(500,100) 取 100~500之间的值
 */
export function getRandomNum(max?: number, min?: number) {
  // 当max和min都有值 则取min~max范围中随机数
  if (max !== undefined && min !== undefined) {
    return Math.random() * (max - min) + min;
  }
  // 当前min 为空,max有值 则以max为最大值取 0~max之间的随机数
  if (max !== undefined) {
    return Math.floor(Math.random() * max);
  }
  // 否则 默认取0~100随机数
  return Math.floor(Math.random() * 100);
}

/**
 * 获取URL地址的参数 值
 * @param paramKey 路由参数 如：id=1&name=halo
 * @returns
 */
export function getParam(paramKey: string) {
  const paramUrl = getParamUrl();
  if (paramUrl == null) {
    return null;
  }
  const params = paramUrl.split('&');
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (param.includes('=')) {
      const kv = param.split('=');
      const key = kv[0];
      const val = kv[1];
      if (key === paramKey) {
        return val;
      }
    }
  }
  return null;
}

// 获取路由上的参数 return:id=1&name=halo
export function getParamUrl() {
  const hash = window.location.hash;
  if (hash.includes('#')) {
    const last = hash.slice(1);
    if (last.includes('?')) {
      return last.split('?')[1];
    }
    return null;
  }
  return null;
}
