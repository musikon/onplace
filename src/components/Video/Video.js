if (global.IS_BROWSER) {
  require('./Video.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

export default class Video extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    src: Type.string,
    poster: Type.string
  };
  constructor() {
    super();

    this.state = {
      videoPaused: true
    };
  }

  /**
   * Play/Pause 'Video'
   */
  _playVideo() {
    if (this.video.paused) {
      this.video.play();
      this.setState({
        videoPaused: false
      });
    } else {
      this.video.pause();
      this.setState({
        videoPaused: true
      });
    }
  }

  /**
   * Renders 'Video' component
   */
  render() {
    const {
      src,
      poster
    } = this.props;

    return (
      <div className="c-video">
        <div className="video-container">
          <video
            ref={(video) => { this.video = video; }}
            src={src}
            onClick={::this._playVideo}
            poster={poster}
          ></video>
        </div>
        <div className="control-container">
          <div className="play-container">
            <div
              className={`play ${ this.state.videoPaused ? '' : 'hide' }`}
              onClick={::this._playVideo}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
