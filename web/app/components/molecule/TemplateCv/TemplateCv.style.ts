import styled, { css } from 'styled-components';
import { ITemplateProps } from './types';

export default css<ITemplateProps>`
    position: relative;

    .overlay {
        display: none;
        position: absolute;
        top: 40%;
        left: 40%;
    }
`;

export const BgStyle = css`
    height: 20rem;
    &:hover {
        opacity: 0.5;
    }
    &:hover + .overlay {
        display: block;
        display: flex;
        flex-direction: column;
        >div {
            margin-bottom: 15px;
        }
    }
`

export const BtnSelect = css`
    &:hover + .overlay {
        display: block;
    }
`

export const Footer = styled.div`
    display: flex;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    border-top: none;
    justify-content: space-between;
    font-size: 15px;
    background-color: #fff;
`