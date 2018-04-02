import d3 from 'd3';

export default class DonutChart {
  constructor(element, props) {
    this.element = element;
    this.props = props;
    this.chartNodes = {};
    
    this.segmentsColors = [
      '#F59800',
      '#1E9DF2'
    ];
  }
  
  create(chartData) {
    const dataset = {
      percents: chartData,
    };
  
    this.isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  
    const width = 240;
    const height = 240;
    const radius = Math.min(width, height) / 2;
  
    const pie = d3.layout.pie()
      .sort(null);
  
    const arc = d3.svg.arc()
      .innerRadius(radius - 71)
      .outerRadius(radius - 33);
  
    const arc2 = d3.svg.arc()
      .innerRadius(radius - 76)
      .outerRadius(radius - 28);
  
    const svg = d3.select(this.element).append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${ width / 2 },${ height / 2 })`);
  
    this.chartNodes.defs = svg.append('defs');

    this.segmentsColors.forEach((color, index) => (this.createShadowFilter(index)));
    
    const path = svg.selectAll('path')
      .data(pie(dataset.percents))
      .enter().append('path')
      .attr('fill', (d, i) => this.segmentsColors[i])
      .attr('style', (d, i) => {
        const { r, g, b } = d3.rgb(this.segmentsColors[i]);
        
        const svgFilterStyle = `-webkit-svg-shadow: 0 14px 25px rgba(${ r }, ${ g }, ${ b }, 0.5)`;
        const urlFilterStyle = `filter: url(#filter${ i })`;
        const dropShadowStyle = `filter: drop-shadow(0 14px 25px rgba(${ r }, ${ g }, ${ b }, 0.5)`;
        
        return this.isChrome ? urlFilterStyle : [svgFilterStyle, dropShadowStyle].join(';');
      })
      .attr('d', arc);
    
    const percentText = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', 3)
      .attr('y', 8);
    
    path
      .on('mouseenter', function ({ data }) {
        d3.select(this)
          .transition()
          .duration(600)
          .attr('d', arc2);
  
        percentText
          .transition()
          .duration(300)
          .attr('opacity', 0)
          .each('end', () => {
            percentText.text(`${ data }%`);
  
            percentText
              .transition()
              .duration(300)
              .attr('opacity', 1);
          });
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(600)
          .attr('d', arc);
  
        percentText
          .transition()
          .duration(300)
          .attr('opacity', 0);
      });
  }
  
  createShadowFilter(postfix) {
    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    const filter = this.chartNodes.defs.append('filter')
      .attr('id', `filter${ postfix }`)
      .attr('height', '200%')
      .attr('width', '200%');
    
    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append('feOffset')
      .attr('in', `SourceAlpha${ postfix }`)
      .attr('dx', 0)
      .attr('dy', 14)
      .attr('result', `shadowOffsetOuter1${ postfix }`);

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append('feGaussianBlur')
      .attr('in', `shadowOffsetOuter1${ postfix }`)
      .attr('stdDeviation', 12.5)
      .attr('result', `shadowBlurOuter1${ postfix }`);

    filter.append('feColorMatrix')
      .attr('values', '0.75 0 0 0 0 0 0.75 0 0 0 0 0 0.75 0 0 0 0 0 0.3 0')
      .attr('type', 'matrix')
      .attr('in', `shadowBlurOuter1${ postfix }`);

    const feMerge = filter.append('feMerge');

    feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur');

    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');
  }
  
  update() {
  }
  
  unmount() {
    this.element.remove();
  }
}
