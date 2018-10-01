import React from 'react';
import './updateTeam.css';
import { Button, Loading } from 'carbon-components-react'
import DeleteTeam from './deleteTeam';
import UpdateTeamSubComponent from './updateTeamComponents/updateIndex'
const _ = require('lodash');
const axios = require('axios');

class DisplayAllTeams extends React.Component {
  render() {
    return (
      <div className='row'>
        {this.props.setOfGroups.map((item, index) => {
          return <div className='col' style={{ maxWidth: '21rem' }} key={index}>
            <div
              className="card"
              style={{ width: '18rem', borderTop: '5px solid #3d70b2', margin: '1.25rem', height: '17rem' }}>
              <div style={{ margin: '.5rem', height: '4rem', backgroundColor: '#f4f7fb' }}>
                <center>
                  <img
                    src={require('../../../resources/images/cardLogo.svg')}
                    style={{ verticalAlign: 'baseline', marginTop: '0.7rem', height: '2.6rem' }}
                    
                    >
                  </img>
                </center>
              </div>
              <div className="card-body" style={{ paddingLeft: '.5rem' }}>
                <h5 className="card-title">{item.groupName.toUpperCase()}</h5>
                <div style={{ marginTop: '.5rem', maxHeight: '4.5rem', height: '4.5rem', overflow: 'auto', position: 'absolute' }}>
                  <p className="card-text">{item.description}</p>
                </div>
                <div style={{ right: '0.5rem', bottom: '.5rem', position: 'absolute', marginTop: '.5rem' }}>
                  <Button className='bx--btn--danger' style={{ marginTop: '1rem', right: '10px', marginRight: '1rem' }}
                    onClick={(evt) => {
                      this.props.changeState('showModalForDeleteteam', true);
                      this.props.changeState('groupNameToDelete', item.groupName);
                    }}>Delete</Button>
                  <Button style={{ marginTop: '1rem', right: '0.5rem' }} onClick={(evt) => {
                    this.props.changeState('UpdateTeam', item.groupName)
                    
                  }}>Update</Button>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    )
  }
}
class UpdateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      displayGroups: false,
      setOfGroups: [],
      showModalForDeleteteam: false,
      groupNameToDelete: '',
      UpdateTeam: ''
    }
  }
  componentDidMount = () => {
    this.fetchAllTeamsUnderAdmin().then(() => {
    }).catch((ex) => {
      console.log(ex.message);
      this.props.changeState('errorMessage', ex.message);
    })
    console.log('component  mounted')
  }
  fetchAllTeamsUnderAdmin = async () => {
    //Have to write implementation to fetch all the Group's Under User Team.
    this.setState({ isLoading: true });
    try {
      const response = await axios({
        url: `http://localhost:8080/fetchGroups/?admin=${sessionStorage.getItem('user')}`, // Teams Under Admin has to picked from database by passing admin session.
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        method: 'GET',
        json: true,
        rejectUnauthorized: false,
        crossdomain: true
      })
      console.log(response);
      this.setState({ isLoading: false });
      this.setState({ displayGroups: true });
      this.setState({ setOfGroups: !_.isUndefined(response.data) ? response.data : [] })
    }
    catch (ex) {
      console.log(ex.message);
    }
  }
  changeState = (stateName, stateValue) => {
    this.setState({ [stateName]: stateValue })
    console.log(stateName, stateValue);
  }
  render() {
    return (
      <div style={{ position: 'absolute', width: '100%' }} >
        {this.state.showModalForDeleteteam === true ? <DeleteTeam changeState={this.changeState} parentChangeState={this.props.changeState} groupNameToDelete={this.state.groupNameToDelete} setOfGroups={this.state.setOfGroups} /> : ''}
        <Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} />

        {this.state.UpdateTeam !== '' ?
          (<UpdateTeamSubComponent groupName={this.state.UpdateTeam} />) :

          this.state.displayGroups ?

            <div className='container-fluid'>
              <DisplayAllTeams setOfGroups={this.state.setOfGroups} changeState={this.changeState} parentStateChange={this.props.changeState} />
            </div> : ''}
      </div>

    )
  }
}
export default UpdateTeam;