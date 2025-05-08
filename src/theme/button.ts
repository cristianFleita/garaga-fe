import { BLUE, NEON_GREEN, VIOLET} from "./colors";

import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const transparent = defineStyle({
  backgroundColor: "transparent !important",
  color: "white",
});

const solid = defineStyle({
  backgroundColor: "blue !important",
  color: "white",
  boxShadow: {
    base: `0px 0px 10px 6px ${BLUE}`,
    md: `0px 0px 20px 12px ${BLUE}`,
  },
});

const secondarySolid = defineStyle({
  backgroundColor: "violet",
  boxShadow: {
    base: `0px 0px 10px 6px ${VIOLET}`,
    md: `0px 0px 20px 12px ${VIOLET}`,
  },
});

const discardSecondarySolid = defineStyle({
  backgroundColor: "violet",
  boxShadow: {
    base: `0px 0px 20px 3px ${VIOLET}`,
    md: `0px 0px 30px 6px ${VIOLET}`,
  },
  "&:hover": {
    borderColor: `white`
  },
});

const outline = defineStyle({
  backgroundColor: "rgba(0,0,0,0.5)",
  border: `3px solid ${NEON_GREEN} !important`,
  color: "neonGreen",
  "&:hover": {
    backgroundColor: "black",
    border: `3px solid ${NEON_GREEN}`,
    boxShadow: `0px 0px 5px 0px ${NEON_GREEN}`,
  },
});

const ghost = defineStyle({
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  "&:hover": {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  },
});

const defaultOutline = defineStyle({
  backgroundColor: "transparent",
  border: `1px solid rgb(255,255,255) !important`,
  color: "rgb(255,255,255)",
});

const outlinePrimaryGlow = defineStyle({
  backgroundColor: "transparent",
  border: "1px solid white",
  color: "white",
  boxShadow: `0px 0px 12px 0px white`,
  _hover: {
    backgroundColor: `${BLUE}`,
    color: "white",
    borderColor: "transparent",
    boxShadow: {
      base: `0px 0px 10px 6px ${BLUE}`,
      md: `0px 0px 20px 12px ${BLUE}`,
    }, 
  },
  _active: {
    backgroundColor: `${BLUE}`,
    border: "1px solid white",
    color: "white",
    boxShadow: {
      base: `0px 0px 10px 6px ${BLUE}`,
      md: `0px 0px 20px 12px ${BLUE}`,
    },
  },
  _disabled: {
    border: "1px solid white !important",
    boxShadow: "none !important",
  }
});

const outlineSecondaryGlow = defineStyle({
  backgroundColor: "transparent",
  border: "1px solid white",
  color: "white",
  boxShadow: `0px 0px 12px 0px white`,
  _hover: {
    backgroundColor: `${VIOLET}`,
    color: "white",
    borderColor: "transparent",
    boxShadow: {
      base: `0px 0px 10px 6px ${VIOLET}`,
      md: `0px 0px 20px 12px ${VIOLET}`,
    }, 
  },
  _active: {
    backgroundColor: `${VIOLET}`,
    border: "1px solid white",
    color: "white",
    boxShadow: {
      base: `0px 0px 10px 6px ${VIOLET}`,
      md: `0px 0px 20px 12px ${VIOLET}`,
    },
    _disabled: {
      border: "1px solid white !important",
      boxShadow: "none !important",
    }
  },
});

const outlineSecondaryGlowActive = defineStyle({
  backgroundColor: `${VIOLET}`,
  border: "1px solid transparent",
  boxShadow: {
    base: `0px 0px 10px 6px ${VIOLET}`,
    md: `0px 0px 20px 12px ${VIOLET}`,
  }, 
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    fontFamily: "Orbitron",
    borderRadius: 15,
    px: 7,
    py: 0,
    backgroundColor: "blue",
    color: "white",
    textTransform: "uppercase",
  },
  variants: { ghost, solid, outline, secondarySolid, defaultOutline, discardSecondarySolid, outlineSecondaryGlow,
     outlinePrimaryGlow, outlineSecondaryGlowActive, transparent },
  sizes: {
    sm: {
      fontSize: { base: 8, md: 11 },
      px: { base: 3, md: 7 },
      borderRadius: 7,
    },
    md: {
      fontSize: { base: 12, md: 19 },
      px: { base: 3, md: 7 },
      py: { base: 0, md: "10px !important" },
      fontWeight: 500,
    },
    lg: {
      fontSize: 40,
      px: 90,
      py: 2,
      borderRadius: 0,
      textShadow: `0 0 20px ${NEON_GREEN}`,
      boxShadow: `0px 0px 15px 0px ${NEON_GREEN} `,
    },
  },
});
