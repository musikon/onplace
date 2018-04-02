if (global.IS_BROWSER) {
  require('./EditorContentContainer.styl'); // eslint-disable-line global-require
}

import {
  ImageSlider,
} from '../../components';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import _forEach from 'lodash/forEach';

import {
  render
} from 'react-dom';

export default class EditorContentContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    htmlContent: Type.string,
  };
  
  componentDidMount() {
    if (this.contentContainer.innerHTML) {
      this.processEditorContent();
    }
  }
  
  componentDidUpdate(prevProps) {
    if ((prevProps.htmlContent !== this.props.htmlContent) && this.contentContainer.innerHTML) {
      this.processEditorContent();
    }
  }
  
  getScript() {
    const script = document.createElement('script');
    
    script.async = 1;
    script.src = '//cdn.embedly.com/widgets/platform.js';
    
    script.onload = () => {
      window.embedly();
    };
    
    document.body.appendChild(script);
  }
  
  processEditorContent() {
    this.renderEmbedly();
  
    const sliders = this.contentContainer.querySelectorAll('.js-image-slider');
  
    _forEach(sliders, slider => {
      const description = slider.innerHTML;
    
      slider.innerHTML = ''; // eslint-disable-line
    
      render((
        <ImageSlider
          slides={JSON.parse(slider.getAttribute('data-slides').replace(/'/g, '"'))}
          descriptionHtml={description}
        />
      ), slider);
    });
  }
  
  renderEmbedly() {
    if (window.embedly) {
      window.embedly();
    } else {
      this.getScript();
    }
  }
  
  /**
   * Renders 'ImageSlider' component
   */
  render() {
    const {
      htmlContent
    } = this.props;
    
    return (
      <div
        className="c-editor-content-container"
        ref={contentContainer => (this.contentContainer = contentContainer)}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>
    );
  }
}
