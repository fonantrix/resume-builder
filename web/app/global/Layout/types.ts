import { IComponentTheme, IComponentProps } from "../../styles/theme/types";
import { IUser } from "../../components/templates/Profile/types";

export interface ILayoutProps extends IComponentTheme, IComponentProps {
    loader: boolean;
    className: any;
    userData: IUser;
    children: React.ReactElement
}