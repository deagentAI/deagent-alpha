import React, { memo } from "react";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import { toPng } from "html-to-image";
import { BaseButton } from "@comp/global";
import { downloadImage } from "@utils/index";

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng((document as any).querySelector(".react-flow__viewport"), {
      backgroundColor: "#191a1c",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      } as any,
    }).then((dataUrl) => {
      downloadImage({ dataUrl, fileName: "deAgentFlow" });
    });
  };

  return (
    <Panel position="top-right">
      <BaseButton className="download-btn" onClick={onClick}>
        down this flow
      </BaseButton>
    </Panel>
  );
}

export default memo(DownloadButton);
