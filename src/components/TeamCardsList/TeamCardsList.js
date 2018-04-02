if (global.IS_BROWSER) {
  require('./TeamCardsList.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import {
  TeamMemberCard
} from '../../components';

const teamVersions = {
  ru: 'Команда',
  en: 'Team'
};

export default class TeamCardsList extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    team: Type.array,
    lang: Type.string
  };
  
  /**
   * Renders 'TeamCardsList' component
   */
  render() {
    const { team, lang } = this.props;
    
    return (
      <div className="c-team-cards-list-root">
        <div className="team-cards-list-inner">
          <h2 className="g-main-page-title main-page-slider-title">
            {teamVersions[lang]}
          </h2>
          <div className="team-cards-list-container">
            {
              team.map((teamItem, index) => (
                <TeamMemberCard
                  key={index}
                  data={teamItem}
                  isMobile={true}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
