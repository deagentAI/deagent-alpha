/**
 * @description 科学计数法正常转换数字显示
 * @param val
 * @returns string
 * @author maicFir
 */
export function scientificToNumber(num: any) {
  const result = String(num).split("e");
  let strNumber = num;
  if (result.length > 1) {
    const [val, decimal] = result;
    const cdecimal = Number(decimal);
    const cVal = val.replace(".", "");
    if (cdecimal < 0) {
      const decil = new Array(Math.abs(cdecimal))
        .fill(0)
        .join("")
        .replace("0", "0.");
      strNumber = `${decil}${cVal}`;
    }
  }
  return strNumber;
}

/**
 *
 * @returns 正则匹配，只能输入大于等于1的数字，可以输入小数点
 */
export const isNumberSize = (value: string) => {
  return /\b([1-9]\d*(\.\d*)?|0?\.\d*[1-9]\d*)\b/g.test(value);
};

/**
 *
 * @returns 正则匹配，只能输入大于0的数字，可以输入小数点
 */
export const isNumber = (value: string) => {
  return /\b([1-9]\d*(\.\d+)?|0?\.\d*[1-9]\d*)\b/g.test(value);
};

export const isNumberRule = (value: string) => {
  return /^\d*(\.\d*)?$/.test(value);
};

// 验证word ,只能数字和字母
export const isWord = (value: string) => {
  return /^[a-zA-Z0-9]+$/.test(value);
};

// 验证name 只能数字字母和下划线
export const isName = (value: string) => {
  return /^[a-zA-Z0-9_]+$/.test(value);
};

// 验证邮箱正则
export const isEmail = (value: string) => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
};

// dex币对价格显示 https://wp0pvwzgfk.feishu.cn/docx/GaL6dEIGEoBRjexh1C4cBa6bneh
export const formatDexTokenPrice = (value: number) => {
  if (!value) {
    return "";
  }
  let price = scientificToNumber(value);
  let formattedPrice = scientificToNumber(price);

  if (price > 1) {
    formattedPrice = price?.toFixed(2);
  } else {
    let firstNonZeroDigitIndex = price?.toString().indexOf(".") + 1;
    while (price?.toString().charAt(firstNonZeroDigitIndex) == "0") {
      firstNonZeroDigitIndex++;
    }

    if (firstNonZeroDigitIndex < 5) {
      formattedPrice = price?.toFixed(4);
    } else {
      let significantDigits = price
        ?.toString()
        .substr(firstNonZeroDigitIndex, 4);
      let zeroesCount = firstNonZeroDigitIndex - 2;
      formattedPrice = `<span>0.0${`<sub>${zeroesCount}</sub>`}${significantDigits}</span>`;
    }
  }

  return formattedPrice;
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
