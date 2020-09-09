import styled, { css } from 'styled-components';
import { IFillCvProps } from './types';

//To Do: chnage px to rem; change all color from theme
export default css<IFillCvProps>`
    max-height: 100vh;
    overflow-y: auto;
    margin-top: 20px;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    align-items: center
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
    div:first-child {
        margin-top: 30px;
    }

    input {
        height: 40px;
        line-height: 38px;
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
        background-color: #eeeeee;
        z-index: 1;
        padding: 0 8px;
        border: 1px solid #c2c2c2;
        border-radius: 10px;
        box-shadow: none;
        margin-bottom: 10px;
    }
`

export const EducationForm = css`
    margin-top: 20px;
`;