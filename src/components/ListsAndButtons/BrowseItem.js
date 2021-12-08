import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class BrowseItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    streamer: PropTypes.object
  }

  componentDidMount () {
  }

  render () {
    const streamer = this.props.streamer;
    let title = streamer.broad_title;
    if (title.length > 28) {
      title = title.substring(0, 28) + '...';
    }
    return (
            <>

            <div className="thumbs-box">
                <Link to={{ pathname: `/${streamer.user_id}/live` }}>
                    <img src={streamer.broad_thumb} alt="" loading="lazy" />
                </Link>

            </div>

            <div className="cBox-info">
                <a href="/#" className="thumb" target="_blank"><img src={`https://stimg.afreecatv.com/LOGO/${streamer.user_id.substring(0, 2)}/${streamer.user_id}/${streamer.user_id}.jpg`} alt=""/></a>
                <h3 >
                    <Link to={{ pathname: `/${streamer.user_id}/live` }} style={{ color: 'black' }}>
                        {title}
                    </Link>
                </h3>
                <div className="details" style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>

                    <div className="nick_wrap" style={{
                      flexShrink: '0'
                    }}>
                        <div className="nicknames" style={{
                        }}>
                            <a href="/#">
                                <span>{streamer.user_nick}</span>
                            </a>
                        </div>
                    </div>

                   <p style={{
                     display: 'flex',
                     alignItems: 'center',
                     marginBottom: '0px'

                   }}>
                      <img alt="" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 9'%3e%3cpath fill-rule='evenodd' fill='%23ADADAD' d='M11.98 9H3.54c-.23-2.04 1.54-4 4.22-4 1.44 0 2.68.6 3.44 1.52.6.71.89 1.6.78 2.48zM7.76 4.22c-1.1 0-2-.94-2-2.11S6.67 0 7.77 0s2 .94 2 2.1c0 1.18-.9 2.12-2 2.12zm-4.55.93c-.88 0-1.6-.76-1.6-1.7 0-.93.72-1.69 1.6-1.69.88 0 1.6.76 1.6 1.7 0 .93-.72 1.69-1.6 1.69zm.44.51l-.1.11A4.43 4.43 0 002.52 9H0c.2-1.88.77-3.34 3.52-3.34h.13z'/%3e%3c/svg%3e"
                      style={{
                        width: '14px',
                        height: '14px',
                        marginBottom: '1%',
                        marginLeft: '12%'
                      }}
                      />
                      <span style={{
                        paddingLeft: '3px',
                        marginBottom: '0px',
                        color: '#888'
                      }}>
                      {parseInt(streamer.total_view_cnt).toLocaleString()}
                      </span>
                    </p>

                </div>
            </div>

        </>
    );
  }
}

export default withRouter(BrowseItem);
