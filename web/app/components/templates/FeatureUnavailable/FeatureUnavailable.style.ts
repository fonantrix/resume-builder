import styled, { css } from 'styled-components';
import { IFeatureUnavailableProps } from './types';

//To Do: chnage px to rem; change all color from theme
export default css<IFeatureUnavailableProps>`
    width: 20vw;
    margin-left: auto;
    margin-right: auto;
    color: rgb(255,94,89);
    position: relative;
    top: 35%;
    font-weight: 800;
`
