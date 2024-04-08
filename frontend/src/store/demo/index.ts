import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storageUtils } from "@utils/index";
import { DaWidgetComponentName } from "@src/constants";

export type ChartItem = {
  type: string;
  question: string;
  answer: string;
  uid?: string;
  function_call?: any[];
  function_respond?: any[] | string;
  status?: string;
  agent_name?: string;
  swapParams?: any;
  keyUid?: string;
  time?: number;
  active?: boolean;
  agent_suggestion_data?: any[];
};
const initState = {
  chartData: [] as ChartItem[],
  isMobile: false,
  isToogle: false,
  swapData: {} as any,
  walletAddress: "",
  daWidgetPos: {
    [DaWidgetComponentName.ApyHunter]: {
      x: 0,
      y: 0,
      opacity: 0,
      zIndex: 0,
    },
    [DaWidgetComponentName.bubblenews]: {
      x: 0,
      y: 0,
      opacity: 0,
      zIndex: 0,
    },
    [DaWidgetComponentName.coinPedia]: {
      x: 0,
      y: 0,
      opacity: 0,
      zIndex: 0,
    },
    [DaWidgetComponentName.jellyQuant]: {
      x: 0,
      y: 0,
      opacity: 0,
      zIndex: 0,
    },
    [DaWidgetComponentName.onchaindata]: {
      x: 0,
      y: 0,
      opacity: 0,
      zIndex: 0,
    },
    [DaWidgetComponentName.swapAssistant]: {
      x: 0,
      y: 0,
      opacity: 0,
      zIndex: 0,
    },
  },
  answerStatus: 0,
  searchStatus: 0, // agentList 加载切换状态
  cacheUid: "", // 缓存最近的一次提问的uid
  activeAgentList: [], // 当前问题调用的agentList
  swapParams: {}, // 存储当前最新的swap参数
  storeChatData: (val: any) => {},
  storeSwapData: (val: any) => {},
  storeIsMobile: (val: boolean) => {},
  storeIsToogle: (val: boolean) => {},
  storeDaWidgetPos: (val: any) => {},
  storeStatus: (val: any) => {},
  storeWalletAddress: (val: string) => {},
  storeSearchStatus: (val: number) => {},
  storeCacheUid: (value: any) => {},
  storeActiveAgentList: (val: any) => {},
  storeSwapParams: (val: any) => {},
};

export const useDemoStore = create(
  persist<typeof initState>(
    (set) => ({
      chartData: [],
      isMobile: false,
      isToogle: false,
      swapData: {},
      daWidgetPos: {
        [DaWidgetComponentName.ApyHunter]: {
          x: 0,
          y: 0,
          opacity: 0,
          zIndex: 0,
        },
        [DaWidgetComponentName.bubblenews]: {
          x: 0,
          y: 0,
          opacity: 0,
          zIndex: 0,
        },
        [DaWidgetComponentName.coinPedia]: {
          x: 0,
          y: 0,
          opacity: 0,
          zIndex: 0,
        },
        [DaWidgetComponentName.jellyQuant]: {
          x: 0,
          y: 0,
          opacity: 0,
          zIndex: 0,
        },
        [DaWidgetComponentName.onchaindata]: {
          x: 0,
          y: 0,
          opacity: 0,
          zIndex: 0,
        },
        [DaWidgetComponentName.swapAssistant]: {
          x: 0,
          y: 0,
          opacity: 0,
          zIndex: 0,
        },
      },
      answerStatus: 0,
      walletAddress: "",
      searchStatus: 0,
      cacheUid: "", // 缓存最近的一次uid
      activeAgentList: [], // 当前问题调用的agentList
      swapParams: {}, // 存储当前最新的swap参数
      storeChatData: (chartData: any) => set({ chartData }),
      storeSwapData: (swapData: any) => set({ swapData }),
      storeIsMobile: (isMobile: boolean) => set({ isMobile }),
      storeIsToogle: (isToogle: boolean) => set({ isToogle }),
      storeDaWidgetPos: (daWidgetPos: any) => set({ daWidgetPos }),
      storeStatus: (answerStatus: number) => set({ answerStatus }),
      storeWalletAddress: (walletAddress: string) => set({ walletAddress }),
      storeSearchStatus: (searchStatus: number) => set({ searchStatus }),
      storeCacheUid: (cacheUid: any) => set({ cacheUid }),
      storeActiveAgentList: (activeAgentList: any) => set({ activeAgentList }),
      storeSwapParams: (swapParams: any) => set({ swapParams }),
    }),
    {
      name: "da-demo-chat-storage",
      getStorage: () => localStorage,
      serialize: (state) =>
        JSON.stringify(
          state,
          (key, value) => (typeof value === "function" ? value : value) // 自定义序列化逻辑
        ),
      deserialize: (str) =>
        JSON.parse(str, (key, value) => {
          // 如果需要，这里可以实现自定义的反序列化逻辑
          return value;
        }),
    }
  )
);
// 清除持久缓存
export const clearGlobalsStorePersistedState = () => {
  // 使用持久化中间件提供的清除方法
  storageUtils.remove("da-demo-chat-storage");
  useDemoStore.setState(initState, true);
};

const AgentListState = {
  agentListVisible: false,
  foldStatus: false, // 是否折叠
  storeAgentListVisible: (val: any) => {},
  storeFoldStatus: (val: any) => {},
};
export const useAgentListStore = create<typeof AgentListState>((set: any) => ({
  agentListVisible: false,
  foldStatus: false,
  storeAgentListVisible: (agentListVisible) => set({ agentListVisible }),
  storeFoldStatus: (foldStatus) => set({ foldStatus }),
}));

const suggestionState = {
  suggestList: [],
  storeSuggestList: (val: any) => {},
};
export const useSuggestionStore = create<typeof suggestionState>(
  (set: any) => ({
    suggestList: [],
    storeSuggestList: (suggestList) => set({ suggestList }),
  })
);

const videoState = {
  videoVisible: true,
  storeVideoVisible: (val: any) => {},
};

export const useVideoStore = create<typeof videoState>((set: any) => ({
  videoVisible: true,
  storeVideoVisible: (videoVisible) => set({ videoVisible }),
}));
