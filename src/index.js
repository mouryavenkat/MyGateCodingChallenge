import React from 'react';
//Order in which we import is always important. 
import './client/resources/carbon-components.css'

import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import DashboardComponent from './client/components/dashboard/dashboard';
class App extends React.Component {
  render() {
    return (
      
        <BrowserRouter>
          <React.Fragment>
            {/* <Route path='/' render={() => { return <div><DashboardComponent /><LoginComponent /></div> }} /> */}
            <Route path='/dashboard' component={DashboardComponent} />
          </React.Fragment>
        </BrowserRouter>
      
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
