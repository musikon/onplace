if (global.IS_BROWSER) {
  require('./FixedFooter.styl'); // eslint-disable-line global-require
}

import InvestorRegistrationPopup from '../InvestorRegistrationPopup/InvestorRegistrationPopup';
import CompanyRegistrationPopup from './CompanyRegistrationPopup/CompanyRegistrationPopup';
import ContentAdd from 'material-ui/svg-icons/communication/vpn-key';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { googleAnalytics } from '../../utils';

const companyRegisterVersions = {
  ru: 'ЗАРЕГИСТРИРОВАТЬСЯ КАК КОМПАНИЯ',
  en: 'Sign up as a company'
};

const investorRegisterVersions = {
  ru: 'ЗАРЕГИСТРИРОВАТЬСЯ КАК ИНВЕСТОР',
  en: 'Sign up as an investor'
};

const styleButtonRegistrationIcon = {
  color: '#fff',
  marginTop: 16,
  width: 24,
  height: 24,
};

export default class FixedFooter extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string
  };

  constructor(props) {
    super(props);

    this.state = {
      openRegistrationAsCompany: false,
      openRegistrationAsInvestor: false,
      open: false,
      closeWindow: false
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleRequestClose);
  }

  onClickRegistrationAsInvestor() {
    this.setState({
      openRegistrationAsInvestor: true
    });
  }

  onCloseRegistrationAsInvestor() {
    this.setState({
      openRegistrationAsInvestor: false
    });
  }

  onClickRegistrationAsCompany() {
    this.setState({
      openRegistrationAsCompany: true
    });
  }

  onCloseRegistrationAsCompany() {
    this.setState({
      openRegistrationAsCompany: false
    });
  }

  _googleEventInvestor() {
    googleAnalytics({
      category: 'Investors',
      action: 'Investor form was shown',
    });
  }

  _googleEventCompany() {
    googleAnalytics({
      category: 'Investors',
      action: 'Projects form was shown',
    });
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    if (this.state.open) {
      this.setState({ open: false });
    } else {
      document.addEventListener('click', this.handleRequestClose);
      this.setState({ open: true });
    }
  };

  handleRequestClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
      document.removeEventListener('click', this.handleRequestClose);
    } else {
      this.setState({ open: true });
    }
  };
  /**
   * Renders 'FixedFooter' component
   */
  render() {
    const { lang } = this.props;
    const { open } = this.state;

    return (
      <div className="c-fixed-footer-root">
        <div
          className={`button-registration ${ open ? 'open' : '' }`}
          onClick={this.handleTouchTap}
        >
          <div className="menu-items">
            <div
              className="item"
              onClick={
                () => {
                  ::this.onClickRegistrationAsInvestor();
                  ::this._googleEventInvestor();
                  this.handleRequestClose();
                }
              }
            >
              <span>{investorRegisterVersions[lang]}</span>
            </div>
            <div
              className="item"
              onClick={() => {
                ::this.onClickRegistrationAsCompany();
                ::this._googleEventCompany();
                this.handleRequestClose();
              }
              }
            >
              <span>{companyRegisterVersions[lang]}</span>
            </div>
          </div>
          {
            open ? '' : <ContentAdd style={styleButtonRegistrationIcon} />
          }
        </div>
        {
          this.state.openRegistrationAsInvestor &&
            <div>
              <InvestorRegistrationPopup
                closeRegistration={::this.onCloseRegistrationAsInvestor}
                lang={lang}
              />
            </div>
        }
        {
          this.state.openRegistrationAsCompany &&
            <div>
              <CompanyRegistrationPopup
                closeRegistration={::this.onCloseRegistrationAsCompany}
                lang={lang}
              />
            </div>
        }
      </div>
    );
  }
}
