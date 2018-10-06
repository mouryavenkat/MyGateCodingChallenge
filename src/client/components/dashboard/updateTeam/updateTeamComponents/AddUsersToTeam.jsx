import React from 'react';
import { Button, Loading, TextInput } from 'carbon-components-react'
import './AddUsersToTeam.css';
import Request from '../../../../utilities/request'
const _ = require('lodash');
class AddUsersToTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedStatus: [],
      selectedUsers: [],
      displayMenu: false,
      isLoading: false,
      usersUnderAdmin: [],
      usersUnderAdminCopy: [],
      filter: ''
    }
  }
  fetchUsersUnderAdmin = async () => {
    try {
      let usersUnderAdmin = await Request(`http://localhost:8080/fetchUsers/?admin=${sessionStorage.getItem('user')}`);
      const existingUsersUnderGroup = await Request(`http://localhost:8080/fetchUsersUnderGroup/?admin=${sessionStorage.getItem('user')}&groupName=${this.props.groupName}`)
      usersUnderAdmin = usersUnderAdmin.filter((item) => {
        if (existingUsersUnderGroup.indexOf(item.emailId) === -1) {
          return item
        }
      })
      this.setState({ usersUnderAdmin, usersUnderAdminCopy: usersUnderAdmin })
      this.setState({ checkedStatus: Array.from({ length: usersUnderAdmin.length }, () => false) }, () => {
        console.log('done changing checkedstatus');
      })
      console.log(usersUnderAdmin);
    }
    catch (ex) {
      console.log(ex.message);
    }
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    await this.fetchUsersUnderAdmin()
    this.setState({ isLoading: false })
  }
  showMenu = (evt) => {
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }
  closeMenu = (evt) => {
    // if (!this.dropdownMenu.contains(evt.target)) {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
    //}
  }
  changeChecked = (item) => {
    // When user selected an item, The writable div should again start with empty filter.
    this.setState({ filter: '' }, () => {
      if (this.state.filter === '' && this.state.selectedUsers.length > 0) {
        this.refs.filterRef.innerHTML = ''
      }
    })
    // Push the item selected to selectUsers
    const selectedUsers = this.state.selectedUsers;
    selectedUsers.push(item)
    this.setState({
      selectedUsers
    })
    // Remove the selected user from available users selection.
    const usersUnderAdmin = this.state.usersUnderAdmin.filter((item, index) => {
      if (_.isUndefined(_.find(this.state.selectedUsers, { name: item.name }))) {
        return item
      }
    })
    console.log(usersUnderAdmin)
    this.setState({
      usersUnderAdmin, usersUnderAdminCopy: usersUnderAdmin
    })
  }
  updateTeamWithUsers = async () => {
    this.setState({ isLoading: true })
    const selectedUsers = this.state.selectedUsers.map((item) => {
      return item.emailId
    })
    const url = `http://localhost:8080/updateGroup/?admin=${sessionStorage.getItem('user')}&type=addUsers&groupName=${this.props.groupName}`;
    try {
      await Request(url, {
        method: 'PUT',
        body: JSON.stringify(selectedUsers),
        headers: { 'Content-Type': 'application/json' }
      })
      this.setState({ isLoading: false });
      this.setState({ selectedUsers: [] })
      this.props.updateParentState('successMessage', `Successfully added user Under Team ${this.props.groupName}`);
    }
    catch (ex) {
      console.log(ex.message);
      this.setState({ isLoading: false });
      this.props.updateParentState('errorMessage', ex.message);
    }
  }
  displayUsersUnderAdmin = () => {
    return this.state.usersUnderAdminCopy.map((item, index) => {
      return <div className="bx--list-box__menu-item" id={`downshift-item-${index}`} key={index} style={{ textAlign: 'left' }}>
        <div className="bx--form-item bx--checkbox-wrapper" onClick={evt => this.changeChecked(item)}>
          <input name={`item-${index}`} tabIndex="-1" type="checkbox" className="bx--checkbox" id={`downshift-item-${index}`} checked={this.state.checkedStatus[index]} />
          <label htmlFor={`downshift-item-${index}`} style={{ textAlign: 'left' }}>
            <span className="">{item.name}</span>
          </label>
        </div>
      </div>
    })
  }
  filterUsers = (userInput) => {

    // Run time filtering of users based on the text entered.
    const usersUnderAdmin = this.state.usersUnderAdmin;
    this.setState({
      usersUnderAdminCopy: usersUnderAdmin.filter((item) => {
        return item.name.search(userInput) !== -1
      })
    })

  }
  deleteUserFromSelectedUsers = (userToDelete) => {
    this.setState({
      selectedUsers: this.state.selectedUsers.filter((item) => {
        if (item.name !== userToDelete) {
          return item
        }
      })
    })
    const usersUnderAdmin = this.state.usersUnderAdmin;
    usersUnderAdmin.push({ name: userToDelete });
    this.setState({
      usersUnderAdminCopy: usersUnderAdmin,
      usersUnderAdmin
    })
  }
  render() {
    const displaySelectedUsers = this.state.selectedUsers.map((item, index) => {
      return <div style={{ display: 'inline-block', backgroundColor: '#3d70b2', fontSize: '0.875rem', borderRadius: '12px', height: '1.5rem', marginTop: '0.3rem', marginLeft: '.5rem' }}>
        <div style={{ margin: '0.5rem', marginTop: '0.3rem', color: 'white' }}>{item.name}
          <svg width="16" height="16" viewBox="0 0 16 16" fill='white' style={{ marginLeft: '0.5rem' }} onClick={evt => this.deleteUserFromSelectedUsers(item.name)}>
            <path d="M8 14.5c3.6 0 6.5-2.9 6.5-6.5S11.6 1.5 8 1.5 1.5 4.4 1.5 8s2.9 6.5 6.5 6.5zM8 16c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
            <path d="M8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6z" />
          </svg>
        </div>
      </div>
    })
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '60%', marginTop: '1rem' }}>
            <Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} />
            <div className='row' >
              <label htmlFor='groups' className='bx--label'>Select Users</label>
              <div role="listbox"
                aria-label="Choose an item"
                tabIndex="0"
                className="bx--multi-select bx--list-box"
                style={{ outline: 'none' }}
                onClick={evt => this.showMenu()}>
                <div className='row' style={{ marginLeft: '.5rem' }}>

                  <div style={{ textAlign: 'left' }}>
                    {displaySelectedUsers}
                  </div>

                  <div contentEditable="true" className='writeableDiv'
                    onInput={evt => {
                      this.setState({ filter: evt.target.textContent }, () => {
                      })
                      this.filterUsers(evt.target.textContent)
                    }}
                    ref='filterRef'
                  >
                  </div>
                </div>
                {this.state.displayMenu === true ?
                  <div className="bx--list-box__menu" ref={(element) => { this.dropdownMenu = element }}>
                    {this.displayUsersUnderAdmin()}
                  </div> : ''}
              </div>
            </div>
            <br />
            <div>
              <Button onClick={evt => this.updateTeamWithUsers()}>Add Users To Team</Button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
export default AddUsersToTeam;



//  evt.target.textContent is used to get the text written on editable div
//  contentEditable is used to write content on any tag
