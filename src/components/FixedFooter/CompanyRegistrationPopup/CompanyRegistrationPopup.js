if (global.IS_BROWSER) {
  require('./CompanyRegistrationPopup.styl'); // eslint-disable-line global-require
}

import 'isomorphic-fetch';

import _concat from 'lodash/concat';
import _pickBy from 'lodash/pickBy';
import _forOwn from 'lodash/forOwn';
import _size from 'lodash/size';
import _mapKeys from 'lodash/mapKeys';
import _filter from 'lodash/filter';
import _partialRight from 'lodash/partialRight';
import _partial from 'lodash/partial';
import _includes from 'lodash/includes';
import _difference from 'lodash/difference';

import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import SvgIcon from 'material-ui/svg-icons/editor/publish';
import SvgAttachment from 'material-ui/svg-icons/file/attachment';
import SvgClear from 'material-ui/svg-icons/content/clear';

import CircularProgress from 'material-ui/CircularProgress';

import Dropzone from 'react-dropzone';

import { apiCall, googleAnalytics } from '../../../utils';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

const styles = {
  floatingLabelStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  floatingLabelSmallFontStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  floatingLabelFocusStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: 12,
    letterSpacing: 0.2,
    color: '#1e9df2',
  },
  inputStyle: {
    fontFamily: 'Museo Sans Cyrl',
    fontSize: 15,
    lineHeight: 1.6,
    letterSpacing: 0.2
  },
  underlineFocusStyle: {
    borderColor: '#1e9df2',
  },
};

const stylesIcon = {
  color: '#1e9df2',
  width: 24,
};
const stylesAttachment = {
  width: '100%',
  height: '1.5em',
  color: '#000',
  opacity: 0.5,
};
const clearMedia = {
  color: '#ff5916',
  width: 14,
};
const clearDocument = {
  color: '#000',
  opacity: 0.42,
  width: 20
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
  ru: 'Зарегистрироваться как компания',
  en: 'Sign up as a company'
};

const subtitleVersions = {
  ru: 'Заявка на получение инвестиций',
  en: 'Application for Receiving Investment'
};

const descriptionVersions = {
  ru: `Сайт находится в разработке,
    но  вы уже сейчас можете подать заявку на свой проект.
    Мы рассмотрим вашу заявку и сообщим о начале работы сайта.`,
  en: `The web site is under construction, but you can already apply for your project. We will consider your application
    and let you know about the start of the launch of the site.`
};

const nameVersions = {
  ru: 'Название проекта',
  en: 'Project name'
};

const projectDescriptionVersions = {
  ru: 'Краткое описание сути бизнеса',
  en: 'Brief description of the essence of business'
};

const targetVersions = {
  ru: 'Цель поиска инвестиций',
  en: 'The purpose of the investment search'
};

const conditionVersions = {
  ru: 'Текущее состояние бизнеса',
  en: 'The current business situation'
};

const numberOfEmployeesVersions = {
  ru: 'Количество сотрудников',
  en: 'The number of employees'
};

const phoneVersions = {
  ru: 'Телефон',
  en: 'Phone'
};

const addressVersions = {
  ru: 'Адрес',
  en: 'Address'
};

const sendVersions = {
  ru: 'ОТПРАВИТЬ ЗАЯВКУ',
  en: 'SEND A REQUEST'
};

const photoVersions = {
  ru: 'Фото',
  en: 'Photo'
};

const videoVersions = {
  ru: 'Видео',
  en: 'Video'
};

const downloadVersions = {
  ru: 'Загрузить',
  en: 'Upload'
};

const paymentVersions = {
  ru: 'График выплат',
  en: 'Payments Schedule'
};

const documentsVersions = {
  ru: 'Документы',
  en: 'Documentation'
};

const videoPlaceholderVersions = {
  ru: 'Ссылка на Youtube/Vimeo',
  en: 'Link to Youtube/Vimeo'
};

const videoInputMessage = {
  ru: 'Добавьте ссылки (через запятую) на Youtube/Vimeo',
  en: 'Add links (comma separated) to Youtube/Vimeo'
};

const incorrectLinkMessage = {
  ru: 'Ссылка некорректна. Проверьте',
  en: 'Link are incorrect. Check out it'
};

const fullNameVersions = {
  ru: 'Имя и фамилия',
  en: 'Full name'
};

const docsMimeTypes = [
  'application/*',
  'text/*',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.ms-powerpoint',
];

/* eslint-disable no-useless-escape, max-len */
const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexForPhone = /^[0-9\+][0-9 ()]*/;

// - Supported YouTube URL formats:
//   - http://www.youtube.com/watch?v=My2FRPA3Gf8
//   - http://youtu.be/My2FRPA3Gf8
//   - https://youtube.googleapis.com/v/My2FRPA3Gf8
// - Supported Vimeo URL formats:
//   - http://vimeo.com/25451551
//   - http://player.vimeo.com/video/25451551
const regexForYoutubeUrl = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
const regexForVimeoUrl = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
const regexForMatchingYoutubeAndVimeoIds = /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;
/* eslint-enable no-useless-escape, max-len*/

export default class CompanyRegistrationPopup extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    closeRegistration: Type.func,
    lang: Type.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      snackbarMessage: '',
      requestIsExecuted: false,
      mediaFiles: [],
      videos: [],
      videoThumbnails: [],
      paymentFiles: [],
      documentsFiles: [],
      videoInput: '',
      videoInputErrorMessage: null,
      full_name: '',
      email: '',
      emailErrorMessage: null,
      phone: '',
      name: '',
      description: '',
      target: '',
      currentState: '',
      employees_count: '',
      address: '',
      progressRequest: false,
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  onDrop(fileType, files) {
    const filesArray = this.state[fileType];

    this.setState({ [fileType]: _concat(filesArray, files) });
  }

  onFocusToTextField(fieldType) {
    this.setState({
      [`${ fieldType }ErrorMessage`]: null
    });
  }

  getVideoThumbnailAsync(url) {
    const videoObj = this.parseVideoUrl(url);

    if (videoObj.type === 'youtube') {
      return `http://img.youtube.com/vi/${ videoObj.id }/0.jpg`;
    } else if (videoObj.type === 'vimeo') {
      return apiCall({
        method: 'GET',
        host: 'http://vimeo.com',
        path: `/api/v2/video/${ videoObj.id }.json`
      }).then(response => response.data[0].thumbnail_small);
    }
  }

  handleSnackbarClose() {
    this.setState({
      snackbarOpen: false,
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

  removeVideo(index) {
    this.removeElementFromArrayStateProperty(index, 'videos');
    this.removeElementFromArrayStateProperty(index, 'videoThumbnails');
  }

  resetForm(stateProperties) {
    this.setState({
      mediaFiles: [],
      paymentFiles: [],
      documentsFiles: [],
      videoThumbnails: [],
      videos: [],
      videoInput: '',
      full_name: '',
      email: '',
      phone: '',
      name: '',
      description: '',
      target: '',
      currentState: '',
      employees_count: '',
      address: '',
      progressRequest: false,
      ...(stateProperties || null)
    });
  }

  sendRequest() {
    const { lang } = this.props;

    const formFieldsName = [
      'name',
      'full_name',
      'phone',
      'email',
      'description',
      'target',
      'currentState',
      'address',
      'email',
      'employees_count',
      'videos'
    ];

    const {
      email,
      mediaFiles,
      paymentFiles,
      documentsFiles
    } = this.state;

    if (!email || !regexForEmail.test(email)) {
      this.setState({ emailErrorMessage: emailMessages });

      return;
    }

    // GA event after point of no return
    this._googleEvent();
    this.setState({ progressRequest: true });

    const allFiles = _concat(
      mediaFiles,
      paymentFiles,
      documentsFiles
    );

    const textFieldsQuery = _pickBy(this.state, (value, key) => (_includes(formFieldsName, key) && !!value));

    if (allFiles.length) {
      const data = new FormData();

      _forOwn(allFiles, file => {
        data.append('file', file);
      });

      this.setState({
        requestIsExecuted: true
      });

      apiCall({
        method: 'POST',
        path: '/upload',
        data
      }).then(({ data: { response } }) => {
        const filesArray = response;

        const filesQuery = _pickBy({
          photos: filesArray.splice(0, mediaFiles.length),
          payment_schedules: filesArray.splice(0, paymentFiles.length),
          documents: filesArray.splice(0, documentsFiles.length)
        }, _size);

        this.companyRegistrationRequest({
          ...textFieldsQuery,
          ...filesQuery
        });
      }).catch(() => {
        this.setState({
          requestIsExecuted: false,
          snackbarOpen: true,
          snackbarMessage: errorMessages[lang],
          progressRequest: false,
        });
      });
    } else {
      this.companyRegistrationRequest(textFieldsQuery);
    }
  }

  companyRegistrationRequest(data) {
    const { lang } = this.props;

    apiCall({
      method: 'POST',
      path: '/companies',
      data
    }).then(() => {
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

  uploadVideo() {
    const userVideoLinks = this.state.videoInput.replace(/(\r\n|\n|\r)/gm, '').split(',');
    const { videos } = this.state;

    if (!userVideoLinks.join(',').length) {
      this.setState({ videoInputErrorMessage: videoInputMessage });

      return;
    }

    const filteredVideoLinks = _filter(userVideoLinks, videoUrl => (
      regexForYoutubeUrl.test(videoUrl) || regexForVimeoUrl.test(videoUrl))
    );

    if (!filteredVideoLinks.length) {
      this.setState({ videoInputErrorMessage: incorrectLinkMessage });

      return;
    }

    Promise.all(filteredVideoLinks.map(videoUrl => this.getVideoThumbnailAsync(videoUrl)))
      .then(videoThumbnails => (
        this.setState({
          videoInput: '',
          videos: _concat(videos, _difference(filteredVideoLinks, videos)).map(video => ({ url: video })),
          videoThumbnails
        })
      ));
  }

  parseVideoUrl(url) {
    let type = null;
    url.match(regexForMatchingYoutubeAndVimeoIds);

    if (RegExp.$3.indexOf('youtu') > -1) {
      type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
      type = 'vimeo';
    }

    return {
      type,
      id: RegExp.$6
    };
  }

  removeElementFromArrayStateProperty(index, stateProperty) {
    const filesArray = this.state[stateProperty];

    filesArray.splice(index, 1);

    this.setState({
      [stateProperty]: filesArray
    });
  }

  _googleEvent() {
    googleAnalytics({
      category: 'Investors',
      action: 'Project\'s request sent',
    });
  }

  /**
   * Renders 'CompanyRegistrationPopup' component
   */
  render() {
    const {
      closeRegistration,
      lang
    } = this.props;

    const {
      snackbarOpen,
      snackbarMessage,
      requestIsExecuted,
      mediaFiles,
      paymentFiles,
      documentsFiles,
      videoInput,
      videoInputErrorMessage,
      videoThumbnails,
      full_name,
      email,
      emailErrorMessage,
      phone,
      name,
      description,
      target,
      currentState,
      employees_count,
      address
    } = this.state;

    return (
      <div className="registration-company-root">
        <div
          className="registration-close"
          onClick={closeRegistration}
        >
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="registration-top">
          <div className="registration-wrapper">
            <img className="logo" alt="" src="/images/logo-white.svg" />
            <span className="registration-title">
              {titleVersions[lang]}
            </span>
          </div>
        </div>
        <div className="registration-wrapper">
          <div className="left-side">
            <span className="registration-title">
              {subtitleVersions[lang]}
            </span>
            <p className="registration-text">
              {descriptionVersions[lang]}
            </p>
            <TextField
              style={{ width: '100%' }}
              className="registration-input-big"
              floatingLabelText={nameVersions[lang]}
              value={name}
              onChange={_partialRight(::this.updateFormField, 'name')}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <TextField
              className="registration-input-big"
              floatingLabelText={projectDescriptionVersions[lang]}
              value={description}
              onChange={_partialRight(::this.updateFormField, 'description')}
              multiLine={true}
              rows={1}
              style={{ width: '100%' }}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <TextField
              className="registration-input-big"
              floatingLabelText={targetVersions[lang]}
              value={target}
              onChange={_partialRight(::this.updateFormField, 'target')}
              multiLine={true}
              rows={1}
              style={{ width: '100%' }}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <TextField
              floatingLabelText={conditionVersions[lang]}
              value={currentState}
              onChange={_partialRight(::this.updateFormField, 'currentState')}
              style={{ width: '100%' }}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              inputStyle={styles.inputStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <div className="registration-contact">
              <TextField
                floatingLabelText={addressVersions[lang]}
                value={address}
                onChange={_partialRight(::this.updateFormField, 'address')}
                fullWidth={true}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
              <TextField
                floatingLabelText={numberOfEmployeesVersions[lang]}
                value={employees_count}
                onChange={_partialRight(::this.updateFormField, 'employees_count')}
                style={{ width: '43%' }}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
              <TextField
                floatingLabelText={fullNameVersions[lang]}
                value={full_name}
                onChange={_partialRight(::this.updateFormField, 'full_name')}
                style={{ width: '43%' }}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
              <TextField
                floatingLabelText="E-mail"
                value={email}
                onChange={_partialRight(::this.updateFormField, 'email')}
                style={{ width: '43%' }}
                errorText={emailErrorMessage && emailErrorMessage[lang]}
                onFocus={this.onFocusToTextField.bind(this, 'email')}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
              <TextField
                floatingLabelText={phoneVersions[lang]}
                value={phone}
                onChange={_partialRight(::this.updateFormField, 'phone')}
                style={{ width: '43%' }}
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
            </div>
            <button
              className="registration-send"
              onClick={::this.sendRequest}
            >
              {
                this.state.progressRequest ? <CircularProgress size={14} /> : <span>{sendVersions[lang]}</span>
              }
            </button>
          </div>
          <div className="middle-side">
            <div className="divider"></div>
          </div>
          <div className="right-side">
            <div className="upload-container">
              <span className="upload-container-title registration-media">
                {photoVersions[lang]}
              </span>
              <div className="media">
                {
                  mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="media-block"
                    >
                      <div className="media-clear">
                        <img alt={file.name} src={file.preview} />
                        <SvgClear
                          style={clearMedia}
                          className="close-icon"
                          onClick={_partial(::this.removeElementFromArrayStateProperty, index, 'mediaFiles')}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
              <span className="registration-download">
                <Dropzone
                  style={dropzoneInlineStyles}
                  accept="image/*"
                  maxSize={50000000}
                  onDrop={this.onDrop.bind(this, 'mediaFiles')}
                >
                  <div className="download-icon">
                    <SvgIcon style={stylesIcon} />
                  </div>
                  <span className="download-text">
                    {downloadVersions[lang]}
                  </span>
                </Dropzone>
              </span>
            </div>
            <div className="upload-container video">
              <span className="upload-container-title registration-media">
                {videoVersions[lang]}
              </span>
              <div className="media">
                {
                  videoThumbnails.map((thumbnailUrl, index) => (
                    <div
                      key={index}
                      className="media-block"
                    >
                      <div className="media-clear">
                        <img alt="/" src={thumbnailUrl} />
                        <SvgClear
                          style={clearMedia}
                          className="close-icon"
                          onClick={_partial(::this.removeVideo, index)}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
              <TextField
                className="registration-input-big"
                floatingLabelText={videoPlaceholderVersions[lang]}
                value={videoInput}
                multiLine={true}
                errorText={videoInputErrorMessage && videoInputErrorMessage[lang]}
                onChange={_partialRight(::this.updateFormField, 'videoInput')}
                onFocus={this.onFocusToTextField.bind(this, 'videoInput')}
                style={{ width: '100%', marginBottom: '1em' }}
                floatingLabelStyle={styles.floatingLabelSmallFontStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
              />
              <span
                className="registration-download"
                onClick={::this.uploadVideo}
              >
                <div className="download-icon">
                  <SvgIcon style={stylesIcon} />
                </div>
                <span className="download-text">
                  {downloadVersions[lang]}
                </span>
              </span>
            </div>
            <div className="upload-container">
              <span className="upload-container-title">
                {paymentVersions[lang]}
              </span>
              {
                paymentFiles.map((file, index) => (
                  <div key={index} >
                    <div className="document">
                      <div className="document-img">
                        <SvgAttachment className="image" style={stylesAttachment} />
                      </div>
                      <span className="document-text">{file.name}</span>
                      <div className="document-clear">
                        <SvgClear
                          style={clearDocument}
                          onClick={_partial(::this.removeElementFromArrayStateProperty, index, 'paymentFiles')}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
              <span className="registration-download">
                <Dropzone
                  style={dropzoneInlineStyles}
                  accept={docsMimeTypes}
                  maxSize={50000000}
                  onDrop={this.onDrop.bind(this, 'paymentFiles')}
                >
                  <div className="download-icon">
                    <SvgIcon style={stylesIcon} />
                  </div>
                  <span className="download-text">
                    {downloadVersions[lang]}
                  </span>
                </Dropzone>
              </span>
            </div>
            <div className="upload-container">
              <span className="upload-container-title registration-documents">
                {documentsVersions[lang]}
              </span>
              {
                documentsFiles.map((file, index) => (
                  <div key={index} >
                    <div className="document">
                      <div className="document-img">
                        <SvgAttachment className="image" style={stylesAttachment} />
                      </div>
                      <span className="document-text">{file.name}</span>
                      <div className="document-clear">
                        <SvgClear
                          style={clearDocument}
                          onClick={_partial(::this.removeElementFromArrayStateProperty, index, 'documentsFiles')}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className="registration-download">
                <Dropzone
                  style={dropzoneInlineStyles}
                  accept={docsMimeTypes}
                  maxSize={50000000}
                  onDrop={this.onDrop.bind(this, 'documentsFiles')}
                >
                  <div className="download-icon">
                    <SvgIcon style={stylesIcon} />
                  </div>
                  <span className="download-text">
                    {downloadVersions[lang]}
                  </span>
                </Dropzone>
              </div>
            </div>
            <button
              className={`registration-send ${ requestIsExecuted ? 'inactive' : '' }`}
              onClick={::this.sendRequest}
            >
              <span>
                {sendVersions[lang]}
              </span>
            </button>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          message={snackbarMessage}
          autoHideDuration={3000}
          onRequestClose={::this.handleSnackbarClose}
        />
      </div>
    );
  }
}

const dropzoneInlineStyles = {
  width: 'auto',
  cursor: 'pointer',
  display: 'inline-block',
  height: 'auto'
};
