import { buttonTheme } from "./button";
import {
  BACKGROUND_BLUE,
  BLUE,
  BLUE_LIGHT,
  CLUBS,
  DIAMONDS,
  GREY_LINE,
  GREY_MEDIUM,
  HEARTS,
  NEON,
  NEON_GREEN,
  PASTEL_PINK,
  SPADES,
  VIOLET,
  VIOLET_LIGHT,
} from "./colors";
import { drawerTheme } from "./drawer.ts";
import { headingTheme } from "./heading";
import { inputTheme } from "./input";
import { menuTheme } from "./menu.ts";
import { modalTheme } from "./modal";
import { tableTheme } from "./table";
import { tabsTheme } from "./tabs.ts";
import { textTheme } from "./text";
import { tooltipTheme } from "./tooltip";

export default {
  colors: {
    blue: BLUE,
    blueLight: BLUE_LIGHT,
    greyLine: GREY_LINE,
    violet: VIOLET,
    neonGreen: NEON_GREEN,
    opaqueNeonGreen: "#2fcdd7",
    neonPink: VIOLET,
    lightViolet: VIOLET_LIGHT,
    limeGreen: "lime",
    darkGrey: "#04162d",
    greyMedium: GREY_MEDIUM,
    purple: "#9940aa",
    white: "white",
    pastelPink: PASTEL_PINK,
    backgroundBlue: BACKGROUND_BLUE,
    // suits - accessible through colors[Suits.CLUBS]
    1: CLUBS,
    2: DIAMONDS,
    3: HEARTS,
    4: SPADES,
    5: NEON,
    // suits - accessible through colors['CLUBS'] or 'CLUBS'
    CLUBS,
    DIAMONDS,
    HEARTS,
    SPADES,
    NEON,
  },
  styles: {
    global: {
      body: {
        background: "#000 none repeat scroll 0 0",
        margin: 0,
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
      },
    },
  },
  breakpoints: {
    base: "0em",    
    sm: "42em",   
    md: "78em",     
    lg: "90em",   
    xl: "125em",  
  },

  components: {
    Table: tableTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Modal: modalTheme,
    Tooltip: tooltipTheme,
    Heading: headingTheme,
    Text: textTheme,
    Menu: menuTheme,
    Tabs: tabsTheme,
    Drawer: drawerTheme,
  },
};
