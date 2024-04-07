import dayjs from "dayjs";
import TimeZone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(TimeZone);

// 根据时区转换时间
export const formatTime = (
  date: number,
  formate: string = "MM/DD/YYYY, HH:mm:ss"
) => {
  const utcTime = dayjs(date).tz(getGuess());
  return dayjs(utcTime).format(formate);
};
// 获取时区
export const getGuess = () => {
  return dayjs.tz.guess();
};

// 换算分钟成小时
export const formatTimeM = (minutes: number) => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
    return `${hours}h`;
  }
  return `${minutes} min`;
};

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
