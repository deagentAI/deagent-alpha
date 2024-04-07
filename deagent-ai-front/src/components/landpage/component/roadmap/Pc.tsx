/**
 * @description 请添加组件描述
 * @author joy
 */
import React, { memo } from "react";
import {
  RoadmapArrowIcon,
  RoadmapUpIcon,
  RoadmapDownIcon,
} from "@comp/global/svg-icon";

interface Props {
  readMapData: any;
}

const Index: React.FC<Props> = (props) => {
  const { readMapData } = props;
  
  return (
      <div className="timeline">
        {readMapData.map((v: any, index: number) => {
          return (
            <div
              className={`timeline-point timeline-point-${index + 1}`}
              key={index}
            >
              <div className="wrap">
                <RoadmapArrowIcon />
                <span className="ai-text">{v.date}</span>
              </div>

              {index % 2 === 0 ? <RoadmapDownIcon /> : <RoadmapUpIcon />}
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: v.desc }}
              ></div>
            </div>
          );
        })}

      </div>
  );
};

export default memo(Index);
