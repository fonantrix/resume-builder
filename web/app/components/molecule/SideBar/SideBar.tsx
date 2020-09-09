import * as React from 'react';
import styles from './SideBar.style';
import injectStyles from '../../../utils/injectStyles';
import { IComponentSideBarProps, INavigation } from './types';
import BackgroundImage from '../../atoms/BackgroundImage';

const SideBar: React.FC<IComponentSideBarProps> = (props: IComponentSideBarProps) => {
    const { className, list } = props;

    return (
        <div className={className}>
            {
                list.map((item: INavigation, index: number) => {
                    return <span key={index} onClick={item.handler} style={{color: item.txtColor}}>{item.txt}</span>
                })
            }
        </div>
    )
}

export default injectStyles(SideBar, styles)