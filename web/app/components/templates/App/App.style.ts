import styled, { css, createGlobalStyle } from 'styled-components';

export default styled.div`
    background-color: ${props => props.theme.LIGHT_GREAY};
    height: 100vh;
    min-height: 100%;
    min-width: 100%;
`
const customMediaQuery = (maxWidth: number, minWidth?: number) =>
    `@media screen ${minWidth || `and (min-width: ${minWidth}px)`} and (max-width: ${maxWidth}px)`;

const media = {
    custom: customMediaQuery,
    desktop: customMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576),
};

export const GlobalStyle = createGlobalStyle`
    html {
        font-size: 1.2rem;
        font-family: 'Open Sans', Helvetica, sans-serif;
    }

    body {
        background-color: #fafafa;
    }
    
    ${media.custom(1024)} {
        html {
            font-size: 0.5rem;
        }
    } 

    ${media.custom(1440, 1281)}{
        html { 
            font-size: 0.85rem;
        }
    }

    ${media.custom(1280, 1025)}{
        html { 
            font-size: 0.7rem;
        }
    }
`;

