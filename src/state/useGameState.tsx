import { useDojo } from "../dojo/DojoContext";

export const useGameState = () => {
  const {
    setup: {
      client,
      account: { account },
    },
  } = useDojo();
};
