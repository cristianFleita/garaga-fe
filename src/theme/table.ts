import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { VIOLET_LIGHT } from "./colors.tsx";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const leaderboard = definePartsStyle({
  td: {
    color: "white",
    fontFamily: "Orbitron",
    textAlign: "center",
    fontSize: ["9px", "sm", "sm", "md"],
  },
  thead: {
    tr: {
      borderBottomWidth: 0,
    },
    td: {
      color: "white",
      borderBottomWidth: 0,
      px: [1, 2, 2, 4],
      py: [0, 2, 2, 2],
    },
  },
  tbody: {
    tr: {
      "&:nth-of-type(odd)": {
        "th, td": {
          borderBottomWidth: 0,
        },
        td: {
          color: VIOLET_LIGHT,
          fontSize: ["10px", "sm", "sm", "md"],
          px: [1, 1, 4],
          py: [1, 2, 2, 2],
        },
      },
      "&:nth-of-type(even)": {
        "th, td": {
          borderBottomWidth: 0,
        },
        td: {
          color: VIOLET_LIGHT,
          fontSize: ["10px", "sm", "sm", "md"],
          px: [1, 1, 4],
          py: [1, 2, 2, 2],
        },
      },
    },
  },
});

const store = definePartsStyle({
  td: {
    color: "white",
    fontFamily: "Orbitron",
    p: 0,
    fontSize: [8, 10, 12, 14],
  },
  thead: {
    tr: {
      borderBottomWidth: 0,
    },
    td: {
      borderBottomWidth: 0,
      py: 2,
    },
  },
  tbody: {
    tr: {
      fontSize: ["sm", "sm", "sm", "lg"],
      fontWeight: "bold",
      px: [1, 1, 4],
    },
    td: {
      py: [1],
    },
  },
});

const storeMobile = definePartsStyle({
  td: {
    color: "white",
    fontFamily: "Orbitron",
    p: 0,
    fontSize: 8,
  },
  thead: {
    tr: {
      py: 0,
      borderBottomWidth: 0,
    },
    td: {
      borderBottomWidth: 0,
      py: 0,
    },
  },
  tbody: {
    tr: {
      fontSize: "xs",
      fontWeight: "bold",
      p: 0,
      borderBottomWidth: 0,
      whiteSpace: "initial",
    },
    td: {
      p: 0,
      py: 2,
      px: 1,
      width: "auto",
      textAlign: "center",
    },
  },
});

const baseStyle = definePartsStyle({
  table: {
    fontFamily: "Orbitron",
  },
});

const deck = definePartsStyle({
  table: {
    fontFamily: "Orbitron",
    fontSize: ["7px", "7px", "sm", "md"],
  },
  th: {
    fontFamily: "Orbitron",
    fontSize: ["7px", "7px", "sm", "md"],
    verticalAlign: "bottom", 
  },
  td: {
    fontFamily: "Orbitron",
    fontSize: ["7px", "7px", "sm", "md"], 
    p: 0,
    m: 0,
    verticalAlign: "bottom",
  },
  thead: {
    td: {
      verticalAlign: "bottom", 
    },
  },
});


export const tableTheme = defineMultiStyleConfig({
  baseStyle: baseStyle,
  variants: {
    leaderboard: leaderboard,
    store: store,
    "store-mobile": storeMobile,
    deck: deck,
  },
});
