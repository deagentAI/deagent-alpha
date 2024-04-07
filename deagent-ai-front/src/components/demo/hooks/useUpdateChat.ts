import { useEffect } from "react";
import { useDemoStore, ChartItem } from "@store/index";
import { useChatSocket } from "@comp/demo/hooks/useChatSocket";

export const useUpdateChartData = ({ value }: any) => {
  const { storeChatData, chartData } = useDemoStore();
  const { chatMessage, handleSubMessage, chatUid } = useChatSocket();
  useEffect(() => {
    const currentData = JSON.parse(chatMessage?.data ?? "{}") || {};
    const chatIndex = chartData.findIndex((v: ChartItem) => v.uid === chatUid);
    if (currentData?.respond) {
      chartData[chatIndex].answer = currentData?.respond;
      chartData[chatIndex].question = value;
      storeChatData(chartData);
    }
  }, [chatMessage, chartData, chatUid]);
};
