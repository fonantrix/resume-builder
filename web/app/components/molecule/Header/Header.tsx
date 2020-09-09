import * as React from 'react';
import styles, { BgImage, ListWrapper, NavigationLink } from './Header.style';
import injectStyles from '../../../utils/injectStyles';
import { IComponentHeaderProps, INavigation } from './types';
import { Helper } from '../../../utils/Helper';
import Endpoint from '../../../api/endpoint';
import BackgroundImage from '../../atoms/BackgroundImage';

const Header: React.FC<IComponentHeaderProps> = (props: IComponentHeaderProps) => {
    const { className, list, imageUrl, navList, displayName = "" } = props;

    const [isListActive, setValue] = React.useState<boolean>(false);

    const profileIconClick = () => {
        if (isListActive) {
            setValue(false);
        } else {
            setValue(true);
        }
    }

    return (
        <div className={className}>
            <NavigationLink>
                {
                    navList.map((item: INavigation, index: number) => {
                        return <span key={index} onClick={item.handler} style={{color: item.txtColor}}>{item.txt}</span>
                    })
                }
            </NavigationLink>
            <ListWrapper>
                <BackgroundImage onClick={profileIconClick} imageUrl={imageUrl || "https://s3-eu-west-1.amazonaws.com/avatars-kickresume-com/default-avatars/user.png"} inheritedStyles={BgImage} />
                <span className="disp">{ displayName }</span>
                <div className={`list ${isListActive ? 'list-actv' : ''}`}>
                    {
                        list.map((item: INavigation, index: number) => {
                            return <span key={index} onClick={item.handler}>{item.txt}</span>
                        })
                    }

                </div>
            </ListWrapper>
        </div>
    )
}

export default injectStyles(Header, styles)