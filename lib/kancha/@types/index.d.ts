/**
 * Namespace decalaration for Global Kancha Types
 */

declare module "react-native-keyboard-aware-scrollview" {
  var KeyboardAwareScrollView: any;
  export { KeyboardAwareScrollView };
}

declare namespace Kancha {
  export interface NavigationScreen {
    componentId: string;
  }

  export interface TextTypesStatic {
    HERO: "hero";
    H1: "h1";
    H2: "h2";
    H3: "h3";
    H4: "h4";
    H5: "h5";
    H6: "h6";
    CAPTION1: "caption1";
    CAPTION2: "caption2";
    PARAGRAPH: "paragraph";
    ListItem: "listItem";
    ListItemRight: "listItemRight";
    ListItemNote: "listItemNote";
    SubTitle: "subTitle";
    Body: "body";
    Button: "button";
    NavButton: "navButton";
    Summary: "summary";
    SectionHeader: "sectionHeader";
  }

  export interface BrandTypeStatic {
    Primary: "primary";
    Secondary: "secondary";
    Tertiary: "tertiary";
    Accent: "accent";
    Warning?: "warning";
    Confirm?: "confirm";
    Custom?: "custom";
  }

  export type BrandPropOptions =
    | "primary"
    | "secondary"
    | "tertiary"
    | "accent"
    | "warning"
    | "confirm"
    | "custom"
    | undefined;
  export type BlockPropsOptions = "outlined" | "filled" | "clear" | undefined;

  export interface ScreenConfigsStatic {
    SafeScroll: "safeScroll";
    SafeNoScroll: "safeNoScroll";
    Scroll: "scroll";
    NoScroll: "noScroll";
    NoSafeNoScroll: "noSafeNoScroll";
  }

  export interface BlocksStatic {
    Outlined: "outlined";
    Filled: "filled";
    Clear: "clear";
    Rounded: "rounded";
  }

  export interface ThemeStatic {
    text: {
      lineHeights: {
        body: number;
        h1: number;
        h2: number;
        h3: number;
        caption1: number;
        caption2: number;
      };
      sizes: {
        hero: number;
        h1: number;
        h2: number;
        h3: number;
        h4: number;
        h5: number;
        h6: number;
        paragraph: number;
        caption1: number;
        caption2: number;
        subTitle: number;
        listItem: number;
        listItemRight: number;
        listItemNote: number;
        sectionHeader: number;
        summary: number;
        body: number;
        button: number;
        navButton: number;
      };
      border: {
        default: number;
        active: number;
      };
    };
    colors: {
      [index: string]: {
        brand: string;
        text: string;
        background: string;
        divider: string;
        accessories: string;
        underlay: string;
        button: string;
        buttonText: {
          filled: string;
          outlined: string;
          clear: string;
        };
      };
    };
    spacing: {
      default4: number;
      default: number;
      default16: number;
      default32: number;
      default40: number;
      default48: number;
      default56: number;
      default64: number;
      section: number;
    };
    roundedCorners: {
      buttons: number;
      cards: number;
      textInputs: number;
    };
    card: {
      borderSize: number;
      defaultBorderColor: string;
      defaultShadowColor: string;
      defaultShadowRadius: number;
      defaultShadowOpacity: number;
      defaultElevation: number;
      defaultShadowOffset: {
        w: number;
        h: number;
      };
      selectedBorderColor: string;
      selectedShadowColor: string;
      selectedShadowRadius: number;
      selectedShadowOpacity: number;
      selectedElevation: number;
      selectedShadowOffset: {
        w: number;
        h: number;
      };
    };
    button: {
      borderSize: number;
      defaultBorderColor: string;
      defaultShadowColor: string;
      defaultShadowRadius: number;
      defaultShadowOpacity: number;
      defaultElevation: number;
      defaultShadowOffset: {
        w: number;
        h: number;
      };
      selectedBorderColor: string;
      selectedShadowColor: string;
      selectedShadowRadius: number;
      selectedShadowOpacity: number;
      selectedElevation: number;
      selectedShadowOffset: {
        w: number;
        h: number;
      };
    };
    navigation: any;
    avatarSize: {
      default: number;
      defaultx: number;
      defaultxx: number;
      defaultxxx: number;
    };
  }
}
