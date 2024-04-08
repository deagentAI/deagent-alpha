import { useContext, useMemo } from "react";
import { useDemoStore } from "@/store";
import { MessageContext } from "../indexContext";
/**
 * @description 获取agentList数据
 * @param agentName
 * @returns
 */
export const useGetAgentList = (agentName: string) => {
  const { chartData } = useDemoStore();
  const { chatUid } = useContext(MessageContext);
  const agentList = useMemo(() => {
    if (chartData.length > 0) {
      const lastNewAgent: any =
        chartData.findLast(
          (v) => v.uid === chatUid && v.agent_name === agentName
        ) || {};
      if (Object.keys(lastNewAgent).length > 0) {
        return [{ ...lastNewAgent }];
      }
      return [];
    }
    return [];
  }, [chartData, chatUid]);
  return {
    agentList,
  };
};
