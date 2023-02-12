import { StoreValue, useStore } from "../../store";

const selector = (value: StoreValue) =>
  value.awards.reduce((a, b) => a + b.cost, 0);

const useAwardsTotalCost = () => {
  const awardsTotalCost = useStore(selector);
  return awardsTotalCost;
};

export default useAwardsTotalCost;
