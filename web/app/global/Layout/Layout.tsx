
import * as React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import styles, { ChildContainer } from './Layout.style';
import injectStyles from '../../utils/injectStyles';
import { AppStore, AppDispatch } from '../types';
import { ILayoutProps } from './types';
import Loader from '../../components/atoms/Loader';
import Header from '../../components/molecule/Header';
import { IHeaderProps } from '../../components/molecule/Header/types';
import { historyRouter } from '../../dynamicStore/enhancer';
import { Helper } from '../../utils/Helper';
import Endpoint from '../../api/endpoint';
import SideBar from '../../components/molecule/SideBar';
import { ISideBarProps } from '../../components/molecule/SideBar/types';
import Colors from '../../styles/theme/colors';

class Layout extends React.PureComponent<ILayoutProps> {

  componentDidMount() {
    const { userData } = this.props;
    if (!userData.userID && !this.routesToAvoid()) {
      historyRouter.push("/");
    }
  }

  routesToAvoid = (): boolean => {
    const path = window.location.pathname;
    const pathArray: Array<string> = ["/", "/register"];
    return pathArray.includes(path);
  }

  signOutHandler = async () => {
    Helper.removeStorageData("userData");
    window.location.pathname = "/";
  }

  getDisplayColor = (url: string) => window.location.pathname === url ? Colors.RED : ''; 

  navigationHandler = (url?: string) => url ? () => historyRouter.push(url): () => {}; 

  render() {
    const { className, children, loader, userData } = this.props;
    const HeaderProps: IHeaderProps = { list: [{ txt: 'Profile', "handler": () => { historyRouter.push("/profile") } }, { txt: 'Sign Out', "handler": this.signOutHandler }], imageUrl: userData.photoURL ? `${Endpoint.static.FIRE_STORE_URL}${Helper.encodeURIComponent(userData.photoURL)}?${Endpoint.static.BUCKET_QUERY_PARAM}` : "", navList: [{ txt: 'Dashboard', "handler": this.navigationHandler("/dashboard") , txtColor: this.getDisplayColor("/dashboard")}, { txt: 'My Cv', "handler": this.navigationHandler("/fill-in") , txtColor: this.getDisplayColor("/fill-in")}, { txt: 'Video', "handler": this.navigationHandler("/under-dev") , txtColor: this.getDisplayColor("/under-dev")}, { txt: 'Docs', "handler": this.navigationHandler("/under-dev") , txtColor: this.getDisplayColor("/under-dev")}], displayName: userData.displayName }

    const SideBarProps: ISideBarProps = { list: [{ txt: 'Select Your Template', "handler":this.navigationHandler("/dashboard"), txtColor: this.getDisplayColor("/dashboard") }, { txt: 'Fill Your Cv', "handler": this.navigationHandler("/fill-in"), txtColor: this.getDisplayColor("/fill-in") }] }

    return (
      <div className={className}>
        {
          !this.routesToAvoid() &&
          <>
            <Header {...HeaderProps} />
            <SideBar {...SideBarProps} />
          </>
        }
        <ChildContainer>
          {children}
        </ChildContainer>
        {
          loader && <Loader />
        }
      </div>
    );
  }
}

const mapStateToProps = (store: AppStore) => ({
  loader: store.global ? store.global.loader || false : false,
  userData: Helper.get(store, 'global.userData', {}),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(injectStyles(Layout, styles));

