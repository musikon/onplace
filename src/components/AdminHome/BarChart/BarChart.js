import d3 from 'd3';

import _throttle from 'lodash/throttle';
import _inRange from 'lodash/inRange';
import _clamp from 'lodash/clamp';

const ruFormatLocal = d3.locale({
  decimal: ',',
  thousands: '\u00A0',
  grouping: [3],
  currency: ['', ' руб.'],
  dateTime: '%A, %e %B %Y г. %X',
  date: '%d.%m.%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'],
  shortMonths: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
});

const enFormatLocal = d3.locale({
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['$', ''],
  dateTime: '%a %b %e %X %Y',
  date: '%m/%d/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
    'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
});

const customNumberFormatter = (num, lang) => {
  let formattedNum = num;
  
  const millions = {
    ru: 'млн',
    en: 'mln'
  };
  
  const thousands = {
    ru: 'тыс',
    en: 'k'
  };
  
  if (num >= 1000000) {
    formattedNum = `${ (num / 1000000).toFixed(1).replace(/\.0$/, '') } ${ millions[lang] } `;
  } else if (num >= 1000) {
    formattedNum = `${ (num / 1000).toFixed(1).replace(/\.0$/, '') } ${ thousands[lang] }`;
  }
  
  return formattedNum;
};

export default class BarChart {
  constructor(element, props) {
    this.element = element;
    this.props = props;

    this.chartNodes = {};
    this.tooltipPadding = 8;
    this.sumLineLedge = 8;
    
    this.mapTypeToName = {
      ru: {
        green: 'Инвестиционный проект развития производства ООО «Росмет»',
        blue: 'Развитие бизнеса проекта компании «ЧИСТО»',
        red: 'Строительство пяти индивидуальных жилых домов эконом-класса в Прикубанском округе г. Краснодара'
      },
      en: {
        green: 'The investment project development of production  LLC "Rosmet"',
        blue: 'Business development of Chisto company project',
        red: 'The construction of five individual houses economy class  in Prikubansky district of Krasnodar'
      }
    };
  
    this.mapTypeToColor = {
      green: '#1F9CF0',
      blue: '#7ED321',
      red: '#F64300'
    };
  
    const margin = { top: 20, right: 60, bottom: 50, left: 30 };
  
    const canvasWidth = window.innerWidth / 2.3471;
    const canvasHeight = canvasWidth / 1.944;
  
    this.layoutDemensions = {
      margin,
      width: canvasWidth,
      height: canvasHeight
    };
    
    this.drawChart = _throttle(this.drawChart, 450);
  }
  
  create() {
    if (this.props.lang === 'ru') {
      d3.time.format = ruFormatLocal.timeFormat;
    } else {
      d3.time.format = enFormatLocal.timeFormat;
    }
    
    this.drawChart();
  }
  
  update() {

  }
  
  recreateChart() {
    const {
      width,
      height,
      margin
    } = this.layoutDemensions;
    
    const {
      sumLine
    } = this.props;
  
    const svg = this.svg = d3.select(this.element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${ margin.left }, ${ margin.top })`);
  
    sumLine.style.width = `${ width + this.sumLineLedge }px`;
    sumLine.style.left = `${ margin.left }px`;
  
    const data = [
      { date: '2016-01', green: '1000000', blue: '150000', red: '90000' },
      { date: '2016-02', green: '1200000', blue: '180000', red: '90000' },
      { date: '2016-03', green: '0500000', blue: '200000', red: '80000' },
      { date: '2016-04', green: '0100000', blue: '150000', red: '50000' },
      { date: '2016-05', green: '0200000', blue: '100000', red: '40000' },
      { date: '2016-06', green: '0300000', blue: '120000', red: '60000' },
      { date: '2016-07', green: '0400000', blue: '150000', red: '80000' },
      { date: '2016-08', green: '0600000', blue: '110000', red: '90000' },
      { date: '2016-09', green: '1000000', blue: '130000', red: '90000' },
      { date: '2016-10', green: '1600000', blue: '190000', red: '60000' },
      { date: '2016-11', green: '1900000', blue: '170000', red: '50000' },
      { date: '2016-12', green: '1100000', blue: '140000', red: '50000' },
    ];
  
    const parse = d3.time.format('%Y-%m').parse;
  
    const dataset = d3.layout.stack()(['blue', 'green', 'red'].map(fruit => (
      data.map(dataItem => ({ type: fruit, x: parse(dataItem.date), y: +dataItem[fruit] }))
    )));
  
    const x = this.xScale = d3.scale.ordinal()
    .domain(dataset[0].map(dataItem => dataItem.x))
    .rangeBands([0, width], 0.5);
  
    const barWidth = x.rangeBand();
  
    const y = this.yScale = d3.scale.linear()
    .domain([0, d3.max(
      dataset,
      dataItem => d3.max(
        dataItem,
        innerDataItem => (innerDataItem.y0 + innerDataItem.y)
      )
    )])
    .range([height, 0]);
  
    const colors = ['#7ED321', '#1F9CF0', '#F64300'];
  
    const numTicksOnYAxis = 9;
  
    const yAxis = d3.svg.axis()
    .scale(y)
    .orient('right')
    .ticks(numTicksOnYAxis)
    .tickSize(-width, 0, 0)
    .tickFormat(number => customNumberFormatter(number, this.props.lang));
  
    const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat(d3.time.format('%b'));
  
    this.yAxisLine = svg.append('line')
    .attr('class', 'y-axis-line')
    .attr('x1', width)
    .attr('y1', 0)
    .attr('x2', width)
    .attr('y2', height);
  
    const gForYAxis = svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', `translate(${ width },0)`)
    .call(yAxis);
  
    gForYAxis.selectAll('line')
    .each(function setStrokeStyle(value, index) {
      if (!!index) {
        d3.select(this).attr('stroke-dasharray', '2, 3');
      }
    });
  
    gForYAxis.selectAll('.tick')
    .each(function addNewTicksForY(value, index) {
      d3.select(this)
      .append('line')
      .attr('x1', 5)
      .attr('x2', 0);
    
      if (!!index) {
        d3.select(this)
        .append('line')
        .attr('transform', `translate(0, ${ height / (data.length - 1) / 2 })`)
        .attr('x1', 5)
        .attr('x2', 0);
      }
    });
  
    svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${ height })`)
    .call(xAxis)
    .selectAll('.tick')
    .each(function addNewTicksForX(value, index) {
      if (index !== data.length - 1) {
        d3.select(this)
        .append('line')
        .attr('transform', `translate(${ barWidth }, 0)`)
        .attr('y1', -4)
        .attr('y2', 6);
      }
    })
    .selectAll('text')
    .style('text-anchor', 'end');
  
    const groups = svg.selectAll('g.cost')
    .data(dataset)
    .enter().append('g')
    .attr('class', 'cost')
    .style('fill', (dataItem, index) => colors[index]);
  
    this.rects = groups.selectAll('rect')
    .data(dataItem => dataItem)
    .enter()
    .append('rect')
    .attr('x', dataItem => x(dataItem.x))
    .attr('y', dataItem => y(dataItem.y0 + dataItem.y))
    .attr('height', dataItem => y(dataItem.y0) - y(dataItem.y0 + dataItem.y))
    .attr('width', barWidth);
    
    this.bindEvents();
  }
  
  drawChart() {
    const canvasWidth = window.innerWidth / 2.3471;
    const canvasHeight = canvasWidth / 1.944;
    const windowWidth = window.innerWidth;

    this.layoutDemensions = Object.assign(this.layoutDemensions, {
      width: canvasWidth,
      height: canvasHeight,
      ...(windowWidth < 1100 ? { margin: { top: 20, right: 60, bottom: 50, left: 0 } } : null)
    });
  
    this.element.innerHTML = '';
    this.recreateChart();
  }
  
  bindEvents() {
    const {
      projectTooltip,
      showTooltip,
      hideTooltip,
      hideSumLine,
      setTooltipPosition,
      updateSumLine
    } = this.props;
    
    const {
      width,
      height,
      margin
    } = this.layoutDemensions;
  
    window.addEventListener('resize', () => {
      this.drawChart();
    });
    
    d3.select(this.element).select('svg').on('mousemove', () => {
      let top = d3.mouse(this.element)[1];
      const sumValue = parseInt(this.yScale.invert(top - margin.top), 10);
      const needShowSumLine = _inRange(top, margin.top, margin.top + height);
      
      top = _clamp(top, margin.top, margin.top + height);

      updateSumLine(
        {
          sumLinePositionStyles: { top },
          sumLineData: sumValue,
          sumLineIsShowing: needShowSumLine
        }
      );
    })
    .on('mouseleave', hideSumLine);
    
    this.rects.on('mouseenter', (activeBar) => {
      showTooltip({
        color: this.mapTypeToColor[activeBar.type],
        projectName: this.mapTypeToName[this.props.lang][activeBar.type],
        sum: activeBar.y
      });
    })
    .on('mousemove', () => {
      let [left, top] = d3.mouse(this.element); // eslint-disable-line prefer-const
  
      const tooltipWidth = projectTooltip.clientWidth;
  
      if (left + tooltipWidth > margin.left + width) {
        left = left - tooltipWidth - this.tooltipPadding;
      } else {
        left = left + this.tooltipPadding;
      }
  
      setTooltipPosition({
        left,
        top
      });
    })
    .on('mouseleave', hideTooltip);
  }
  
  unmount() {
    this.element.remove();
  }
}
