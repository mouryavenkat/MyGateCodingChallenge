import React, { Fragment } from 'react';
import './dashboard.css'
import CreateTeam from './createTeam/createTeam';
import CreateUser from './createUser/createUser';
import DeleteUser from './deleteUser/deleteUser'
import UpdateTeam from './updateTeam/updateTeam';
import UpdateUser from './updateUser/updateUser';
import UpdateBid from './updateBid/updateBid'
const _ = require('lodash');
class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayScreen: 'home',
      errorMessage: '',
      successMessage: '',
      redirectToLoginPage: false
    }
  }
  redirect() {
    this.props.history.push('/login')
  }
  componentDidMount() {
    console.log(sessionStorage.getItem('user') === null)
    console.log(sessionStorage.getItem('user'))
    if (sessionStorage.getItem('user') !== null) {
      console.log(sessionStorage.getItem('user'))
      console.log('UserInfo found in local storage');
    }
    else {
      fetch('http://localhost:8080/fetchUserInfo', {
        credentials: 'include' // include sends cookie information from client to server.
      }).then(response => response.json())
        .then(response => {
          if (response.user) {
            sessionStorage.setItem('user', response.user);
          }
          else {
            console.log('Redirecting to login page');
            this.setState({ redirectToLoginPage: true });
          }
        })
    }
  }
  changeState = (stateName, stateValue) => {
    this.setState({ [stateName]: stateValue })
  }
  sideBarMenu = () => {
    return <ul className="bx--list--unordered" style={{ cursor: 'pointer' }}>
      <li className="bx--list__item" data-toggle="collapse" data-target="#createList" style={{ marginBottom: '0.5rem' }} >CREATE
        <ul className="bx--list--unordered collapse" id='createList' style={{ marginTop: '0.5rem', padding: '0rem', marginLeft: '1rem' }} >
          <li className="bx--list__item" style={{ marginBottom: '0.2rem' }} onClick={(evt) => { this.setState({ displayScreen: 'createGroup' }) }}>CREATE GROUP</li>
          <li className="bx--list__item" style={{ marginBottom: '0.5rem' }} onClick={(evt) => { this.setState({ displayScreen: 'createUser' }) }}>CREATE USER</li>
        </ul>
      </li>
      <li className="bx--list__item" data-toggle="collapse" data-target="#viewList" style={{ marginBottom: '0.5rem' }}>VIEW
        <ul className="bx--list--unordered collapse" id='viewList' style={{ marginTop: '0.5rem', padding: '0rem', marginLeft: '1rem' }}>
          <li className="bx--list__item" style={{ marginBottom: '0.2rem' }}>VIEW TEAM</li>
          <li className="bx--list__item" style={{ marginBottom: '0.5rem' }}>VIEW USER</li>
        </ul>
      </li>
      <li className="bx--list__item" data-toggle="collapse" data-target="#updateList" style={{ marginBottom: '0.5rem' }}>UPDATE
        <ul className="bx--list--unordered collapse" id='updateList' style={{ marginTop: '0.5rem', padding: '0rem', marginLeft: '1rem' }}>
          <li className="bx--list__item" style={{ marginBottom: '0.2rem' }} onClick={(evt) => { this.setState({ displayScreen: 'updateTeam' }) }}>UPDATE TEAM</li>
          <li className="bx--list__item" style={{ marginBottom: '0.2rem' }} onClick={(evt) => { this.setState({ displayScreen: 'updateUser' }) }}>UPDATE USER</li>
          <li className="bx--list__item" style={{ marginBottom: '0.5rem' }} onClick={(evt) => { this.setState({ displayScreen: 'updateBid' }) }}>UPDATE BID</li>
        </ul>
      </li>
      <li className="bx--list__item" data-toggle="collapse" data-target="#deleteList" style={{ marginBottom: '0.5rem' }}>DELETE
        <ul className="bx--list--unordered collapse" id='deleteList' style={{ marginTop: '0.5rem', padding: '0rem', marginLeft: '1rem' }}>
          <li className="bx--list__item" style={{ marginBottom: '0.2rem' }}>CREATE TEAM</li>
          <li className="bx--list__item" style={{ marginBottom: '0.5rem' }} onClick={(evt) => { this.setState({ displayScreen: 'deleteUser' }) }}>DELETE USER </li>
        </ul>
      </li>
    </ul >
  }
  render() {
    return (
      <div>
        {this.state.redirectToLoginPage === true ? <Fragment>
          {this.redirect()}
        </Fragment> : ''}
        <div style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <nav aria-label="Top Header" className='bx--top-nav' role="navigation" style={{ height: '3.2rem' }}>
            <button style={{ backgroundColor: '#0f212e', border: 'none', position: 'absolute', left: '1%', height: '3.2rem' }}>
              <img src={require('../../resources/images/logo.svg')} style={{ marginTop: '0.5rem', marginBottom: '0.5rem', width: '2rem' }} />
            </button>
            <div className="dropdown" style={{ right: '1%', position: 'absolute', }}>
              <button style={{ backgroundColor: '#0f212e', border: 'none', height: '3.2rem' }} >
                <center><img src={require('../../resources/images/userprofile.svg')} style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} /></center>

              </button>
            </div>
          </nav>
        </div>
        <div className='sideBarWidth' >
          <div style={{ backgroundColor: '#f4f7fb' }}>
            {this.sideBarMenu()}
          </div>
        </div>
        {this.state.errorMessage !== '' ?
          <div role="alert" kind="error" className="bx--toast-notification bx--toast-notification--error" style={{ top: '3.4rem', right: 0, position: 'fixed', zIndex: 100000 }}>
            <div className="bx--toast-notification__details">
              <h3 className="bx--toast-notification__title"> Error </h3>
              <div className="bx--toast-notification__caption">{this.state.errorMessage}</div>
            </div>
            <button type="button" className="bx--toast-notification__close-button" onClick={(evt) => this.changeState('errorMessage', '')}>
              <svg className="bx--toast-notification__icon" fillRule="evenodd" height="10" role="img" viewBox="0 0 10 10" width="10" aria-label="close icon" alt="close icon">
                <title>close Notification</title>
                <path d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"></path>
              </svg>

            </button>

          </div>
          : ''}
        {this.state.successMessage !== '' ?
          <div role="alert" kind="error" className="bx--toast-notification bx--toast-notification--success" style={{ top: '3.4rem', right: 0, position: 'fixed', zIndex: 100000 }}>
            <div className="bx--toast-notification__details">
              <h3 className="bx--toast-notification__title"> Success </h3>
              <div className="bx--toast-notification__caption">{this.state.successMessage}</div>
            </div>
            <button type="button" className="bx--toast-notification__close-button" onClick={(evt) => this.changeState('successMessage', '')}>
              <svg className="bx--toast-notification__icon" fillRule="evenodd" height="10" role="img" viewBox="0 0 10 10" width="10" aria-label="close icon" alt="close icon">
                <title>close Notification</title>
                <path d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"></path>
              </svg>
            </button>
          </div>
          : ''}
        <div style={{ marginTop: '3.4rem', marginLeft: '272px', position: 'relative' }} >
          {this.state.displayScreen === 'createGroup' ? <CreateTeam changeState={this.changeState} /> : ''}
          {this.state.displayScreen === 'createUser' ? <CreateUser changeState={this.changeState} /> : ''}
          {this.state.displayScreen === 'deleteUser' ? <DeleteUser changeState={this.changeState} /> : ''}
          {this.state.displayScreen === 'updateTeam' ? <UpdateTeam changeState={this.changeState} /> : ''}
          {this.state.displayScreen === 'updateUser' ? <UpdateUser changeState={this.changeState} /> : ''}
          {this.state.displayScreen === 'updateBid' ? <UpdateBid changeState={this.changeState} /> : ''}
        </div>
      </div >
    )
  }
}
export default DashboardComponent