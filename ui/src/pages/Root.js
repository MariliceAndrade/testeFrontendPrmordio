import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import PagesAddressSearch from 'pages/Address/Search/Search';
import PagesAddressForm from './Address/Form/Form';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create' component={PagesAddressForm} />
        <Route path='/edit/:id' component={PagesAddressForm} />
        <Route path='/' component={PagesAddressSearch} />
      </Switch>
    </Router>
  )
}

export default Root;