import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { BLUE, VIOLET } from "./colors";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    _selected: {
      bg: "blue",
      border: "none",
      boxShadow: `0px 0px 12px 4px ${BLUE}`,
    },
    borderRadius: "7px",
    mx: 2,
    height: ["25px", "40px"],
    textTransform: "uppercase",
  },
  tablist: {
    border: "1px solid white",
    borderRadius: "18px",
    py: 2,
    px: 0.5,
    backgroundColor: "black",
  },
});

const secondaryStyle = definePartsStyle({
  tab: {
    _selected: {
      bg: "violet",
      border: "none",
      boxShadow: `0px 0px 12px 4px ${VIOLET}`,
    },
  },
});

const variants = {
  secondary: secondaryStyle,
};

export const tabsTheme = defineMultiStyleConfig({ baseStyle, variants });
