import styled, {css} from 'styled-components';
import { ILoaderProps } from './type';

export default css<ILoaderProps>``

export const LoaderDiv = styled.div`
    background-image: url('static/images/loader.gif');
    display: block;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    position: absolute;
    background-size: 100% 100%;
    height: 6.25rem;
    width: 6.25rem;
    z-index: 9999;
`;

export const OverlayDiv = styled.div`
    display: block;
    width: 100vw;
    opacity: 0.7;
    background: rgba(0, 0, 0, 0.69);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;