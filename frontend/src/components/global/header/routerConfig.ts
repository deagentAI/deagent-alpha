import { PageIdEnum } from "@src/constants";
export type routerType = {
  idName: PageIdEnum;
  text: string;
  langKey: string;
};
export type routerTypeArr = routerType[];

export const routerConfig: routerTypeArr = [
  {
    idName: PageIdEnum.banner,
    text: "",
    langKey: "",
  },
  {
    idName: PageIdEnum["deagent-ai"],
    text: "DeAgent.ai",
    langKey: "",
  },
  {
    idName: PageIdEnum.advantages,
    text: "Advantages",
    langKey: "",
  },
  {
    idName: PageIdEnum.ecosytages,
    text: "Ecosystem",
    langKey: "",
  },
  {
    idName: PageIdEnum.roadmap,
    text: "Roadmap",
    langKey: "",
  },
  {
    idName: PageIdEnum.partner,
    text: "Partner",
    langKey: "",
  },
];
