import React from 'react';
import VodList from './ListsAndButtons/VodList';
import { withRouter } from 'react-router';
import { status, json } from '../utilities/requestHandlers';
import info from '../config';
import PropTypes from 'prop-types';
import LoginContext from '../contexts/login';
import { Spin } from 'antd';

class Vods extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      vods: [],
      noneFoundInit: false,
      noneFoundFetch: false,
      noneFound: false,
      refreshed: false,
      mounted: false
    };
  }

  static propTypes = {
    match: PropTypes.object
  }

  static contextType = LoginContext;

  componentDidMount () {
    this.setState({ mounted: true });
    const id = this.props.match.params.id;
    let url = info.url + `streamers/${id}/vods`;
    fetch(url, {
      method: 'GET',
      headers: {
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (!this.state.mounted) {
          return;
        }
        // sort vods by date released property
        data.sort(function (a, b) {
          return new Date(b.date_released) - new Date(a.date_released);
        });
        // console.log(data)
        this.setState({ vods: data });
      })
      .catch(err => {
        if (!this.state.mounted) {
          return;
        }
        if (err.status === 404) {
          this.setState({ noneFoundInit: true });
        }
      });

    // Automatically fetching new vods to update the page
    url = info.url + `streamers/${id}/fetchVods`;
    const body = {
      cookie: this.context.cookie,
      num: 40,
      addDb: true
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        if (!this.state.mounted) return;
        if (!data.success === true && this.state.noneFoundInit === true) {
          this.setState({ noneFound: true });
          this.setState({ refreshed: true });
          return;
        }
        if (!data.success) this.setState({ refreshed: true });
        const currVods = this.state.vods;
        let vods = data.vods;
        // adding new vods
        if (!this.state.noneFoundInit) {
          vods = vods.reverse();
          for (let i = 0; i < vods.length; i++) {
            currVods.unshift(vods[i]);
          }
          this.setState({ vods: currVods });
          this.setState({ refreshed: true });
          return;
        }

        // no vods present
        for (let i = 0; i < vods.length; i++) {
          currVods.push(vods[i]);
        }
        this.setState({ vods: currVods });
        this.setState({ noneFound: false });
        this.setState({ refreshed: true });
      })
      .catch(err => {
        if (!this.state.mounted) {
          return;
        }
        if (err.status === 404) {
          this.setState({ noneFoundFetch: true });
          // if (this.state.noneFoundInit && this.state.noneFoundFetch) this.setState({ noneFound: true });
        }
      });
  }

    handleFetchVods = (vods) => {
      if (!this.state.mounted) return;
      const currVods = this.state.vods;

      // adding new vods
      if (!this.state.noneFound) {
        vods = vods.reverse();
        for (let i = 0; i < vods.length; i++) {
          currVods.unshift(vods[i]);
        }
        this.setState({ vods: currVods });
        return;
      }

      // no vods present
      for (let i = 0; i < vods.length; i++) {
        currVods.push(vods[i]);
      }
      this.setState({ vods: currVods });
      this.setState({ noneFound: false });
    }

    componentWillUnmount () {
      this.setState({ mounted: false });
    }

    render () {
      return (
            <>
            {!this.state.refreshed
              ? <>
              <Spin style = {{ position: 'absolute', left: 150, marginTop: 170 }}/>
              </>
              : null}
            <VodList noneFound = {this.state.noneFound} vods = {this.state.vods} handleFetchVods = {this.handleFetchVods}/>
            </>
      );
    }
}

export default withRouter(Vods);
