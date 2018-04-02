if (global.IS_BROWSER) {
  require('./HowItWorks.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import RaisedButton from 'material-ui/RaisedButton';

/* eslint-disable max-len */
const simpleStepsVersions = {};

simpleStepsVersions.ru = [
  'Найдите проект для инвестирования. Опирайтесь на экспертную оценку On Place.',
  'Вложите от 1 000 <span class="g-currency">;</span> до 20 000 000 <span class="g-currency">;</span> переводом с карты или со счета.',
  'Отслеживайте эффективность вложений в личном кабинете.'
];

simpleStepsVersions.en = [
  'Find ideal project to invest in. Evaluation by OnPlace expert team will help you make the right choice.',
  'Invest from 1000 to 20 000 000 rubles in any project using your debit card or direct bank transfer.',
  'Track the effectiveness of your investments with regular reports and statistics.'
];

const stepVersions = {
  ru: 'Шаг',
  en: 'Step'
};

const companyStepsVersions = {};

companyStepsVersions.ru = [
  'Зарегистрируйтесь в On Place и подайте заявку на инвестирование.',
  'Пройдите проверку аудиторами On Place. Ваш проект опубликуют на сайте.',
  'Следите за активностью на странице проекта. При необходимости отвечайте на вопросы инвесторов и предоставляйте дополнительную информацию.',
  'Получайте предложения на сайте или по почте. Одобряйте заявки на включение инвесторов в долю компании.'
];

companyStepsVersions.en = [
  'Submit the application for receiving investments.',
  `After checking the data, your project will appear in the window. If you are looking for up to 3 million RUR , the
  OnPlace team will review your business plan and will contact you to discuss the details.`,
  'Follow the page of your project. Be prepared to answer questions and provide additional information',
  `Expect the proposals on your project page and notifications by email. Approve investor request to be included
    in company shareholder`
];

const investorStepsVersions = {};

investorStepsVersions.ru = [
  'Пополните свой счет в личном кабинете',
  'Просматривайте проекты и выбирайте подходящие.',
  'Изучайте проект. Запрашивайте дополнительную информацию.',
  'Делайте предложение об инвестировании. Сумма будет зарезервирована на вашем счете.'
];

investorStepsVersions.en = [
  'Fill with funds your personal account.',
  'Find a suitable project. Go to window and choose! Use the filters to find the perfect option.',
  'Read the information about the project. Ask questions, ask to provide additional documents.',
  'Make offer to invest. The required amount will be reserved on your personal account'
];

const commonStepsVersions = {};

commonStepsVersions.ru = [
  'Ожидайте, пока проект не наберет нужную сумму инвестирований',
  'Мы приглашаем вас в офис для оформления документов по сделке.'
];

commonStepsVersions.en = [
  'Wait until the project attains the desired amount of investment',
  'We invite you to the office for paperwork on the deal.'
];

const companyTitleVersions = {
  ru: 'Для компаний',
  en: 'ACTIONS OF THE COMPANIES'
};

const investorTitleVersions = {
  ru: 'Для инвесторов',
  en: 'ACTIONS OF INVESTORS'
};

const mainTitleVersions = {
  ru: 'Как это работает',
  en: 'How it works'
};

const centerColumnTitle = {
  ru: 'Что делает On Place',
  en: 'ACTIONS OF THE ONPLACE TEAM'
};

const centerColumnText = {
  ru: [
    `Команда On Place принимает заявки, связывается с владельцем проекта для уточнения деталей, анализирует бизнес-планы
     и присваивает рейтинги надежности.`,
    `Так же OnPlace заключает все договора и сделки, которые ведутся на площадке. Команда несет финансовую 
    ответственность перед инвестором и служит гарантом защиты инвестиций.`
  ],
  en: [
    `The OnPlace team accepts applications, contacts the owner of the project for specification of details, analyzes
    business plans and assigns scores to reliability of transactions.`,
    `Also OnPlace signs all contracts and transactions which are kept on the platform. The team bears financial
    responsibility to the investor and is a guarantor of legal safety.`
  ]
};

const companyFinishTextVersions = {
  ru: `Если все пройдёт успешно, вы получите требуемые средства. Развивайте свой бизнес и рассказывайте об этом
  вкладчикам на странице проекта.`,
  en: `You get the money! Don't forget to talk about the expenses on your project page — this
  information is important to your investors.`
};

const investorFinishTextVersions = {
  ru: 'Проект получил инвестиции. Следите за статистикой и новостями проекта в личном кабинете на сайте On Place.',
  en: `The project gets the money and you statistics about the efficiency of investments in your personal account, and
  in a consequence — the profit!`
};

const strongText = {
  ru: 'Инвесторы найдены!',
  en: 'Investors are found!'
};

const showVersions = {
  ru: 'Подробнее',
  en: 'More'
};

const hideVersions = {
  ru: 'Скрыть',
  en: '\u00A0Hide\u00A0'
};

/* eslint-enable max-len */

export default class HowItWorks extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    isMobile: Type.bool,
    isPlug: Type.bool,
    lang: Type.string
  };

  constructor() {
    super();

    this.onPageScroll = ::this.onPageScroll;

    this.state = {
      navigationIsFixed: false,
      activeTab: 'company',
      detailedSchemeIsShowing: false
    };
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    document.addEventListener('scroll', this.onPageScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onPageScroll);
  }

  onPageScroll() {
    if (!this.props.isMobile || !this.navigation) return;

    const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    const navigationTopOffset = this.navigation.offsetTop;
    const bottomEdgeTopOffset = this.bottomEdge.offsetTop;

    if (navigationTopOffset < currentScrollTop && currentScrollTop < bottomEdgeTopOffset) {
      if (this.state.navigationIsFixed === false) {
        this.setState({
          navigationIsFixed: true
        });
      }
    } else {
      if (this.state.navigationIsFixed === true) {
        this.setState({
          navigationIsFixed: false
        });
      }
    }
  }

  toggleVisibilityOfDetailedScheme() {
    this.setState({
      detailedSchemeIsShowing: !this.state.detailedSchemeIsShowing
    });
  }

  renderLeftColumn() {
    const { isMobile, lang } = this.props;

    return (
      <div className="left-column column">
        <div className="column-steps-wrapper">
          {
            !isMobile &&
              <h4 className="column-title">
                {companyTitleVersions[lang]}
              </h4>
          }
          <ol className="steps-container">
            {
              companyStepsVersions[lang].map((step, index) => (
                <li
                  key={index}
                  className="step"
                >
                  {step}
                </li>
              ))
            }
            {
              isMobile &&
                <ol>
                  <li className="step">
                    {commonStepsVersions[lang][0]}
                  </li>
                  <li className="step">
                    <div className="strong-text">
                      {strongText[lang]}
                    </div>
                    {commonStepsVersions[lang][1]}
                  </li>
                </ol>
            }
          </ol>
          <div className="icon-container">
            <img
              src="/images/line-arrow-right.svg"
              alt="line-arrow-right"
            />
          </div>
        </div>
        <div className="finish-text-container">
          <div className="finish-text-normal">
            {companyFinishTextVersions[lang]}
          </div>
          {/*<div className="finish-text-large">*/}
            {/*238*/}
          {/*</div>*/}
          {/*<div className="finish-text-middle">*/}
            {/*КОМПАНИЙ УЖЕ ПОЛУЧИЛИ ИНВЕСТИЦИИ*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }

  renderRightColumn() {
    const { isMobile, lang } = this.props;

    return (
      <div className="right-column column">
        <div className="column-steps-wrapper">
          {
            !isMobile &&
              <h4 className="column-title">
                {investorTitleVersions[lang]}
              </h4>
          }
          <ol className="steps-container">
            {
              investorStepsVersions[lang].map((step, index) => (
                <li
                  key={index}
                  className="step"
                >
                  {step}
                </li>
              ))
            }
            {
              isMobile &&
                <div>
                  <li className="step">
                    {commonStepsVersions[lang][0]}
                  </li>
                  <li className="step">
                    <div className="strong-text">
                      {strongText[lang]}
                    </div>
                    {commonStepsVersions[lang][1]}
                  </li>
                </div>
            }
          </ol>
          <div className="icon-container">
            <img
              src="/images/line-arrow-left.svg"
              alt="line-arrow-left"
            />
          </div>
        </div>
        <div className="finish-text-container">
          <div className="finish-text-normal">
            {investorFinishTextVersions[lang]}
          </div>
          {/*<div className="finish-text-large">*/}
            {/*574*/}
          {/*</div>*/}
          {/*<div className="finish-text-middle">*/}
            {/*ИНВЕСТОРА УЖЕ ПОЛУЧИЛИ ПРИБЫЛЬ*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }

  /**
   * Renders 'HowItWorks' component
   */
  render() {
    const { isMobile, lang, isPlug } = this.props;

    const {
      activeTab,
      detailedSchemeIsShowing,
      navigationIsFixed
    } = this.state;

    return (
      <div className={`c-how-it-works-root ${ lang }`}>
        <div className="how-it-works-inner">
          <h2 className="g-main-page-title">
            {mainTitleVersions[lang]}
          </h2>
          {
            !isPlug &&
              <div>
                <div className="simple-steps-container">
                  {
                    simpleStepsVersions[lang].map((text, index) => (
                      <div
                        className="simple-step-item"
                        key={index}
                      >
                        <div className="simple-step-item-top">
                          {stepVersions[lang]}&nbsp;
                          <span className="step-number">
                            {index + 1}
                          </span>
                        </div>
                        <div
                          className="simple-step-item-bottom"
                          dangerouslySetInnerHTML={{ __html: text }}
                        />
                      </div>
                    ))
                  }
                </div>
                <div className="button-container">
                  <div className="button-inner">
                    <RaisedButton
                      label={detailedSchemeIsShowing ? hideVersions[lang] : showVersions[lang]}
                      style={styles.buttonContainer}
                      buttonStyle={styles.button}
                      overlayStyle={styles.buttonOverlay}
                      backgroundColor="#1e9df2"
                      labelColor="#ffffff"
                      onClick={::this.toggleVisibilityOfDetailedScheme}
                      fullWidth={true}
                    />
                  </div>
                </div>
              </div>
          }
          {
            (detailedSchemeIsShowing || isPlug) &&
              <div>
                {
                  isMobile &&
                    <div
                      className="navigation-wrapper"
                      ref={navigation => (this.navigation = navigation)}
                    >
                      <div
                        className={`navigation ${ navigationIsFixed ? 'fixed' : '' }`}
                      >
                        <div className={`navigation-item ${ activeTab === 'company' ? 'active' : '' }`}>
                          <h4
                            className="column-title"
                            onClick={() => this.setState({ activeTab: 'company' })}
                          >
                            {companyTitleVersions[lang]}
                          </h4>
                        </div>
                        <div className={`navigation-item ${ activeTab === 'investor' ? 'active' : '' }`}>
                          <h4
                            className="column-title"
                            onClick={() => this.setState({ activeTab: 'investor' })}
                          >
                            {investorTitleVersions[lang]}
                          </h4>
                        </div>
                      </div>
                    </div>
                }
                <div className="columns-container">
                  {activeTab === 'company' && this.renderLeftColumn()}

                  {isMobile && activeTab === 'investor' && this.renderRightColumn()}

                  <div className="center-column column">
                    <div className="top-center-column">
                      <h4 className="column-title">
                        {centerColumnTitle[lang]}
                      </h4>
                      <ol>
                        <li className="step">
                          {centerColumnText[lang][0]}
                        </li>
                        <li className="step bold">
                          {centerColumnText[lang][1]}
                        </li>
                      </ol>
                    </div>
                    <ol className="bottom-center-column">
                      <li className="step">
                        {commonStepsVersions[lang][0]}
                      </li>
                      <li className="step">
                        <div className="strong-text">
                          {strongText[lang]}
                        </div>
                        {commonStepsVersions[lang][1]}
                      </li>
                    </ol>
                  </div>

                  {!isMobile && this.renderRightColumn()}
                </div>
              </div>
          }
        </div>
        <div ref={bottomEdge => (this.bottomEdge = bottomEdge)}></div>
      </div>
    );
  }
}

const styles = {
  buttonContainer: {
    boxShadow: '0 2px 4px 0 rgba(4,49,71,0.5)',
    backgroundColor: '#1e9df2',
    padding: 0,
    borderRadius: 6
  },
  button: {
    height: 48,
    borderRadius: 6,
    fontFamily: 'Museo Sans Cyrl',
    fontWeight: 'bold',
    fontSize: 14
  },
  buttonOverlay: {
    lineHeight: '48px',
    height: 48
  }
};
