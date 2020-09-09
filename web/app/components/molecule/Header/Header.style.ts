import styled, { css } from 'styled-components';
import { IComponentHeaderProps } from './types';

export default css<IComponentHeaderProps>`
    background: ${(props) => props.theme.BLACK} linear-gradient(135deg, #262626 0%, #4b4b4b 100%);
    height: 40px;
    width: 100%;
    position: fixed;
    z-index: 99;
    top: 0;
`;

export const ListWrapper = styled.div`
    position: relative;
    .list {
        display: none;
        position: absolute;
        right: 0;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        top: 40px;
        >span {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
    }

    .list-actv {
        display: block;
    }

    .disp {
        color: #fff;
        font-weight: 500;
        float: right;
        margin-right: 15px;
        margin-top: 5px;
    }
`

export const BgImage = css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: right;
    margin-right: 6px;
`;

export const NavigationLink = styled.div`
    margin-left: 100px;
    bottom: 8px;
    position: absolute;
    span {
        margin-right:15px;
        color: #fff;
        font-weight: 500;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`