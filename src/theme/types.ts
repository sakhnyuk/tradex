export type TypeTheme = 'dark' | 'light';

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface AppThemeOptions {
  useNextVariants: boolean;
  fontTableColor: React.CSSProperties['color'];
  hover: React.CSSProperties['color'];
  orderTextColor: React.CSSProperties['color'];
  active: React.CSSProperties['color'];
  exchangeButtonColor: React.CSSProperties['color'];
  exchangeButtonHoverColor: React.CSSProperties['color'];
  background: {
    topHeader: React.CSSProperties['color'];
    settings: React.CSSProperties['color'];
  };
  text: {
    reverse: React.CSSProperties['color'];
    headerFontColor: React.CSSProperties['color'];
  };
  iconButton: React.CSSProperties['color'];
  borderButton: React.CSSProperties['color'];
  redBacklight: React.CSSProperties['color'];
  greenBacklight: React.CSSProperties['color'];
  red: React.CSSProperties['color'];
  green: React.CSSProperties['color'];
  lightenRed: React.CSSProperties['color'];
  lightenGreen: React.CSSProperties['color'];
}
