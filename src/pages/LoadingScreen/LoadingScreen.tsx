import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";
import "../../App.scss";
// import { FadeInOut } from "../../components/animations/FadeInOut";
import { PreThemeLoadingPage } from "../PreThemeLoadingPage";
import OpeningScreenAnimation from "./OpeningScreenAnimation";
import { isMobile } from "react-device-detect";

interface LoadingScreenProps {
  error?: boolean;
  showPresentation?: boolean;
  onPresentationEnd?: () => void;
  canFadeOut?: boolean;
}

export const LoadingScreen = ({
  error = false,
  showPresentation = false,
  onPresentationEnd = () => {},
  canFadeOut = false,
}: LoadingScreenProps) => {
  const [visibleSpinner, setVisibleSpinner] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (canFadeOut) {
      setTimeout(() => setIsFadingOut(true), 500);
    }
  }, [canFadeOut]);

  const handleAnimationEnd = () => {
    setSkipAnimation(true);
    setVisibleSpinner(true);
    onPresentationEnd();
  };

  return (
    <Flex
      width={"100%"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* <FadeInOut isVisible={!isFadingOut} fadeOut fadeOutDelay={0.7}> */}
      <PreThemeLoadingPage>
        {error ? (
          <div>error loading game</div>
        ) : (
          <Flex
            width={"100%"}
            flexDirection={"column"}
            gap={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {showPresentation && (
              <OpeningScreenAnimation
                skipAnimation={skipAnimation}
                onAnimationEnd={handleAnimationEnd}
              />
            )}

            {(visibleSpinner || !showPresentation) && (
              <img src="loader.gif" alt="loader" width="100px" />
            )}

            {!skipAnimation && !isMobile && (
              <Button
                onClick={handleAnimationEnd}
                position="absolute"
                bottom="20px"
                right="20px"
                variant={"ghost"}
              >
                Skip
              </Button>
            )}
          </Flex>
        )}
      </PreThemeLoadingPage>
      <RemoveScroll>
        <></>
      </RemoveScroll>
      {!skipAnimation && isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          onClick={handleAnimationEnd}
        />
      )}
      {/* </FadeInOut> */}
    </Flex>
  );
};
