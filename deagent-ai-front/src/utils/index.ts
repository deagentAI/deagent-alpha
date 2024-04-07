export * from "./solana";
export * from "./date";
export * from "./number";
export * from "./ramda_arr";
export * from "./ani";
/**
 *
 * @returns true 移动端 false pc端
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export const deepClone: any = (obj: object = {}, cache = new WeakMap()) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (cache.has(obj)) return cache.get(obj);
  let clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(
      Array.from(obj, ([key, value]) => [key, deepClone(value, cache)])
    );
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, (value) => deepClone(value, cache)));
  } else if (Array.isArray(obj)) {
    clone = obj.map((value) => deepClone(value, cache));
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
};
/**
 * @deprecated 根据type,判断是否是对象，字符串，数字
 */
export const isObjectValue = (val: any, type: "Object" | "String" | "Number") =>
  Object.prototype.toString.call(val) === `[object ${type}]`;

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export const guid = (len = 32, firstU = true, radix = 0) => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid: any[] = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return `u${uuid.join("")}`;
  }
  return uuid.join("");
};

/**
 *
 * @returns 本地缓存
 * 例如:
 * 设置缓存 storageUtils.storage('name', "test") 缓存name到本地缓存
 * 获取缓存的值：storageUtils.storage("name")
 * 清除缓存： storageUtils.clear();
 * 清除指定的缓存值: storageUtils.clear('name')
 *
 */
export const storageUtils = {
  getStorage(key: string) {
    return localStorage && JSON.parse((localStorage as any).getItem(key));
  },
  setStorage(key: string, value: any) {
    localStorage && localStorage.setItem(key, JSON.stringify(value));
  },
  clear() {
    localStorage && localStorage.clear();
  },
  remove(key: string) {
    localStorage && localStorage.removeItem(key);
  },
};

/**
 *
 * @param url
 * @returns 获取参数url的参数
 */
export const url2Params = (url: string) => {
  var seg,
    ret: any = {},
    atag;
  atag = document.createElement("a");
  atag.href = url;
  seg = atag.search?.replace(/^\?/, "").split("&");
  seg.forEach(function (p) {
    var s = p.split("=");
    ret[s[0]] = s[1];
  });
  return ret;
};

/**
 * @description 将对象转换成url参数
 * @param obj
 * @returns
 */
export const objectToQueryParams = (obj: any) => {
  return new URLSearchParams(obj).toString();
};
/**
 *
 * @param sourceStr
 * @param curentVal
 * @param reg
 * @returns 高亮匹配关键字
 */
export const hightText = (
  sourceStr: string,
  curentVal: string,
  reg = "all"
) => {
  if (curentVal === "") {
    return sourceStr;
  }
  if (!sourceStr) {
    return sourceStr;
  }
  const regVal = new RegExp(curentVal, "i");
  const ret = sourceStr.match(regVal);
  const hightStr = Array.isArray(ret) ? ret[0] : "";
  const hightDom = (text: string) =>
    `<i class="hight" style='color: #f5a423cc;font-weight:bold;font-style:normal;'>${text}</i>`;
  if (hightStr) {
    if (reg) {
      // 全匹配
      return sourceStr?.replace(
        new RegExp(`${hightStr}`, "gi"),
        hightDom(hightStr)
      );
    }
    return sourceStr?.replace(hightStr, hightDom(hightStr));
  }
  return sourceStr;
};

// 判断一个数组是否在一个区间内
export const isRangeIn = (currentNum: number, min: number, max: number) => {
  if (currentNum <= max && currentNum >= min) {
    return true;
  }
  return false;
};

/**
 * 分时加载数据，优化大数据量加载,将后端接口数据定时分片加载
 */
export const timerChunk = (
  sourceArr: any[] = [],
  callback: (args: unknown) => void,
  count = 1,
  wait = 200
) => {
  let ret: any,
    timer: any = null;
  const renderData = () => {
    for (let i = 0; i < Math.min(count, sourceArr.length); i++) {
      // 取出数据
      ret = sourceArr.shift();
      callback(ret);
    }
  };
  return () => {
    if (!timer) {
      // 利用定时器每隔200ms取出数据
      timer = setInterval(() => {
        // 如果数据取完了，就清空定时器
        if (sourceArr.length === 0) {
          clearInterval(timer);
          ret = null;
          return;
        }
        renderData();
      }, wait);
    }
  };
};

/**
 * @description 判断数据类型
 * @param type
 * @returns
 */
export const isType = (type: string) => {
  return (value: any) => {
    return Object.prototype.toString.call(value) === "[object " + type + "]";
  };
};
/**
 * @description 判断是否ETH地址
 * @param str
 * @returns
 */
export const isEthAddress = (str: string) => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(str);
};

/**
 * @description 替换元素位置
 */
export const moveArrayPosition = (
  arr: any[],
  oldIndex: number,
  newIndex: number
) => {
  if (
    oldIndex < 0 ||
    oldIndex >= arr.length ||
    newIndex < 0 ||
    newIndex >= arr.length
  ) {
    return;
  }
  const element = arr.splice(oldIndex, 1)[0]; // 移除旧位置的元素
  arr.splice(newIndex, 0, element); // 在新位置插入元素
  return arr;
};

/**
 * @description 截取钱包地址
 * @param address
 * @param charsToShow
 * @returns
 */
export const abbreviateAddress = (address: any, charsToShow: number = 4) => {
  if (address?.length <= charsToShow * 2) {
    return address;
  }

  return (
    address?.substring(0, charsToShow) +
    "...." +
    address?.substring(address.length - charsToShow)
  );
};

/**
 * @description 格式化金额
 * @param value
 * @returns
 */
export const formatCurrency = (value: number | string) => {
  return value.toLocaleString("en-US");
};

// 数字转换单位
export function formatNumberChange(num: number) {
  if (num >= 1000000000) {
    return Number((num / 1000000000).toFixed(2)) + "B";
  } else if (num >= 1000000) {
    return Number((num / 1000000).toFixed(2)) + "M";
  } else if (num >= 1000) {
    const aa = (num / 1000).toFixed(2);
    return Number((num / 1000).toFixed(2)) + "K";
  } else {
    return Number(Number(num).toFixed(2));
  }
}

/**
 * @description 下载文件
 * @param dataUrl
 */

export const downloadImage = (params: {
  dataUrl: string;
  fileName: string;
  extName?: string;
}) => {
  const { dataUrl, fileName, extName = "png" } = params;
  const a = document.createElement("a");
  a.setAttribute("download", `${fileName}.${extName}`);
  a.setAttribute("href", dataUrl);
  a.click();
};

// 复制文本,根据内容
export const copyContent = (content: string) => {
  // 创建一个临时的文本区域以复制内容
  const tempInput = document.createElement("input");
  tempInput.value = content;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  return true;
};

export const forMateTwitterUrl = (url: string) => {
  if (url) {
    const currentUrl = new URL(url);
    const pathName = currentUrl.pathname.replace("/", "");
    return {
      origin: currentUrl.origin,
      pathName,
    };
  }
  return {
    origin: "",
    pathName: "",
  };
};
