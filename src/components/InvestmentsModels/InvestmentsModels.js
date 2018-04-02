/* ToDo -> delete*/
/* eslint-disable */

if (global.IS_BROWSER) {
  require('./InvestmentsModels.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _throttle from 'lodash/throttle';
import _partial from 'lodash/partial';

const titleVersions = {
  ru: 'Модели инвестирования',
  en: 'Investment models'
};

const descriptionVersions = {
  ru: 'Показывают, что получает инвестор за вложение:',
  en: 'Investment models show what an investor receives in return.'
};

const leftSchemeVersions = {
  ru: '/images/scheme_1_ru',
  en: '/images/scheme_1_eng'
};

// const rightSchemeVersions = {
//   ru: '/images/scheme_2.svg',
//   en: '/images/scheme_2_eng.svg'
// };

const startupsDialogTitle = {
  ru: 'Стартап',
  en: 'Startups'
};

const startupsDialogContent = {
  ru: `Компания, созданная для поиска воспроизводимой и масштабируемой бизнес-модели. Воспроизводимость — это
   возможность  многократно продать полученное решение. Масштабируемость — возможность существенного роста проекта.`,
  en: `The company established to find reproducible and scalable business model. Reproducibility is the ability to 
  repeatedly sell the existing solution. Scalability is the ability for significant growth.`
};

const obDialogTitle = {
  ru: 'Действующий бизнес',
  en: 'Operating business'
};

const obDialogContent = {
  ru: 'Действующий объект малого и среднего бизнеса, ведущий стабильную хозяйственную деятельность.',
  en: 'Small and medium-sized operating companies with stable economic activity.'
};

export default class InvestmentsModels extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string,
    showDialog: Type.func,
    setMediaQueryId: Type.func,
    mediaQueryId: Type.string
  };

  renderScheme(src) {
    if (this.props.mediaQueryId === 'small') {
      return (
        <img className="scheme-image" src={`${ src }_sm.svg`} alt="Модели инвестирования схема 1" />
      );
    }

    if (this.props.mediaQueryId === 'medium') {
      return (
        <img className="scheme-image" src={`${ src }_md.svg`} alt="Модели инвестирования схема 1" />
      );
    }

    if (this.props.mediaQueryId === 'big') {
      return (
        <img className="scheme-image" src={`${ src }_bg.svg`} alt="Модели инвестирования схема 1" />
      );
    }
  }

  componentDidMount() {
    this.props.setMediaQueryId();
    addEventListener('resize', _throttle(this.props.setMediaQueryId, 100));
  }

  /**
   * Renders 'InvestmentsModels' component
   */
  render() {
    const { lang, showDialog } = this.props;

    return (
      <div className="c-investments-model-root">
        <h2 className="title">
          {titleVersions[lang]}
        </h2>
        <div className="description">
          {descriptionVersions[lang]}
        </div>
        <div className="models-list">
          <div
            className="scheme-container"
          >
            {this.renderScheme(leftSchemeVersions[lang])}
            <div className="business"
                 onClick={_partial(showDialog, obDialogTitle[lang], obDialogContent[lang])}
            ></div>
            <div className="startups"
             onClick={_partial(showDialog, startupsDialogTitle[lang], startupsDialogContent[lang])}
            ></div>
            <div className="startups-bg"></div>
          </div>
        </div>
      </div>
    );
  }
}
