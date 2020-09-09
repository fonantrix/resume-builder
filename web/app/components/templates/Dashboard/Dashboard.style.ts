import styled, { css } from 'styled-components';
import { IDashboardProps } from './types';

//To Do: chnage px to rem; change all color from theme
export default css<IDashboardProps>`
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    display: flex;
    flex-direction: column;
    h3 {
        color: white;
        text-align: center;
        border: none;
        background: ${(props) => props.theme.BLACK} linear-gradient(135deg, #262626 0%, #4b4b4b 100%);
        position: relative;
        height: 40px;
        border-radius: 7px 7px 0 0;
    }
    >div {
        width: 100%;
    }
`
