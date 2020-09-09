import * as React from 'react';
import injectStyles from '../../../utils/injectStyles';
import styles, { LoaderDiv, OverlayDiv } from './Loader.style';
import { ILoaderProps } from './type';

const Loader: React.FC<ILoaderProps> = (props: ILoaderProps) => {
    return(
        <>
            <OverlayDiv />
            <LoaderDiv />
        </>
    )
}

export default injectStyles(Loader, styles);