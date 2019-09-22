import { font } from "xdemic/lib/styles/globalStyles";
interface IndexSignature {
  [index: string]: any;
}

interface TextDefaultThemeMapTypes extends IndexSignature {}

export const COLORS = {
  // xDemic figma colors
  BRAND: "#75A4FF",
  BRAND_LIGHT: "#DCE8FF",
  BLACK: "#4F4F4F",
  DARK_GREY: "rgba(79, 79, 79, 0.5)",
  GREY: "#F8F8F8",
  WHITE: "#FFFFFF",
  NOTIFICATION: "#FD5E00",

  // Previous colors

  // BLACK: "#000000",
  // WHITE: "#FFFFFF",
  CHARCOAL: "#333333",
  LIGHTEST_GREY: "#EFEEF3",
  LIGHT_GREY: "#BBBBBB",
  MEDIUM_GREY: "#CCCCCC",
  // DARK_GREY: "#333333",
  CORN_FLOWER_BLUE: "#75A4FF",
  CRIMSON_RED: "#D63A59",
  WASHED_GREEN: "#3DCF8A",
  SUNNY_ORANGE: "#E89835",
  TRANSPARENT: "transparent"
};

/**
 * Not implemented yet. A funtion so we can provide a theme color dictionary and generate the object below
 */
const ThemeColor = (
  brand: string,
  text: string,
  background: string,
  divider: string,
  accessories: string,
  underlay: string,
  button: string,
  buttonTextFilled: string,
  buttonTextOutlined: string,
  buttonTextClear: string
) => {
  return {
    brand,
    text,
    background,
    divider,
    accessories,
    underlay,
    button,
    buttonText: {
      filled: buttonTextFilled,
      outlined: buttonTextOutlined,
      clear: buttonTextClear
    }
  };
};

/**
 * Base DefaultTheme file
 */
const DefaultTheme: Kancha.ThemeStatic = {
  text: {
    lineHeights: {
      body: 22,
      h1: 21,
      h2: 16,
      h3: 16,
      caption1: 13,
      caption2: 13
    },
    sizes: {
      hero: 28,
      h1: 20,
      h2: 15,
      h3: 14,
      h4: 18,
      h5: 16,
      h6: 14,
      caption1: 12,
      caption2: 12,
      subTitle: 12,
      listItem: 18,
      listItemRight: 18,
      listItemNote: 15,
      sectionHeader: 14,
      summary: 18,
      body: 16,
      button: 18,
      navButton: 20
    }
  },
  colors: {
    /**
     * Not sure of this is harder to read than just showing the keys?
     */
    primary: ThemeColor(
      COLORS.BRAND,
      COLORS.CHARCOAL,
      COLORS.WHITE,
      COLORS.MEDIUM_GREY,
      COLORS.LIGHT_GREY,
      COLORS.MEDIUM_GREY,
      COLORS.BRAND,
      COLORS.WHITE,
      COLORS.BRAND,
      COLORS.BRAND
    ),
    // primary: {
    //   brand: COLORS.BRAND,
    //   text: COLORS.CHARCOAL,
    //   background: COLORS.WHITE,
    //   divider: COLORS.MEDIUM_GREY,
    //   accessories: COLORS.LIGHT_GREY,
    //   underlay: COLORS.MEDIUM_GREY,
    //   button: COLORS.BRAND,
    //   buttonText: {
    //     filled: COLORS.WHITE,
    //     outlined: COLORS.BRAND,
    //     clear: COLORS.BRAND,
    //   },
    // },
    secondary: {
      brand: COLORS.LIGHT_GREY,
      text: COLORS.LIGHT_GREY,
      background: COLORS.LIGHTEST_GREY,
      divider: COLORS.MEDIUM_GREY,
      accessories: COLORS.MEDIUM_GREY,
      underlay: COLORS.MEDIUM_GREY,
      button: COLORS.MEDIUM_GREY,
      buttonText: {
        filled: COLORS.WHITE,
        outlined: COLORS.MEDIUM_GREY,
        clear: COLORS.MEDIUM_GREY
      }
    },
    tertiary: {
      brand: COLORS.LIGHT_GREY,
      text: COLORS.LIGHT_GREY,
      background: COLORS.LIGHT_GREY,
      divider: COLORS.LIGHT_GREY,
      accessories: COLORS.LIGHT_GREY,
      underlay: COLORS.LIGHT_GREY,
      button: COLORS.LIGHT_GREY,
      buttonText: {
        filled: COLORS.LIGHT_GREY,
        outlined: COLORS.LIGHT_GREY,
        clear: COLORS.LIGHT_GREY
      }
    },
    accent: {
      brand: COLORS.SUNNY_ORANGE,
      text: COLORS.SUNNY_ORANGE,
      background: COLORS.SUNNY_ORANGE,
      divider: COLORS.SUNNY_ORANGE,
      accessories: COLORS.SUNNY_ORANGE,
      underlay: COLORS.SUNNY_ORANGE,
      button: COLORS.SUNNY_ORANGE,
      buttonText: {
        filled: COLORS.WHITE,
        outlined: COLORS.SUNNY_ORANGE,
        clear: COLORS.SUNNY_ORANGE
      }
    },
    warning: {
      brand: COLORS.CRIMSON_RED,
      text: COLORS.CRIMSON_RED,
      background: COLORS.CRIMSON_RED,
      divider: COLORS.CRIMSON_RED,
      accessories: COLORS.CRIMSON_RED,
      underlay: COLORS.CRIMSON_RED,
      button: COLORS.CRIMSON_RED,
      buttonText: {
        filled: COLORS.WHITE,
        outlined: COLORS.CRIMSON_RED,
        clear: COLORS.CRIMSON_RED
      }
    },
    confirm: {
      brand: COLORS.WASHED_GREEN,
      text: COLORS.WASHED_GREEN,
      background: COLORS.WASHED_GREEN,
      divider: COLORS.WASHED_GREEN,
      accessories: COLORS.WASHED_GREEN,
      underlay: COLORS.WASHED_GREEN,
      button: COLORS.WASHED_GREEN,
      buttonText: {
        filled: COLORS.WHITE,
        outlined: COLORS.WASHED_GREEN,
        clear: COLORS.WASHED_GREEN
      }
    },
    inverted: {
      brand: COLORS.TRANSPARENT,
      text: COLORS.WHITE,
      background: COLORS.TRANSPARENT,
      divider: COLORS.WHITE,
      accessories: COLORS.WHITE,
      underlay: COLORS.TRANSPARENT,
      button: COLORS.WHITE,
      buttonText: {
        filled: COLORS.BRAND,
        outlined: COLORS.WHITE,
        clear: COLORS.WHITE
      }
    },
    custom: {
      brand: COLORS.TRANSPARENT,
      text: COLORS.WHITE,
      background: COLORS.TRANSPARENT,
      divider: COLORS.TRANSPARENT,
      accessories: COLORS.TRANSPARENT,
      underlay: COLORS.TRANSPARENT,
      button: COLORS.WHITE,
      buttonText: {
        filled: COLORS.BRAND,
        outlined: COLORS.WHITE,
        clear: COLORS.WHITE
      }
    }
  },
  spacing: {
    default4: 4,
    default: 8,
    default16: 16,
    default32: 32,
    default64: 64,
    section: 20
  },
  roundedCorners: {
    buttons: 8,
    cards: 5,
    textInputs: 8
  },
  card: {
    borderSize: 8
  },
  navigation: {},
  avatarSize: {
    default: 40,
    defaultx: 60,
    defaultxx: 80,
    defaultxxx: 100
  }
};

/**
 * For RNN
 */
const NavigationThemeDefault = {
  largeTitle: false,
  navBarBackgroundColor: DefaultTheme.colors.primary.brand,
  navBarButtonColor: DefaultTheme.colors.primary.background,
  navBarTextColor: DefaultTheme.colors.primary.background
};

/**
 * Append nav theming
 */
const Theme = DefaultTheme;
Theme.navigation = NavigationThemeDefault;

/**
 * Temporary implementaion.
 * Refactor later to make more succint.
 */
const TextTypes: Kancha.TextTypesStatic = {
  HERO: "hero",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  CAPTION1: "caption1",
  CAPTION2: "caption2",
  ListItem: "listItem",
  ListItemRight: "listItemRight",
  ListItemNote: "listItemNote",
  SubTitle: "subTitle",
  Body: "body",
  Button: "button",
  NavButton: "navButton",
  Summary: "summary",
  SectionHeader: "sectionHeader"
};

/**
 * Temporary implementaion. Refactor later to make more succint.
 * Just here to initially define each font style.
 * Padding size todo and more .... This will be merged with the Text component once matured
 */

const TextThemeMap: TextDefaultThemeMapTypes = {
  h1: {
    fontSize: DefaultTheme.text.sizes.h1,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text
  },
  h2: {
    fontSize: DefaultTheme.text.sizes.h2,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text
  },
  h3: {
    fontSize: DefaultTheme.text.sizes.h3,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text
  },
  h4: {
    fontSize: DefaultTheme.text.sizes.h4,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text
  },
  h5: {
    fontSize: DefaultTheme.text.sizes.h5,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text
  },
  subTitle: {
    fontSize: DefaultTheme.text.sizes.subTitle,
    fontFamily: font,
    color: DefaultTheme.colors.secondary.text
  },
  listItem: {
    fontSize: DefaultTheme.text.sizes.listItem,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text
  },
  listItemNote: {
    fontSize: DefaultTheme.text.sizes.listItemNote,
    fontFamily: font,
    color: DefaultTheme.colors.secondary.text
  },
  listItemRight: {
    fontSize: DefaultTheme.text.sizes.listItemRight,
    fontFamily: font,
    color: DefaultTheme.colors.secondary.text
  },
  summary: {
    fontSize: DefaultTheme.text.sizes.summary,
    fontFamily: font,
    color: DefaultTheme.colors.secondary.text
  },
  body: {
    fontSize: DefaultTheme.text.sizes.body,
    fontFamily: font,
    color: DefaultTheme.colors.primary.text,
    lineHeight: DefaultTheme.text.lineHeights.body
  },
  button: {
    fontSize: DefaultTheme.text.sizes.button,
    fontFamily: font
  },
  navButton: {
    fontSize: DefaultTheme.text.sizes.navButton,
    fontFamily: font
  },
  sectionHeader: {
    fontSize: DefaultTheme.text.sizes.sectionHeader,
    fontFamily: font,
    color: DefaultTheme.colors.secondary.text
  }
};

export { TextThemeMap, Theme, TextTypes };
