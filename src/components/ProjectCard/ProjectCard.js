if (global.IS_BROWSER) {
  require('./ProjectCard.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import { formatNumberWithSpaces, declensionOfNouns } from '../../utils';
import { ShareIcon } from '../../components';

export default class ProjectCard extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    aboutCardObj: Type.object,
    bottomFixed: Type.bool,
    onClickRegistrationAsInvestor: Type.func,
    aboutCardRefFunc: Type.func,
    lang: Type.string
  };

  constructor() {
    super();

    this.state = {
      showShareIcon: false
    };
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    this.setState({
      showShareIcon: true
    });
  }

  _calcCurrentInvestments(aboutCardObjData) {
    return Math.floor((aboutCardObjData.investments / aboutCardObjData.target) * 100);
  }

  _calcMinStartupInvestments(aboutCardObjData) {
    return Math.floor((aboutCardObjData.targetMin / aboutCardObjData.target) * 100);
  }

  renderTarget(aboutCardObj, isRUS) {
    return (aboutCardObj.isStartup) ? (
      <div className="target-container target-container_startup">
        <div className="target">
          <span className="card-conditions">
            {isRUS ? 'Цель минимум' : 'Goal min'}
          </span>
          <span className="target-money target-money_min">
            <span>{formatNumberWithSpaces(aboutCardObj.targetMin)}</span>
            <span className="currency">&nbsp;{aboutCardObj.currency}</span>
          </span>
        </div>

        <div className="target">
          <span className="card-conditions">
            {isRUS ? 'Максимальная цель' : 'Goal max'}
          </span>
          <span className="target-money target-money_max">
            <span>{formatNumberWithSpaces(aboutCardObj.target)}</span>
            <span className="currency">&nbsp;{aboutCardObj.currency}</span>
          </span>
        </div>
      </div>
    ) : (
      <div className="target-container">
        <div className="target">
          <span className="card-conditions">
            {isRUS ? 'Цель' : 'Goal'}
          </span>
          <span className="target-money">
            <span>{formatNumberWithSpaces(aboutCardObj.target)}</span>
            <span className="currency">&nbsp;{aboutCardObj.currency}</span>
          </span>
        </div>
      </div>
    );
  }
  /**
   * Renders 'FixedFooter' component
   */
  render() {
    const positioning = 'card';
    const {
      aboutCardObj = {}
    } = this.props;

    const {
      bottomFixed,
      onClickRegistrationAsInvestor,
      aboutCardRefFunc,
      lang
    } = this.props;

    const {
      showShareIcon
    } = this.state;

    const isRUS = lang === 'ru';

    return (
      <div
        className={`c-about-card-root ${ bottomFixed ? 'bottom-fixed' : '' }`}
        ref={aboutCardRefFunc}
      >
        <div className="about-card-inner">
          <div className="card-top">
            <span className="card-conditions">
              {isRUS ? 'ДО ЗАВЕРШЕНИЯ ОСТАЛОСЬ:' : 'Days left'}
            </span>
            <span className="time">
              {`${ aboutCardObj.time } `}
              {isRUS ? declensionOfNouns(aboutCardObj.time, { nom: 'день', gen: 'дня', plu: 'дней' }) :
                declensionOfNouns(aboutCardObj.time, { nom: 'day', gen: 'days', plu: 'days' })}
            </span>
            <span className="card-conditions">
              {isRUS ? 'ПРИВЛЕЧЕНО ИНВЕСТИЦИЙ' : 'Amount collected'}
            </span>
            <span className="card-investments">
              {formatNumberWithSpaces(aboutCardObj.investments)} {aboutCardObj.currency}
            </span>
            <div className="card-progress-bar">
              <div className="progress" style={{ width: `${ this._calcCurrentInvestments(aboutCardObj) }%` }}>
                <div
                  className={`progress-target ${ aboutCardObj.isStartup ? 'is-startup' : 'hidden' }`}
                  style={{ left: `calc(${ this._calcMinStartupInvestments(aboutCardObj) }% - 3px)` }}
                >
                  <span className="progress-target__text">min</span>
                  <svg
                    width="0.84375rem"
                    height="1.5rem"
                    viewBox="984 290 9 18"
                    version="1.1" xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Group-25"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                      transform="translate(984.000000, 290.000000)"
                    >
                      <polygon id="Rectangle-8" fill="#1E9DF2" points="4 6 5 6 5 18 4 18"></polygon>
                      <polygon id="Triangle-4" fill="#1E9DF2" points="4 6 0 0 9 0 5 6"></polygon>
                    </g>
                  </svg>

                </div>
              </div>
            </div>
            <div className="card-target-block">
              {this.renderTarget(aboutCardObj, isRUS)}
              <div className="card-divider"></div>
              <div className="target-percent">
                <span className="card-conditions">
                  {isRUS ? 'Доходность за год' : 'Annual income'}
                </span>
                <span className="percent">{`${ aboutCardObj.percent }%`}</span>
              </div>
            </div>
            <span className="card-conditions">
              {isRUS ? 'МЕСТО РЕАЛИЗАЦИИ' : 'Location'}
            </span>
            <span className="card-city">{aboutCardObj.city}</span>
            {showShareIcon && <ShareIcon lang={lang} positioning={positioning} />}
          </div>
          <div className="card-bottom">
            <span className="min-sum">
              {isRUS ? 'МИНИМАЛЬНАЯ СУММА ИНВЕСТИЦИЙ:' : 'Minimum investment amount'}
            </span>
            <span className="summa">{aboutCardObj.min_sum} {aboutCardObj.currency}</span>
            <button
              className="card-button"
              onClick={onClickRegistrationAsInvestor}
            >
              {isRUS ? 'ИНВЕСТИРОВАТЬ' : 'INVEST'}
            </button>
            <span className="investors">
              {aboutCardObj.investors} {isRUS ? 'Инвесторов' : 'Investors'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
