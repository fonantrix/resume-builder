import colors from './colors';
import typography from './typography';
import { ITheme } from './types';

const theme: ITheme= {
  ...colors,
  ...typography,
};

export default theme;
