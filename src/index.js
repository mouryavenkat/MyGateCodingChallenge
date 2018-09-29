import React from 'react';
//Order in which we import is always important. 
import './resources/carbon-components.css'

import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import LoginComponent from './components/Login/loginComponent';
import CreateTeam from './components/dashboard/createTeam/createTeam';
import DashboardComponent from './components/dashboard/dashboard';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          {/* <Route path='/' render={() => { return <div><DashboardComponent /><LoginComponent /></div> }} /> */}
          <Route path='/login' component={LoginComponent} />
          <Route path='/dashboard' component={DashboardComponent} />
          <Route path='/createGroup' render={() => {
            return (
              <div>
                <DashboardComponent />
                <CreateTeam ref='createTeam'/>
              </div>
            )
          }} />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
