if (global.IS_BROWSER) {
  require('./AdminHome.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import Chart from 'd3act/lib/components/Chart';
import DonutChart from './DonutChart';
import BarChart from './BarChart';

import { formatNumberWithSpaces, apiCall } from '../../utils';

import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications-none';

const styleNotificationsIcon = {
  color: '#9b9b9b',
};

const contentBox = [
  {
    title: { ru: 'На счете', en: 'Balance' },
    money: '819000 ₽',
    projects: { ru: '\u00A0', en: '\u00A0' },
    button: { ru: 'Пополнить счет', en: 'Deposit' }
  },
  {
    title: { ru: 'Зарезервировано', en: 'Reserved' },
    money: '1300 ₽',
    projects: { ru: '5 Проектов', en: '5 Projects' },
    button: { ru: 'ПОДРОБНЕЕ', en: 'Details' }
  },
  {
    title: { ru: 'Инвестировано', en: 'Invested' },
    money: '2500000 ₽',
    projects: { ru: '2 Проекта', en: '2 Projects' },
    button: { ru: 'ПОДРОБНЕЕ', en: 'Details' }
  }
];

const statisticNavigation = [
  { img: '/images/admin/icon_1.svg' },
  { img: '/images/admin/icon_2.svg' },
  { img: '/images/admin/icon_3.svg' },
  { img: '/images/admin/icon_4.svg' },
  { img: '/images/admin/icon_5.svg' },
];
const forecastItems = {
  money: '1355349 ₽'
};

const labelVersions = {
  ru: '№3 — кредитование под низкий процент',
  en: '#3 - low interest-rate crediting'
};

const statsTitle = {
  ru: 'Статистика вложений',
  en: 'Investments stats'
};

const forecastTitle = {
  ru: 'ПРОГНОЗ ПОСТУПЛЕНИЙ ЗА<span> 2017 г.</span>',
  en: 'Revenue forecast <span> 2017</span>'
};

const badgeStyle = {
  top: 0,
  right: 0,
  width: 2,
  height: 2,
  background: '#fff',
  border: '4px solid #f64300'
};

export default class AdminHome extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    lang: Type.string,
    showDialog: Type.func
  };
  /**
   * Renders 'AddNewsButton' component
   */
  constructor() {
    super();

    this.projectTooltip = null;
    this.sumLineRef = null;

    this.setProjectTooltipRef = ::this.setProjectTooltipRef;
    this.setSumLineRef = ::this.setSumLineRef;
    this.showTooltip = ::this.showTooltip;
    this.hideTooltip = ::this.hideTooltip;
    this.showSumLine = ::this.showSumLine;
    this.hideSumLine = ::this.hideSumLine;
    this.updateSumLine = ::this.updateSumLine;
    this.setTooltipPosition = ::this.setTooltipPosition;
    
    this.state = {
      showChart: false,
      indexStatistic: 0,
      tooltipIsShowing: false,
      sumLineIsShowing: false,
      tooltipPositionStyles: {},
      sumLinePositionStyles: {},
      sumLineData: '',
      exchangeRates: null,
      tooltipData: {
        projectName: '',
        sum: null,
        color: ''
      }
    };
  }
  
  componentWillMount() {
    this.getExchangeRates();
  }
  
  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    this.setState({
      showChart: true
    });
  }
  
  getExchangeRates() {
    apiCall({
      path: '/currencies?iso=USD,CNY',
      method: 'GET'
    }).then(({ data }) => {
      const [USDRate, CNYRate] = data.response;
      
      this.setState({
        exchangeRates: [
          {
            img: '/images/us-flag.png',
            country: 'USD',
            rate: USDRate.value,
            dinamic: USDRate.delta > 0 ? 'up' : 'down'
          },
          {
            img: '/images/admin/china-flag.jpg',
            country: 'CNY',
            rate: CNYRate.value / 10,
            dinamic: CNYRate.delta > 0 ? 'up' : 'down'
          },
        ]
      });
    });
  }
  
  setProjectTooltipRef(projectTooltip) {
    this.projectTooltip = projectTooltip;
  }
  
  setSumLineRef(sumLineRef) {
    this.sumLineRef = sumLineRef;
  }
  
  setTooltipPosition(tooltipPositionStyles) {
    this.setState({
      tooltipPositionStyles
    });
  }

  updateSumLine(sumLineData) {
    this.setState(sumLineData);
  }
  
  hideSumLine() {
    this.setState({
      sumLineIsShowing: false
    });
  }
  
  hideTooltip() {
    this.setState({
      tooltipIsShowing: false
    });
  }
  
  showTooltip(tooltipData) {
    this.setState({
      tooltipIsShowing: true,
      tooltipData
    });
  }
  
  showSumLine(sumLineData) {
    this.setState({
      sumLineIsShowing: true,
      sumLineData
    });
  }
  
  _clickNavigation(index) {
    this.setState({ indexStatistic: index });
  }

  render() {
    const {
      indexStatistic,
      showChart,
      tooltipIsShowing,
      sumLineIsShowing,
      sumLineData,
      sumLinePositionStyles,
      tooltipPositionStyles,
      tooltipData,
      exchangeRates
    } = this.state;

    const {
      lang,
      showDialog
    } = this.props;
    
    return (
      <div className="admin-home-root">
        <div className="admin-top-bar">
          <div className="left-side">
            {
              exchangeRates && exchangeRates.map((item, index) => (
                <div className="currency-info" key={index}>
                  <img className="country-flag" alt="" src={item.img} />
                  <span className="country-name">{item.country}</span>
                  <span className="country-money">{item.rate}</span>
                  {
                    item.dinamic === 'up' ?
                      <div className="green-triangle"></div>
                      : <div className="red-triangle"></div>
                  }
                </div>
              ))}
          </div>
          <div className="right-side">
            <div
              className="avatar"
              onClick={showDialog}
            >
              <img alt="" src="/images/avatar.jpg" />
            </div>
            <div
              className="notification"
              onClick={showDialog}
            >
              <Badge
                primary={true}
                badgeContent={false}
                badgeStyle={badgeStyle}
                style={{ padding: 0 }}
              >
                <NotificationsIcon style={styleNotificationsIcon} />
              </Badge>
            </div>
          </div>
        </div>
        <div className="top-content">
          {contentBox.map((item, index) => (
            <div className="content-box" key={index}>
              <span className="content-title">{item.title[lang]}</span>
              <span className="content-money">{formatNumberWithSpaces(item.money)}</span>
              <span className="content-project">{item.projects[lang]}</span>
              <div
                onClick={showDialog}
                className="content-button"
              >
                {item.button[lang]}
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-content">
          <div className="statistic">
            <div className="content-title">
              {statsTitle[lang]}
            </div>
            <div>
              <div className="donut-chart-wrapper">
                {
                  showChart &&
                    <Chart
                      type="custom"
                      customChart={DonutChart}
                      data={[26, 74]}
                    />
                }
              </div>
            </div>
            <div className="statistic-info">
              <div className="circle"></div>
              <span className="statistic-text">
                {labelVersions[lang]}
              </span>
            </div>
            {
              statisticNavigation.map((item, index) => (
                <div
                  className="statistic-navigation"
                  key={index}
                  onClick={showDialog}
                >
                  <div className="statistic-button-wrapper">
                    <img
                      className={`statistic-button ${ indexStatistic === index ? 'statistic-button-active ' : '' }`}
                      alt=""
                      src={item.img}
                    />
                  </div>
                  <div
                    className={`point ${ indexStatistic === index ? 'point-active ' : '' }`}
                  ></div>
                </div>
              ))}
          </div>
          <div className="forecast">
            <div
              className="content-title"
              dangerouslySetInnerHTML={{ __html: forecastTitle[lang] }}
            >
            </div>
            <div className="forecast-money">{formatNumberWithSpaces(forecastItems.money)}</div>
            <div className="barchart-wrapper">
              <div
                className={`sum-line ${ sumLineIsShowing ? 'show' : '' }`}
                ref={this.setSumLineRef}
                style={sumLinePositionStyles}
              >
                <div className="sum-line-container">
                  <div className="sum-line-text-wrapper">
                    <div className="sum-line-text">
                      {formatNumberWithSpaces(sumLineData)}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`project-info-tooltip ${ tooltipIsShowing ? 'show' : '' }`}
                ref={this.setProjectTooltipRef}
                style={tooltipPositionStyles}
              >
                <div className="sum">
                  {tooltipData.sum && formatNumberWithSpaces(tooltipData.sum)}
                </div>
                <div className="name-wrapper">
                  <span className="name">
                    <span
                      className="circle"
                      style={{ backgroundColor: tooltipData.color }}
                    />
                    {tooltipData.projectName}
                  </span>
                </div>
              </div>
              {
                showChart &&
                  <Chart
                    type="custom"
                    customChart={BarChart}
                    projectTooltip={this.projectTooltip}
                    sumLine={this.sumLineRef}
                    sumLineIsShowing={sumLineIsShowing}
                    showTooltip={this.showTooltip}
                    hideTooltip={this.hideTooltip}
                    showSumLine={this.showSumLine}
                    hideSumLine={this.hideSumLine}
                    setTooltipPosition={this.setTooltipPosition}
                    updateSumLine={this.updateSumLine}
                    lang={lang}
                    data={[74, 33]}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
