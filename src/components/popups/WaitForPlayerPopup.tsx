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
    bannerText = `Game ID: ${gameId} - Waiting for other player!`;
  }
    
  return (
    <InformationPopUp
      onClose={() => {}}
      content={<PopupBanner text={bannerText} />}
    ></InformationPopUp>
  );
};
