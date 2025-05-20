import { InformationPopUp } from "../InformationPopUp";
import { PopupBanner } from "../PopupBanner";

interface WaitForPlayerPopupProps {
  gameId?: number;
  isCreator?: boolean;
  showGameId?: boolean;
}

export const WaitForPlayerPopup = ({ 
  gameId, 
  isCreator = false,
  showGameId = false 
}: WaitForPlayerPopupProps) => {
  let bannerText = "Waiting for other player!";
  
  if (isCreator && gameId && showGameId) {
    bannerText = `Waiting for other player! Game ID: ${gameId}`;
  }
    
  return (
    <InformationPopUp
      onClose={() => {}}
      content={<PopupBanner text={bannerText} />}
    ></InformationPopUp>
  );
};
