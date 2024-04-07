import { useDemoStore } from "@src/store";
import { DaWidgetComponentName } from "@src/constants";
type widgetNameType =
  | DaWidgetComponentName.ApyHunter
  | DaWidgetComponentName.bubblenews
  | DaWidgetComponentName.coinPedia
  | DaWidgetComponentName.jellyQuant
  | DaWidgetComponentName.onchaindata
  | DaWidgetComponentName.swapAssistant;
export const useGetWidgetPos = (widgetName: widgetNameType): any => {
  const { daWidgetPos } = useDemoStore();
  console.log(daWidgetPos[widgetName], "=123daWidgetPos");
  return daWidgetPos[widgetName];
};
