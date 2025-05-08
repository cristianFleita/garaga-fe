import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PoweredByPresentation } from "./PoweredBy";
import { LogoPresentation } from "./LogoPresentation";

const MotionBox = chakra(motion.div);

interface OpeningScreenAnimationProps {
  onAnimationEnd: () => void;
  skipAnimation?: boolean;
}

const OpeningScreenAnimation: React.FC<OpeningScreenAnimationProps> = ({
  onAnimationEnd,
  skipAnimation,
}) => {
  const [stage, setStage] = useState<"logo" | "poweredBy" | "end">("logo");
  const [logoVisibility, setLogoVisibility] = useState({
    text: false,
    logo: false,
  });

  const [poweredByVisibility, setPoweredByVisibility] = useState({
    text: false,
    logo1: false,
    logo2: false,
    logo3: false,
  });

  useEffect(() => {
    if (skipAnimation) {
      setStage("end");
      onAnimationEnd();
      return;
    }

    if (stage === "logo") {
      setTimeout(
        () => setLogoVisibility((prev) => ({ ...prev, logo: true })),
        500
      );
      setTimeout(
        () => setLogoVisibility((prev) => ({ ...prev, text: true })),
        2000
      );
      setTimeout(() => {
        setLogoVisibility({
          text: false,
          logo: false,
        });
      }, 4000);

      setTimeout(() => {
        setStage("poweredBy");
      }, 5000);
    }

    if (stage === "poweredBy") {
      setTimeout(
        () => setPoweredByVisibility((prev) => ({ ...prev, text: true })),
        500
      );
      setTimeout(
        () => setPoweredByVisibility((prev) => ({ ...prev, logo1: true })),
        1000
      );
      setTimeout(
        () => setPoweredByVisibility((prev) => ({ ...prev, logo2: true })),
        1500
      );
      setTimeout(
        () => setPoweredByVisibility((prev) => ({ ...prev, logo3: true })),
        2000
      );
      setTimeout(() => {
        setPoweredByVisibility({
          text: false,
          logo1: false,
          logo2: false,
          logo3: false,
        });
      }, 4000);

      setTimeout(() => {
        setStage("end");
        onAnimationEnd();
      }, 5000);
    }
  }, [stage, onAnimationEnd, skipAnimation]);

  return (
    <MotionBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100%"
      w={"100%"}
    >
      {stage === "logo" && (
        <LogoPresentation visibleElements={logoVisibility} />
      )}
      {stage === "poweredBy" && (
        <PoweredByPresentation visibleElements={poweredByVisibility} />
      )}
    </MotionBox>
  );
};

export default OpeningScreenAnimation;
