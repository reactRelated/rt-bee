import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import Header from '../components/Header'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory} >
            {routes}

        </Router>
      </Provider>
    )
  }
}
export default AppContainer
