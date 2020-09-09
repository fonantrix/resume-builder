import { css } from 'styled-components';
import { IButtonComponentProps } from './types';

export default css<IButtonComponentProps>`
    align-self: center;
    button {
        border-radius: ${props => props.theme.BTN_BORDER_RADIUS};
        outline:none;
        text-transform: uppercase;
        padding: 0.5em 1em;
	}
    .btn--blue {
        background-color: ${props => props.theme.DARK_BLUE};
        border: solid 1px ${props => props.theme.DARK_BLUE};
        color: ${props => props.theme.WHITE};
    }
`;