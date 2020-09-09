import styled, { css } from 'styled-components';
import { IComponentSideBarProps } from './types';

export default css<IComponentSideBarProps>`
    height: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    overflow-x: hidden;
    padding-top: 80px;
    padding-right: 10px;
    border-right: 1px solid #e9e9e9;
    span {
        color: #000;
        font-weight: 500;
        margin-bottom: 28px;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
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
`