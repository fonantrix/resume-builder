import { IComponentTheme } from '../../../styles/theme/types';

export interface ISideBarProps {
    className?: any;
    list?: Array<INavigation>;
}

export interface IComponentSideBarProps extends ISideBarProps, IComponentTheme {

}

export interface INavigation {
    txt: string;
    txtColor?: string
    handler(): void; 
}