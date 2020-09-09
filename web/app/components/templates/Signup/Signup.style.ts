import styled, { css } from 'styled-components';
import { ISignupProps } from './types';

//To Do: chnage px to rem; change all color from theme
export default css<ISignupProps>`
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    display: flex;
    flex-direction: column;
    h3 {
        color: white;
        text-align: center;
        border: none;
        background: ${(props: ISignupProps) => props.theme.BLACK} linear-gradient(135deg, #262626 0%, #4b4b4b 100%);
        position: relative;
        height: 40px;
        border-radius: 7px 7px 0 0;
    }
    >div {
        width: 100%;
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

    input[type=submit] {
        border-radius: 40px;
        height: 40px;
        box-shadow: none;
        transition: background 0.2s ease-in, box-shadow 0.2s ease-in;
        color: #4461e0;
        background: transparent;
        border-color: #4461e0
        font-family: 'Open Sans', Helvetica, sans-serif;
        text-transform: uppercase;
        font-size: 1.3rem;
        min-width: 100px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
        font-weight: 600;
    }

`
