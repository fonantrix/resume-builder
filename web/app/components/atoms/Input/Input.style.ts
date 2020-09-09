import styled, { css } from 'styled-components';
import { IInputProps } from './types';

export default css<IInputProps>`
    position: relative;
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    input {
        width: 100%;
        border: none;
        border-radius: 0;
    }

    span {
        font-size: 0.8rem;
        color: red;
    }
`;