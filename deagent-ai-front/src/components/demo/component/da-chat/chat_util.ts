import { DaWidgetComponentName } from "@/constants";
import { guid } from "@utils/index";

type PARAMS_TYPE = {
  data: {
    result: any;
    type: string;
    status?: string;
    agent_name?: string;
    time: string;
  };
  message: string;
};
export const enum AGENT_CALL_TYPE {
  agent_call = "agent_call",
  agent_respond = "agent_respond",
  agent_answer = "agent_answer",
  agent_suggestion = "suggestion_query",
}
// agentCall 统一处理socket返回过来的数据
export const agentCallUtil = (params: PARAMS_TYPE) => {
  const result = params?.data?.result;
  const type = params?.data?.type;
  const message = params?.message;
  const status = params?.data?.status;
  const agent_name = params?.data?.agent_name;
  const time = params?.data?.time;
  return {
    data: result,
    type,
    message,
    status,
    agent_name,
    time,
  };
};

export const updateAgentCall = (
  { type, data, chatIndex, cacheData, time, status }: any,
  callback: Function
) => {
  if (
    AGENT_CALL_TYPE.agent_call === type &&
    cacheData instanceof Array &&
    cacheData.length > 0 &&
    type &&
    data &&
    cacheData[chatIndex]
  ) {
    cacheData[chatIndex].status = status;
    cacheData[chatIndex].function_call = data;
    cacheData[chatIndex].keyUid = guid();
    cacheData[chatIndex].time = time;
    callback && callback(cacheData);
  }
};

// 调用agentCall的返回
export const updateAgentResponse = (
  { type, cacheData, chatIndex, agent_name, data, time, status }: any,
  callback: Function
) => {
  // 调用agent的respond
  if (
    AGENT_CALL_TYPE.agent_respond === type &&
    cacheData instanceof Array &&
    type &&
    cacheData[chatIndex]
  ) {
    // agent_name && cacheData[chatIndex].agent_name !== agent_name 待处理
    let diffAgentName =
      agent_name &&
      cacheData[chatIndex].agent_name &&
      cacheData[chatIndex].agent_name !== agent_name;
    if (diffAgentName) {
      // 同一个问题调用多个agent
      const item = cacheData[chatIndex];
      cacheData.push({
        ...item,
        function_respond: data,
        status,
        agent_name,
        question: cacheData[chatIndex].question,
      });
    } else {
      cacheData[chatIndex].function_respond = data;
      cacheData[chatIndex].status = status;
      cacheData[chatIndex].agent_name = agent_name;
      cacheData[chatIndex].keyUid = guid();
      cacheData[chatIndex].time = time;
    }
    // swapAgent
    if (agent_name === DaWidgetComponentName.swapAssistant) {
      // 动态添加一个swap的params
      cacheData[chatIndex].swapParams = {};
    }
    callback && callback(cacheData);
  }
};

// agent推荐问题
export const updateAgentSuggest = (
  { type, cacheData, chatIndex, data, status }: any,
  callback: Function
) => {
  // 推荐问题
  if (
    AGENT_CALL_TYPE.agent_suggestion === type &&
    cacheData.length > 0 &&
    cacheData instanceof Array &&
    type &&
    cacheData[chatIndex]
  ) {
    cacheData[chatIndex].status = status;
    cacheData[chatIndex].agent_suggestion_data = data;
    callback && callback(cacheData);
  }
};

// angentAnswer angent最终回答
export const updateAgentAnswer = (
  { cacheData, chatIndex, data, searchValue, time, status, type }: any,
  callback: Function
) => {
  if (
    AGENT_CALL_TYPE.agent_answer === type &&
    cacheData.length > 0 &&
    cacheData instanceof Array &&
    data &&
    type &&
    cacheData[chatIndex]
  ) {
    cacheData[chatIndex].answer = data;
    cacheData[chatIndex].keyUid = guid();
    if (cacheData[chatIndex]?.question && searchValue) {
      cacheData[chatIndex].question = searchValue;
    }
    cacheData[chatIndex].status = status;
    cacheData[chatIndex].time = time;
    callback && callback(cacheData);
  }
};
