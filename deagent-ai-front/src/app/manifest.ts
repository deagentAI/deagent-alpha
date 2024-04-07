import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeagentAI",
    short_name: "DeagentAI",
    description: "deagent ai",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/images/logo/192x37.png",
        sizes: "192x37",
        type: "image/png",
      },
      {
        src: "/images/logo/512x99.png",
        sizes: "512x99",
        type: "image/png",
      },
    ],
  };
}
