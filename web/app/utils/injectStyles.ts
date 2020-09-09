import styled, { ThemedStyledProps } from 'styled-components';
import { ReactPureComponentType, CssReturnType } from '../global/types';
import { IStyled } from '../styles/theme/types';

export default (Component: ReactPureComponentType | React.FC, styles: CssReturnType) => styled<IStyled | ThemedStyledProps<any, any>>(Component)`
    ${styles};
    ${props => props.inheritedStyles};
`
