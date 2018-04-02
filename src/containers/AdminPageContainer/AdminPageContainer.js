if (global.IS_BROWSER) {
  require('./AdminPageContainer.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import {
  AdminHome,
  AdminNavigation,
  InvestorRegistrationPopup
} from '../../components';

import { styles } from '../../commonData';

const dialogContentVersions = {
  ru: `Данный личный кабинет является примером функционала, который будет доступен инвесторам
после запуска альфа-версии площадки. Зарегистрируйся, чтобы одним из первых получить доступ к функционалу инвесторов.`,
  en: `This user account is an example illustrating features that will be available to the investors after the Alpha
version launch. Register now to be one of the first people to get access to the investor account.`
};

const closeVersions = {
  ru: 'Закрыть',
  en: 'Hide'
};

const signUpVersions = {
  ru: 'ЗАРЕГИСТРИРОВАТЬСЯ',
  en: 'SIGN UP'
};

export default class AdminPageContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    location: Type.object
  };
  
  static initialFetchData = [];
  
  constructor() {
    super();
  
    this.showDialog = ::this.showDialog;
    this.handleClose = ::this.handleClose;
    this.closeRegistrationPopup = ::this.closeRegistrationPopup;
    this.showRegistrationPopup = ::this.showRegistrationPopup;
    
    this.state = {
      dialogIsShowing: false,
      registrationPopupIsShowing: false
    };
  }
  
  handleClose() {
    this.setState({
      dialogIsShowing: false
    });
  }
  
  showDialog() {
    this.setState({
      dialogIsShowing: true
    });
  }
  
  showRegistrationPopup() {
    this.setState({
      dialogIsShowing: false,
      registrationPopupIsShowing: true
    });
  }
  
  closeRegistrationPopup() {
    this.setState({
      registrationPopupIsShowing: false
    });
  }
  
  /**
   * Renders 'MainPageContainer' component
   */
  render() {
    const lang = this.props.location.pathname === '/en/demo' ? 'en' : 'ru';

    const { dialogIsShowing, registrationPopupIsShowing } = this.state;
  
    const actions = [
      (<RaisedButton
        label={closeVersions[lang]}
        style={styles.buttonContainer}
        buttonStyle={styles.button}
        overlayStyle={styles.buttonOverlay}
        backgroundColor="#1e9df2"
        labelColor="#ffffff"
        onClick={this.handleClose}
      />),
      (<RaisedButton
        label={signUpVersions[lang]}
        style={styles.largeButtonContainer}
        buttonStyle={styles.button}
        overlayStyle={styles.buttonOverlay}
        backgroundColor="#1e9df2"
        labelColor="#ffffff"
        onClick={this.showRegistrationPopup}
      />)
    ];
    
    return (
      <div className="admin-page-root">
        <div className="admin-navigation-wrapper">
          <AdminNavigation
            lang={lang}
            showDialog={this.showDialog}
          />
        </div>
        <div className="admin-home-wrapper">
          <AdminHome
            lang={lang}
            showDialog={this.showDialog}
          />
        </div>
        <Dialog
          title=""
          actions={actions}
          modal={false}
          open={dialogIsShowing}
          actionsContainerStyle={styles.actionsContainer}
          contentStyle={{ maxWidth: 570 }}
          titleStyle={styles.dialogTitle}
          bodyStyle={styles.dialog}
          onRequestClose={this.handleClose}
        >
          {dialogContentVersions[lang]}
        </Dialog>
        {
          registrationPopupIsShowing &&
            <InvestorRegistrationPopup
              closeRegistration={this.closeRegistrationPopup}
              lang={lang}
            />
        }
      </div>
    );
  }
}
