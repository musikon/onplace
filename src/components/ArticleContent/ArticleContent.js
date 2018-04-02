if (global.IS_BROWSER) {
  require('./ArticleContent.styl'); // eslint-disable-line global-require
}

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import ReactPlayer from 'react-player';

export default class ArticleContent extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    articleItem: Type.object,
    videoRefFunc: Type.func
  };

  constructor(props) {
    super(props);

    this.setVideoHeight = this.setVideoHeight.bind(this);
  }

  setVideoHeight() {
    // not once cause we don't have ref here to current video
    if (this.props.articleItem.type === 'video') {
      let videos = document.querySelectorAll('.article-content-video');
      videos = Array.prototype.slice.call(videos, 0);

      videos.forEach((video) => {
        const iframe = video.querySelector('iframe');
        iframe && (iframe.style.height = `${ iframe.clientWidth * (9 / 16) }px`);
      });
    }
  }

  /**
   * Renders 'ArticleContent' component
   */
  render() {
    let articleItemJsx;

    const {
      articleItem,
      videoRefFunc
    } = this.props;

    switch (articleItem.type) {
      case 'article-title':
        articleItemJsx = (
          <h2 className="g-article-page-title">
            {articleItem.text}
          </h2>
        );
        break;
      case 'title':
        articleItemJsx = (
          <h2 className="article-page-title">
            {articleItem.text}
          </h2>
        );
        break;

      case 'image':
        articleItemJsx = (
          <div className="article-content-image-container">
            <img
              className="image"
              src={articleItem.src}
              alt={articleItem.alt}
            />
            {
              articleItem.description &&
                <div className="image-description">
                  {articleItem.description}
                </div>
            }
            {
              articleItem.author &&
                <div className="image-author">
                  {articleItem.author}
                </div>
            }
          </div>
        );
        break;

      case 'simple-image':
        articleItemJsx = (
          <div className="article-content__simple-image-container">
            <img
              className="image"
              src={articleItem.src}
              alt={articleItem.alt}
            />
          </div>
        );
        break;

      case 'text':
        articleItemJsx = (
          <div
            className={` article-content-text ${ articleItem.class ? articleItem.class : '' }`}
            dangerouslySetInnerHTML={{ __html: articleItem.text }}
          >
          </div>
        );
        break;

      case 'article-3':
        articleItemJsx = (
          <h3 className="article-page-h3">
            {articleItem.text}
          </h3>
        );
        break;

      case 'title-3':
        articleItemJsx = (
          <h3 className="article-page-h3">
            {articleItem.text}
          </h3>
        );
        break;

      case 'quote-bold':
        articleItemJsx = (
          <div className="article-content-quote bold">
            {articleItem.text}
          </div>
        );
        break;

      case 'quote':
        articleItemJsx = (
          <div className="article-content-quote">
            {articleItem.text}
          </div>
        );
        break;

      case 'big-quote':
        articleItemJsx = (
          <div className="article-content-big-quote-wrapper">
            <div className="article-content-big-quote">
              <div className="text">
                {articleItem.text}
              </div>

              <div className="author-container">
                <div className="author-name">
                  {articleItem.name}
                </div>

                <div className="author-position">
                  {articleItem.author}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'blue-quote':
        articleItemJsx = (
          <div className="article-content-blue-quote-wrapper">
            <div className="article-content-blue-quote">
              <div className="text">
                {articleItem.text}
              </div>

              <div className="author-container">
                <div className="author-name">
                  {articleItem.name}
                </div>

                <div className="author-position">
                  {articleItem.author}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'list':
        articleItemJsx = (
          <div className="article-content-list">
            <ul>
              {
                articleItem.listItems.map((listText, i) => (
                  <li key={i}>{listText}</li>
                ))}
            </ul>
          </div>
        );
        break;
      case 'video':
        articleItemJsx = (
          <div
            className="article-content-video"
            ref={videoRefFunc}
          >
            <ReactPlayer
              url={articleItem.src} width="100%"
              onReady={::this.setVideoHeight}
            />
          </div>
        );
        break;
      case 'big-quote-left-side':
        articleItemJsx = (
          <div className="article-content-big-quote-left-side">
            <div className="title">
              {articleItem.title}
            </div>
            <span className="bigLetter">
              {articleItem.bigLetter}
            </span>
            <span className="smallLetter">
              {articleItem.smallLetter}
            </span>
          </div>
        );
        break;
      case 'table':
        articleItemJsx = (
          <div className="article-content-table">
            <table>
              <thead>
                <tr>
                  {
                    articleItem.headers.map((thItem, index) => (
                      <th key={index}>{thItem}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  articleItem.data.map((rowArray, index) => (
                    <tr key={index}>
                      {
                        rowArray.map((tdItem, i) => (
                          <td
                            key={i}
                            dangerouslySetInnerHTML={{ __html: tdItem }}
                          />
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        );
        break;
      case 'big-quote_left-side-indicators':
        articleItemJsx = (
          <div className="article-content__big-quote_left-side-indicators">

            <div className="left">
              <div className="left-container">
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: articleItem.left.title }}
                ></div>
                <div className="numb-container">
                  <div className="id">{articleItem.left.numb ? '№' : ''}</div>
                  <div className="numb">{articleItem.left.val}</div>
                  <div
                    className="right-text"
                    dangerouslySetInnerHTML={{ __html: articleItem.left.rightText }}
                  ></div>
                </div>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: articleItem.left.bottomText }}
                ></div>
              </div>
            </div>
            <div className="right">
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: articleItem.right.title }}
              ></div>
              <div className="numb-container">
                <div className="numb">{articleItem.right.val}</div>
                <div className="text">{articleItem.right.rightText}</div>
              </div>
              <div className="desc">{articleItem.right.bottomText}</div>

              <div className="divider">
                <img src="/images/icons/divider.svg" alt="divider" />
              </div>
            </div>
          </div>
        );
        break;
      default:
    }

    return (
      <div className="c-article-content">
        {articleItemJsx}
      </div>
    );
  }
}
