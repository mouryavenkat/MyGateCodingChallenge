import React from 'react';
import { ComboBox, Loading, TextInput } from 'carbon-components-react';
import './updateUser.css';
const _ = require('lodash');
class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      userDetails: {}
    }
  }
  populateUserDetails = (item) => {
    if (!_.isNull(item)) {
      // Code to fetch user details.......................
      this.setState({
        userDetails: {
          emailId: 'mourya.g9@gmail.com',
          customername: 'mourya',
          customerMobile: '9943638794',
          gender: '',
          proof: ''
        }
      })
    }
  }
  render() {
    return (
      <div>
        <div className='container' style={{ marginTop: '10%' }}>
          <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}><Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} /></div>
          <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}>
            <div className='row' style={{ backgroundColor: '#dfe6eb', height: '3.5rem' }}>
              <center><div style={{ verticalAlign: 'baseline', marginTop: '1rem' }}><h3>Delete Customer Details</h3></div></center>
            </div>
          </div>
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <label htmlFor='usersList' className='bx--label'>Select User</label>
              <ComboBox id='usersList'
                items={[
                  { id: 'option-1', text: 'Option 1' },
                  { id: 'option-2', text: 'Option 2' },
                  { id: 'option-3', text: 'Option 3' },
                ]}
                itemToString={(item) => { if (item) return item.id }}
                placeholder=""
                className='fillWidth'
                onChange={(evt) => { this.populateUserDetails(evt.selectedItem) }}
              />
            </div>
            <br />
            {!_.isEmpty(this.state.userDetails) ?
              <div className='row'>
                <TextInput id='name' labelText='Customer Name' disabled/>
              </div>
              : ''}
          </div>

        </div>
      </div>
    )
  }
}
export default UpdateUser;