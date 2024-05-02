import { createBox, createText, createTheme } from '@shopify/restyle';
import { colors } from './colors';
import { textVariants } from './text-variants';

export const theme = createTheme({
  breakpoints: {},
  colors: colors,
  textVariants: textVariants,
  spacing: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '10': ' 40px',
  },
  borderRadii: {
    rounded: 4,
    roundedXl: 8,
    rounded2Xl: 16,
  },
});

export type Theme = typeof theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
