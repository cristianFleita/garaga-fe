import { drawerAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { isMobile } from "react-device-detect";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: "blackAlpha.500",
  },
  dialog: {
    borderRadius: "0",
    color: "white",
    bg: "#031c24",
    marginTop: isMobile ? "5vh" : "20vh",
    width: "70%",
    maxWidth: "1100px",
  },
});

const fullscreen = definePartsStyle({
  overlay: {
    bg: "rgba(0, 0, 0, .5)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
  },
  dialog: {
    w: "100vw",
    maxW: "100vw",
    h: "100vh",
    borderRadius: "0",
    margin: 0,
    bg: "rgba(0, 0, 0, .5)",
  },
  closeButton: {
    border: 0,
    _hover: {
      border: "none",
      outline: "none",
    },
    _focus: {
      border: "none",
      outline: "none",
    },
    _active: {
      border: "none",
    },
  },
});

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    fullscreen,
  },
});
