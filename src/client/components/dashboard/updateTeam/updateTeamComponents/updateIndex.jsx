import React from 'react';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import UpdatePaymentDetails from './UpdatePaymentDetails';
import AddUsersToTeam from './AddUsersToTeam';
import UpdateBid from './updateBid'
class UpdateTeamSubComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      switchContext: 'AddUsersToTeam'
    }
  }
  render() {
    return (
      <div className='container'>
        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block' }}>
            <ContentSwitcher onChange={(evt) => {
              if (evt.index === 0) {
                this.setState({ switchContext: 'AddUsersToTeam' })
              }
              else if (evt.index == 1) {
                this.setState({ switchContext: 'UpdatePaymentDetails' })
              }
              else if (evt.index === 2) {
                this.setState({ switchContext: 'UpdateBidDetails' })
              }
            }}>
              <Switch name="Add User To Team" text="Add User To Team" />
              <Switch name="Update Payment Details" text="Update Payment Details" />
              <Switch name="Update Bid Details" text="Update Bid Details" />
            </ContentSwitcher>
          </div>
        </div>
        <hr width='100%'></hr>
        <div>
          {this.state.switchContext === 'AddUsersToTeam' ?
            <AddUsersToTeam updateParentState={this.props.updateParentState} groupName={this.props.groupName} /> : ''
          }
        </div>
        {this.state.switchContext === 'UpdatePaymentDetails' ? <UpdatePaymentDetails groupName={this.props.groupName} updateParentState={this.props.updateParentState} /> : ''}
        {this.state.switchContext === 'UpdateBidDetails' ? <UpdateBid updateParentState={this.props.updateParentState}/> : ''}
      </div>
    )
  }
}
export default UpdateTeamSubComponent;