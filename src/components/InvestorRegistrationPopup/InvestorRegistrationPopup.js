if (global.IS_BROWSER) {
  require('./InvestorRegistrationPopup.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _mapKeys from 'lodash/mapKeys';
import _partialRight from 'lodash/partialRight';

import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import {
  apiCall,
  googleAnalytics
  } from '../../utils';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import CircularProgress from 'material-ui/CircularProgress';

/* eslint-disable max-len */
const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable max-len */

const regexForPhone = /^[0-9\+][0-9 ()]*/;

const styles = {
  floatingLabelStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: `${ 15 / 16 }rem`,
    letterSpacing: 0.2,
  },
  floatingLabelFocusStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: `${ 12 / 16 }rem`,
    letterSpacing: 0.2,
    color: '#1e9df2',
  },
  inputStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: `${ 15 / 16 }rem`,
    lineHeight: 1.6,
    letterSpacing: 0.2,
  },
  underlineFocusStyle: {
    borderColor: '#1e9df2',
  },
};

const emailMessages = {
  ru: 'Некорректный еmail',
  en: 'Incorrect email'
};

const successMessages = {
  ru: 'Регистрация успешна',
  en: 'Successful registration'
};

const errorMessages = {
  ru: 'Неудача. Попробуйте позже',
  en: 'Failed. Try again later'
};

const titleVersions = {
  ru: 'Зарегистрироваться как инвестор',
  en: 'Sign up as an investor'
};

const attachmentsVersions = {
  ru: 'Вложения от 10 000 Р',
  en: 'Investments starting from 10 000 RUB'
};

const descriptionsVersions = {
  ru: 'Оставьте свой адрес электронной почты и узнайте первым о запуске проекта OnPlace',
  en: 'Leave your email address and be the first one to get to know about the launch of the OnPlace project'
};

const phoneVersions = {
  ru: 'Телефон',
  en: 'Phone'
};

const signUpVersions = {
  ru: 'ЗАРЕГИСТРИРОВАТЬСЯ',
  en: 'SIGN UP'
};

const fullNameVersions = {
  ru: 'Имя и фамилия',
  en: 'Full name'
};

export default class InvestorRegistrationPopup extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string,
    closeRegistration: Type.func
  };

  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      snackbarMessage: '',
      fullName: '',
      email: '',
      emailErrorMessage: null,
      phone: '',
      progressRequest: false,
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  onFocusToTextField(fieldType) {
    this.setState({
      [`${ fieldType }ErrorMessage`]: null
    });
  }

  resetForm(stateProperties) {
    this.setState({
      fullName: '',
      email: '',
      phone: '',
      progressRequest: false,
      ...(stateProperties || null)
    });
  }

  /**
   * Renders 'InvestorRegistrationPopup' component
   */

  sendRequest() {
    const { email, phone, fullName } = this.state;
    const { lang } = this.props;

    if (!email || !regexForEmail.test(email)) {
      this.setState({ emailErrorMessage: emailMessages });

      return;
    }

    // GA event after point of no return
    this._googleEvent();
    this.setState({ progressRequest: true });

    apiCall({
      method: 'POST',
      path: '/investors',
      data: JSON.stringify({
        email,
        phone,
        full_name: fullName,
      })
    })
      .then(() => {
        this.resetForm({
          snackbarOpen: true,
          snackbarMessage: successMessages[lang],
        });
      })
      .catch(({ data: { error } }) => {
        if (error) {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: _mapKeys(error, (value, key) => (key === 'ru' ? 'ru' : 'en'))[lang],
            progressRequest: false
          });
        } else {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: errorMessages[lang],
            progressRequest: false
          });
        }
      });
  }

  updateFormField(event, value, stateProperty) {
    if (stateProperty === 'phone' && value.length && !regexForPhone.test(value)) {
      return;
    }

    this.setState({
      [stateProperty]: value
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  _googleEvent() {
    googleAnalytics({
      category: 'Investors',
      action: 'Investor registered',
    });
  }

  render() {
    const {
      closeRegistration,
      lang
    } = this.props;

    const {
      email,
      emailErrorMessage,
      phone,
      fullName,
      snackbarOpen,
      snackbarMessage
    } = this.state;

    return (
      <div className="popup-registration-root">
        <div
          className="registration-close"
          onClick={closeRegistration}
        >
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="registration-wrapper">
          <img className="logo" alt="/" src="/images/on-place-logo.svg" />
          <span className="registration-title">
            {titleVersions[lang]}
          </span>
          <span className="attachments">
            {attachmentsVersions[lang]}
          </span>
          <span className="registration-text">
            {descriptionsVersions[lang]}
          </span>
          <div className="inputs-wrapper">
            <TextField
              floatingLabelText={fullNameVersions[lang]}
              value={fullName}
              onChange={_partialRight(::this.updateFormField, 'fullName')}
              style={{ width: '43%' }}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
          </div>
          <div className="inputs-wrapper">
            <TextField
              className="registration-input"
              style={{ width: '(288/rfs)rem' }}
              floatingLabelText="E-mail"
              onFocus={this.onFocusToTextField.bind(this, 'email')}
              errorText={emailErrorMessage && emailErrorMessage[lang]}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              onChange={_partialRight(::this.updateFormField, 'email')}
              value={email}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <TextField
              className="registration-input"
              style={{ width: '(288/rfs)rem' }}
              floatingLabelText={phoneVersions[lang]}
              inputStyle={styles.inputStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              onChange={_partialRight(::this.updateFormField, 'phone')}
              value={phone}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
          </div>
          <button
            className="registration-button"
            onClick={::this.sendRequest}
          >
            {
              this.state.progressRequest ? <CircularProgress size={14} /> : <span>{signUpVersions[lang]}</span>
            }
          </button>
        </div>
        <Snackbar
          open={snackbarOpen}
          message={snackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}
