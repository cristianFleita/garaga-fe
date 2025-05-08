import { useDojo } from "../DojoContext";

export const useCells = () => {
  const {
    setup: {
      clientComponents: {},
    },
  } = useDojo();
};
