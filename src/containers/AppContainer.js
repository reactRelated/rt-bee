import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  };

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store ,history} = this.props;

    return (
      <Provider store={store}>
        <div>
          <Router history={history}  routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}


export default AppContainer
