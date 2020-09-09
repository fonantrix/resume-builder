import styled, { css } from 'styled-components';
import { IDropdownProps } from './types';

export default css<IDropdownProps>`
    position: relative;
    width: 90%;
    .lst-wrpr {
        position: absolute;
        width: 100%;
        margin: 0;
        padding: 0;
        list-style-type: none;
        background: white;
        box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.5);
        z-index: 999;
        max-height: 300px;
        overflow-y: auto;
        font-size: .875rem;
        li{
            padding: .5rem .4rem;
        }
    }

    .lbl--wrpr {
        
        cursor: pointer;
            .arrow{
                position: absolute;
                top: 0px;
                right: 0px;
            }
    }
`;