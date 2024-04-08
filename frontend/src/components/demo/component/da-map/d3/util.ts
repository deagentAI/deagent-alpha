export function calculateVertices(
  centerX: number,
  centerY: number,
  size: number
) {
  let angleDeg, x, y;
  const points = [];
  for (let side = 0; side < 7; side++) {
    angleDeg = 60 * side - 30;
    x = centerX + size * Math.cos((angleDeg * Math.PI) / 180);
    y = centerY + size * Math.sin((angleDeg * Math.PI) / 180);
    points.push({ x, y });
  }
  return points;
}
export function addColorChangeAnimations({
  tl,
  ids,
  color,
  duration,
  staggerTime,
}: {
  tl: gsap.core.Timeline;
  ids: string[];
  color: string;
  duration: number;
  staggerTime: any;
}) {
  tl.staggerTo(
    ids.map((id) => `#id${id}`),
    0.5,
    {
      fill: color,
      ease: "power2.in",
    },
    staggerTime
  ).staggerTo(
    ids.map((id) => `#id${id}`),
    0.2,
    {
      fill: color, // 假设恢复原来的颜色
      ease: "power2.in",
    },
    staggerTime
  );

  //   ids.forEach((id) => {
  //     // 假设每个DOM元素的id是以 'dom' 开头的
  //     tl.to(
  //       `#id${id}`,
  //       {
  //         fill: color, // 变化的颜色
  //         duration, // 持续时间，单位秒
  //         ease: "linear", // 动画速度曲线
  //       },
  //       0
  //     ); // 第三个参数是position，0表示所有动画同时开始
  //   });
}

export const MatchTransform = (str: string) => {
  const regex = /translate\(([^,]+),([^)]+)\)/;
  const matches = str.match(regex);
  if (matches) {
    const [, x, y] = matches;
    return {
      x,
      y,
    };
  }
};
