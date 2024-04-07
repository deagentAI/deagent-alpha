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

export const filterMergeByUid = (soruceData: any) => {
  // 根据 uid 分组
  const groupedByUid = R.groupBy((R as any).prop("uid"), soruceData);
  // 合并具有相同 uid 的对象
  const mergedByUid = R.map((group) => {
    return R.reduce(R.mergeDeepRight, {}, group);
  }, groupedByUid);

  // 将对象转换为数组
  const result = R.values(mergedByUid);
  return result;
};

/**
 * @desc 过滤处理同一个问题调用多个agent数据,处理同一个问题，调用多个agent
 */
export const filterChatDataByMoreAgent = () => {
  const filterOutWithoutAgentName = R.filter(
    R.pipe(R.prop("agent_name"), Boolean)
  );
  // 分组函数，根据uid分组
  const groupByUid: any = R.groupBy((R as any).prop("uid"));
  // 检测agent_name是否不同
  const hasUniqueAgentNames = (group: any) =>
    R.uniqBy((R as any).prop("agent_name"), group).length > 1;
  // 过滤并返回只有agent_name不同的组
  const filterUniqueAgentNames = (groupedData: any[]) =>
    R.values(
      R.mapObjIndexed(
        (value) => (hasUniqueAgentNames(value) ? value : []),
        groupedData
      )
    );
  // 将分组数据展平
  const flattenGroups = R.flatten;
  // 组合上述函数
  const filterData = R.pipe(
    filterOutWithoutAgentName,
    groupByUid, // 根据uid分组
    filterUniqueAgentNames, // 过滤出agent_name不同的组
    flattenGroups // 展平数据
  );
  return filterData;
};
