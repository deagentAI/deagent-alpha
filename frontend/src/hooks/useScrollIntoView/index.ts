export const useScrollToView = () => {
  const handleToTargetView = (dom: any) => {
    if (dom) {
      dom?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return {
    handleToTargetView,
  };
};
