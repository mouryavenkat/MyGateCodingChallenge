import React, { Fragment } from 'react';
import './dashboard.css'
import ViewFoodCourts from './ViewFoodCourts/ViewFoodCourts'
import AddFoodCourt from './AddFoodCourt/AddFoodCourt'
import { Search } from 'carbon-components-react'
class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayScreen: 'home',
      errorMessage: '',
      successMessage: '',
      redirectToLoginPage: false,
      displayOverFlowOptions: false,
      viewTeamInnerState: false,
      searchText: ''
    }
  }
  changeState = (stateName, stateValue) => {
    this.setState({ [stateName]: stateValue })
  }
  sideBarMenu = () => {
    return <ul className="bx--list--unordered" style={{ cursor: 'pointer' }}>
      <li className="bx--list__item" style={{ marginBottom: '0.5rem' }} onClick={evt => this.setState({ displayScreen: 'addFoodCourts' })}>
        ADD FOOD COURT
      </li>
      <li className="bx--list__item" style={{ marginBottom: '0.5rem' }} onClick={evt => this.setState({ displayScreen: 'viewFoodCourts' })}>
        VIEW FOOD COURTS
      </li>
    </ul >
  }
  render() {
    return (
      <div>
        {/* Navigaton bar */}
        <div style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <nav aria-label="Top Header" className='bx--top-nav' role="navigation" style={{ height: '3.2rem' }}>
            <div className="bx--top-nav__left-container " >
              <div style={{ height: "100%" }}>
                <button style={{ backgroundColor: '#0f212e', border: 'none', position: 'absolute', height: '3.2rem' }}>
                  <img src={require('../../resources/images/logo.svg')} style={{ width: '2rem' }} />
                </button>
              </div>
            </div>
            <div className="bx--top-nav__right-container " >

              {/* Show serch bar only when user tries to view the food courts */}

              {this.state.displayScreen === 'viewFoodCourts' ?
                <Search
                  labelText="Search"
                  closeButtonLabelText=""
                  placeHolderText="Search"
                  id="search-1"
                  placeHolderText='Search By name/address/expiry date'
                  className='searchWidth'
                  value={this.state.searchText}
                  onChange={(evt) => {
                    this.changeState('searchText', evt.target.value)
                  }}
                /> : ''}
            </div>

          </nav>
        </div>
        <div className='sideBarWidth' >
          <div style={{ backgroundColor: '#f4f7fb' }}>
            {this.sideBarMenu()}
          </div>
        </div>


        {/* This below section is to let the end user notify about any success or failure messages */}


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
          {this.state.displayScreen === 'addFoodCourts' ? <AddFoodCourt changeState={this.changeState} /> : ''}
          {this.state.displayScreen === 'viewFoodCourts' ? <ViewFoodCourts changeState={this.changeState} viewTeamInnerState={this.state.viewTeamInnerState} searchText={this.state.searchText} /> : ''}
        </div>
      </div >
    )
  }
}
export default DashboardComponent