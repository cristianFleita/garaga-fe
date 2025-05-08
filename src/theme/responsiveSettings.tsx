import { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { throttle } from "lodash";

export const useResponsiveValues = () => {
  const [cardScale, setCardScale] = useState<number>(1);
  const [isCardScaleCalculated, setIsCardScaleCalculated] = useState(false);

  const baseScales: { [key: string]: number } = {
    "375:667": 2.5, //iphone SE
    "207:448": 2.6, //iphone XR
    "195:422": 2.6, //iphone 12 pro
    "215:466": 2.6, //iphone 14 pro max
    "412:915": 2.6, //pixel 7, samsung galaxy s20 ultra
    "18:37": 2.6, //samsung galaxy s8+
    "3:4": 2, //ipad mini, surface duo
    "4:3": 1, //ipad mini, surface duo (horizontal)
    "41:59": 2.2, //ipad air
    "59:41": 1.2, //ipad air (horizontal)
    "512:683": 2.2, //ipad pro
    "683:512": 1.3, //ipad pro (horizontal)
    "2:3": 2.2, //surface pro
    "3:2": 1.3, //surface pro (horizontal)
    "1280:853": 1.2, //asus zenbook fold (horizontal)
    "128:75": 0.7, //nest hub
    "8:5": 1.2, //nest hub max
    "640:289": 1.5, //desktop 4k
    "369:289": 1.6, //desktop 1476x1156
    "720:703": 1.5, //laptop L
    "256:289": 2.3, //laptop
    "16:9": 1.5, //laptop dami
    "16:10": 1.4, //steam deck
    "384:371": 1.4, //tablet
    "126:65": 1.4, //m3 pro chrome
    "756:407": 1.4, //m3 pro safari
  };

  const getBaseScaleForAspectRatio = (
    ratio: number,
    scales: { [key: string]: number }
  ): number => {
    for (const key in scales) {
      const [width, height] = key.split(":").map(Number);
      const aspectRatio = width / height;

      if (aspectRatio === ratio) return scales[key];
    }

    // If no exact match is found, find the closest match by comparing absolute differences
    let closestKey = "";
    let closestDiff = Infinity;

    Object.keys(scales).forEach((key) => {
      const [width, height] = key.split(":").map(Number);
      const aspectRatio = width / height;

      const diff = Math.abs(aspectRatio - ratio);

      if (diff < closestDiff) {
        closestDiff = diff;
        closestKey = key;
      }
    });

    // If no closest match, return 1
    return scales[closestKey] || 1;
  };

  useEffect(() => {
    const handleResize = throttle(() => {
      const newAspectRatio = window.innerWidth / window.innerHeight;
      const baseScale = getBaseScaleForAspectRatio(newAspectRatio, baseScales);

      const viewportScale = Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
      );

      const calculatedCardScale = baseScale * viewportScale;
      setCardScale(calculatedCardScale);

      setIsCardScaleCalculated(true);
    }, 200);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  return { cardScale, isSmallScreen, isCardScaleCalculated };
};
