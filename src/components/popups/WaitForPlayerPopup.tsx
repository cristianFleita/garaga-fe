import { InformationPopUp } from "../InformationPopUp";
import { PopupBanner } from "../PopupBanner";

export const WaitForPlayerPopup = () => {
  return (
    <InformationPopUp
      onClose={() => {}}
      content={<PopupBanner text="Waiting for player" />}
    ></InformationPopUp>
  );
};
