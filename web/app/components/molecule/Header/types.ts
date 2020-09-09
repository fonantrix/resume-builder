import { IComponentTheme } from '../../../styles/theme/types';

export interface IHeaderProps {
    className?: any;
    list?: Array<INavigation>;
    imageUrl?: string;
    navList: Array<INavigation>;
    displayName?: string;
}

export interface IComponentHeaderProps extends IHeaderProps, IComponentTheme {

}

export interface INavigation {
    txt: string;
    txtColor?: string;
    handler(): void; 
}