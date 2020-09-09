import * as React from 'react';
import injectStyles from '../../../utils/injectStyles';
import styles, { ImageDiv } from './BackgroundImage.style';
import { IBackgroundImgProps } from './types';

const BackgroundImage: React.FC<IBackgroundImgProps> = (props: IBackgroundImgProps) => {
    const { className, imageUrl } = props;

    return (
        <div className={className}>
            <ImageDiv {...props}/>
        </div>
    )
}

export default injectStyles(BackgroundImage, styles);