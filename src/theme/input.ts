import { YELLOW, GREEN, BROWN_LIGHT, GREEN_DARK } from "./colors";
import { defineStyleConfig } from "@chakra-ui/react";

const baseStyle = {
  field: {
    fontFamily: "Orbitron",
    borderRadius: 15,
  },
};

const solid = {
  field: {
    fontSize: "20px",
    py: 4,
    px: 4,
    bg: "white",
    color: `${GREEN_DARK}`,
    fontWeight: 900,
    WebkitTextStroke: "0.5px currentColor",
    boxShadow: {
      base: `0px 0px 4px 2px ${BROWN_LIGHT}`,
      md: `0px 0px 6px 4px ${BROWN_LIGHT}`,
    },
    _placeholder: {
      fontFamily: "Orbitron",
      color: `${GREEN}`,
      letterSpacing: ".15rem",
      opacity: 0.5,
    },
  },
};

export const inputTheme = defineStyleConfig({
  baseStyle,
  variants: {
    "solid": solid,
  },
  defaultProps: {
    variant: "solid",
  },
});
