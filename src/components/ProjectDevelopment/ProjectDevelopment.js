if (global.IS_BROWSER) {
  require('./ProjectDevelopment.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import Slider from 'material-ui/Slider';

const stagesVersions = {};

stagesVersions.ru = [
  {
    month: 'Ноябрь',
    year: '2016',
    events: 'On Place открывает офис в Москве, счета в американских и азиатских банках. Формируем команду проекта.'

  },
  {
    month: 'Декабрь',
    year: '2016',
    events: 'Проводим анализ рынка. Разрабатываем инвестиционную платформу.'
  },
  {
    month: 'Март',
    year: '2017',
    events: 'Выпускаем бета-версию платформы On Place.'
  },
  {
    month: 'Март',
    year: '2017',
    events: 'Готовимся провести ICO: выставим доли проекта на ведущих мировых краудинвестинговых площадках.'
  },
  {
    month: 'Апрель',
    year: '2017',
    events: 'Приглашаем компании и инвесторов, регистрируем их в проекте.'
  },
  {
    month: 'Июнь',
    year: '2017',
    events: 'Запускаем первую версию On Place.'
  }
];

stagesVersions.en = [
  {
    month: 'November',
    year: '2016',
    events: 'Beginning OnPlace Inc.  (Opening office in Moscow, company' +
    ' registration in State of Delaware, opening bank account , and the team formation)'
  },
  {
    month: 'December',
    year: '2016',
    events: 'Analysis, and OnPlace platform development.'
  },
  {
    month: 'March',
    year: '2017',
    events: 'OnPlace platform beta-version presentation.'
  },
  {
    month: 'March',
    year: '2017',
    events: 'OnPlace Inc. is preparing to host the ICO, and to put out' +
    ' shares of the company on global crowdinvesting platform.'
  },
  {
    month: 'April',
    year: '2017',
    events: 'Registration — Investors, Existing companies, Startups.'
  },
  {
    month: 'June',
    year: '2017',
    events: 'Launch of the alpha version OnPlace Inc.'
  }
];

const titleVersions = {
  ru: 'Развитие проекта OnPlace',
  en: 'OnPlace project development'
};

export default class ProjectDevelopment extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    isMobile: Type.bool,
    lang: Type.string,
  };

  constructor(props) {
    super(props);

    this.onWindowResize = ::this.onWindowResize;

    this.state = {
      position: 0,
      leftMarginSlide: 300,
      sliderIsHidden: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);

    if (window.innerWidth < 1350) {
      this.setState({ leftMarginSlide: 600 });
    } else {
      this.setState({ leftMarginSlide: 300 });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    if (window.innerWidth < 1350) {
      this.setState({ leftMarginSlide: 600 });
    } else {
      this.setState({ leftMarginSlide: 300 });
    }
  }

  handleSlider = (event, value) => {
    this.setState({ position: value });
  };

  render() {
    const { lang } = this.props;
    const stages = stagesVersions[lang];
    const {
      position,
      leftMarginSlide,
      sliderIsHidden
    } = this.state;

    return (
      <div
        className={`c-projects-development-root ${ lang }`}
      >
        <div className="projects-development-inner" style={{ maxWidth: '71rem', margin: '0 auto' }}>
          <h2 className="g-main-page-title">
            {titleVersions[lang]}
          </h2>
          <div className="image-container image-container-1" style={{ left: `${ -position }px` }}>
            <div className="default-img">
              <img alt="/" src="/images/grey.svg" />
            </div>
            <div className="active-images">
              <img alt="/" src="/images/blue.svg" />
            </div>
            <div className="text-container">
              {
                stages.map((item, index) => (
                  <div className="container" key={index}>
                    <div className="title">{item.month} {item.year}</div>
                    <div className="text">{item.events}</div>
                  </div>
                ))
              }
            </div>
            <div className="blue-point"></div>
          </div>
        </div>
        <div className={`slider-container ${ sliderIsHidden ? 'not-visible' : '' }`}>
          <Slider
            min={0}
            max={leftMarginSlide}
            step={50}
            defaultValue={0}
            value={this.state.position}
            onChange={this.handleSlider}
          />
        </div>
      </div>
    );
  }
}
