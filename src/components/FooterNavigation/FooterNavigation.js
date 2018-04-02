if (global.IS_BROWSER) {
  require('./FooterNavigation.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type
} from 'react';

const textVersions = {
  ru: {
    howItWorks: 'Как это работает',
    agreement: 'Пользовательское соглашение',
    questions: 'Вопросы и ответы'
  },
  en: {
    howItWorks: 'How it works',
    agreement: 'Terms of use',
    questions: 'Questions and answers'
  }
};

export default class FooterNavigation extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string
  };

  /**
   * Renders 'FooterNavigation' component
   */
  render() {
    const {
      lang
    } = this.props;

    return (
      <div className="c-footer-navigation-root">
        <div className="footer-navigation-inner">
          <div className="footer-navigation-items-container">
            <div className="footer-navigation-item-wrapper">
              <a href="http://ya.ru" className="footer-navigation-item">
                <div className="icon-container">
                  <img
                    src="/images/footer-navigation/gear.svg"
                    alt="как это работает"
                  />
                </div>
                <div className="text">
                  {textVersions[lang].howItWorks}
                </div>
              </a>
            </div>
            <div className="footer-navigation-item-wrapper">
              <a href="http://ya.ru" className="footer-navigation-item">
                <div className="icon-container">
                  <img
                    src="/images/footer-navigation/list.svg"
                    alt="пользовательское соглашение"
                  />
                </div>
                <div className="text">
                  {textVersions[lang].agreement}
                </div>
              </a>
            </div>
            <div className="footer-navigation-item-wrapper">
              <a href="http://ya.ru" className="footer-navigation-item">
                <div className="icon-container">
                  <img
                    src="/images/footer-navigation/question-mark.svg"
                    alt="вопросы и ответы"
                  />
                </div>
                <div className="text">
                  {textVersions[lang].questions}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
