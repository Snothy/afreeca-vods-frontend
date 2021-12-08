import React from 'react';
import PropTypes from 'prop-types';

class VodButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  static propTypes = {
    onStatusChange: PropTypes.func,
    vod: PropTypes.arrayOf(PropTypes.object)
  }

  changeSrc = (e) => {
    // console.log(e.target.value);
    this.props.onStatusChange(e.target.value);
  }

  render () {
    const vodLinks = [];
    for (let i = 0; i < this.props.vod.length; i++) {
      vodLinks.push(this.props.vod[i].vod_link);
    }

    return (
          <>
          <ul style={{
            float: 'left'
          }}>
              {vodLinks.map((vodLink, index) => {
                return (
                      <li key={index}>

                          <button
                          onClick={this.changeSrc}
                          value={vodLink}
                          className="btn-basic blue1"
                          style={{

                          }}
                          >
                              Segment {index + 1}
                          </button>

                      </li>
                );
              })}
          </ul>
          </>
    );
  }
}

export default VodButton;
