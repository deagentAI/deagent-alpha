import * as R from "ramda";

/**
 * @description 通过源数据typ字段过滤defaultAgentList
 * @param sourceData
 * @param defaultAgentList
 * @returns
 */
export const filteredAgentList = (sourceData: any[], defaultAgentList: any) => {
  const agentNamesFromSource = R.uniq(R.pluck("agent_name", sourceData));
  const filteredAgentListResult = R.filter(
    (agent: any) => R.includes(agent.type, agentNamesFromSource),
    defaultAgentList
  );
  return filteredAgentListResult;
};
/**
 * @description 过滤掉重复uid一样的数据
 */
export const filterAgentListByUid = (sourceData: any[], key: string) => {
  // 使用 R.uniqBy 根据 uid 属性去重
  const uniqueByUid = R.uniqBy(R.prop(key));
  // 应用去重函数
  return uniqueByUid(sourceData);
};
