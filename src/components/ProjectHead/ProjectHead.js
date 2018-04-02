if (global.IS_BROWSER) {
  require('./ProjectHead.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type
} from 'react';

const dialogRating = {
  ru: 'Рейтинг',
  en: 'Rating'
};
/* eslint-disable max-len */

/**
 * Renders 'ProjectHead' component
 */
export default class ProjectHead extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    aboutItemsHead: Type.object,
    showDialog: Type.func,
    lang: Type.string
  };

  setProjectTypeColorClass(projectType) {
    if (projectType === 1) {
      return 'color_bigProject';
    } else if (projectType === 2) {
      return 'color_standartProject';
    } else if (projectType === 3) {
      return 'color_startupProject';
    }
  }

  setProjectTypeBgColorClass(projectType) {
    if (projectType === 1) {
      return 'background_bigProject';
    } else if (projectType === 2) {
      return 'background_standardProject';
    } else if (projectType === 3) {
      return 'background_startupProject';
    }
  }

  nbspSmallWords(str) {
    if (!str) { return; }
    //toDo reverse nbsp on <= 320, if will be needed
    const arr = str.split(' ');

    const nbspDoneArr = arr.map((el) => {
      if (el.length <= 2) {
        return `${ el }&nbsp;`;
      } else {
        return el;
      }
    });

    return nbspDoneArr.join(' ').replace(/&nbsp; /g, '&nbsp;');
  }

  renderRating(aboutItemsHead, showDialog, lang) {
    return aboutItemsHead.rating ? (
      <div
        className={`about-project-rating
                      ${ this.setProjectTypeBgColorClass(aboutItemsHead.projectTypeId) }`}
        onClick={showDialog && showDialog.bind(null, aboutItemsHead.rating, aboutItemsHead.ratingText)}
      >
        <span
          className="rating-title"
        >
          {dialogRating[lang]}
        </span>
        <span className="rating">{aboutItemsHead.rating}</span>
        <img className="question" alt="/" src="/images/question_white.svg" />
      </div>
    ) : '';
  }

  /**
   * Renders 'SimpleTitle' component
   */
  render() {
    const {
      aboutItemsHead = {},
      showDialog,
      lang
    } = this.props;

    const titleWithNbsp = this.nbspSmallWords(aboutItemsHead.title);

    return (
      <div className="c-about-header" style={{ backgroundImage: `url(${ aboutItemsHead.background })` }}>
        <div className="about-mask"></div>
        <div className="about-text-block">
          <span className={`about-project ${ this.setProjectTypeColorClass(aboutItemsHead.projectTypeId) }`}>
            {aboutItemsHead.projectType}
          </span>
          <h1
            className="about-project-text"
            dangerouslySetInnerHTML={{ __html: titleWithNbsp }}
          />
          {/* render rating */}
          {this.renderRating(aboutItemsHead, showDialog, lang)}
        </div>
      </div>
    );
  }
}
