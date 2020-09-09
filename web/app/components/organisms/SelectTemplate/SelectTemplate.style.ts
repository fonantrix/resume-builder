import styled, { css } from 'styled-components';
import { ISelectTemplateProps } from './types';

export default css<ISelectTemplateProps>``;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    >div {
        margin-left: 20px;
        margin-bottom: 20px;
    }
`