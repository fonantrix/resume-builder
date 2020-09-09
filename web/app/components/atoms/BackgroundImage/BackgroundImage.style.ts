import styled, { css } from 'styled-components';
import { IBackgroundImgProps } from './types';

export default css<IBackgroundImgProps>`
    
`;

export const ImageDiv: any = styled.div<IBackgroundImgProps>`
    background-image: url('${props => props.imageUrl }');
    min-width: 0.3em;
    min-height: 0.3em;
    background-repeat: no-repeat;
    height: 300px;
    background-size: 100% 100%;
`