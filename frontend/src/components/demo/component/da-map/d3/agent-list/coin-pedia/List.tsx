/**
 * @description 请添加组件描述
 * @author maicFir
 */
import React, { memo, useContext } from "react";
import clsx from "clsx";
import { formatDexTokenPrice } from "@src/utils";
import { ChartItem, useDemoStore } from "@/store";
import { MessageContext } from "@comp/demo/indexContext";
import { PrecentUpDown } from "@comp/global";

interface Props {
  dataItem: any;
  data: any[];
}

const List: React.FC<Props> = (props) => {
  const { data = [], dataItem } = props;
  console.log(data, "test");
  const { handleSubMessage } = useContext(MessageContext);
  const { storeSearchStatus } = useDemoStore();

  const quoteItemClass = ({
    name,
    disabled,
  }: {
    name: string;
    value: string;
    disabled: boolean;
  }) =>
    clsx({
      "answer-quote-item": true,
      "answer-quote-item-disabled": disabled,
    });
  const handleQuote = (
    v: { name: string; value: string; disabled?: boolean },
    params: ChartItem,
    index: number
  ) => {
    const { uid } = params;
    // debugger;
    // const chatItemIndex = chartData.findIndex((v) => v.uid === uid);
    // if (chartData[chatItemIndex] && chartData[chatItemIndex].function_respond) {
    //   // (chartData[chatItemIndex] as any).function_respond[index].disabled = true;
    //   // (chartData[chatItemIndex] as any).agent_response_flag = true;
    //   storeSearchStatus(0);
    // }
    storeSearchStatus(0);

    handleSubMessage({
      value: v.value,
      uid,
      callbackSwap: "success",
    });
  };
  return (
    <>
      {data?.map((s: any, index: number) => {
        return (
          <div
            className={quoteItemClass(s)}
            key={index}
            onClick={() => handleQuote(s, dataItem, index)}
          >
            <div className="list-icon">
              <img src={s?.token_info?.icon} alt="" width={20} height={20} />
            </div>
            <div className="name">{s.name}</div>
            <div
              className={`price-value`}
              dangerouslySetInnerHTML={{
                __html: formatDexTokenPrice(s?.token_info?.price),
              }}
            ></div>
            <PrecentUpDown value={s?.token_info?.percentChange24h.toFixed(2)}>
              %
            </PrecentUpDown>
          </div>
        );
      })}
    </>
  );
};

export default memo(List);
