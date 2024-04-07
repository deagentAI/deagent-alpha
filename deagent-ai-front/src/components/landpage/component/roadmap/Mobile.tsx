/**
 * @description 请添加组件描述
 * @author joy
 */
import React, { memo } from "react";
import { RoadmapPhoneIcon, RoadmapLineIcon } from "@comp/global/svg-icon";

interface Props {
  readMapData: any;
}

const Index: React.FC<Props> = (props) => {
  const { readMapData } = props;
  return (
    <div className="roadmap-phone">
      <div className="timeline-phone"></div>
      {readMapData.map((v: any, index: number) => {
        return (
          <div
            className={`timeline-point-phone timeline-point-phone-${index + 1}`}
            key={index}
          >
            <div className="road-item">
              <div className="road-icon">
                <RoadmapPhoneIcon />
              </div>
              <div className="road-icon mx-[4px] mt-[8px]">
                <RoadmapLineIcon />
              </div>
              <div className="wrap">
                <div className="ai-text">{v.date}</div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: v.desc }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Index);
