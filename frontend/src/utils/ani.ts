import gsap from "gsap";

export type OptionItem = {
  id: string;
};
export class AniGasp {
  id: string;
  constructor(options: any) {
    const { id } = options;
    this.id = id;
  }
  // agentList弹框
  agentListModule() {}
  // chat右侧对话框
  agentAssistantModule() {
    gsap.from(
      this.id,
      {
        x: "1000px",
        duration: 1,
      } as any,
      {
        x: "450px",
        duration: 3,
      }
    );
  }
  daMap() {
    gsap.to(
      this.id,

      {
        opacity: 1,
        duration: 3,
        ease: "none",
      }
    );
  }
}
