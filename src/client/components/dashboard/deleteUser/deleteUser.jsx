import React from 'react';
import { Loading } from 'carbon-components-react';
import '../../../resources/carbon-components.css'
import './deleteUser.css';
const _ = require('lodash');
class DisplayMultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayUsers: false
    }
  }
  render() {
    return (
      <div className='row' ref='selectedUsers' >
        <div role="listbox"
          aria-label="Choose an item"
          tabIndex="0"
          className="bx--multi-select bx--list-box"
          onChange={(evt) => { console.log(`action triggered`); this.setState({ displayUsers: !this.state.displayUsers }) }}
          onClick={(evt) => { console.log(`action triggered`); this.setState({ displayUsers: !this.state.displayUsers }) }}
        >
          <div role="button" className="bx--list-box__field" tabIndex="0" type="button" aria-label="close menu" aria-expanded="true" aria-haspopup="true">
            <div role="button" className="bx--list-box__selection bx--list-box__selection--multi" tabIndex="0" title="Clear all selected items">1
			              <svg fillRule="evenodd" height="10" role="img" viewBox="0 0 10 10" width="10" focusable="false" aria-label="Clear all selected items" alt="Clear all selected items">
                <title>Clear all selected items</title>
                <path d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"></path>
              </svg>
            </div>
            <span className="bx--list-box__label"></span>
            <div className="bx--list-box__menu-icon bx--list-box__menu-icon--open">
              <svg fillRule="evenodd" height="5" role="img" viewBox="0 0 10 5" width="10" alt="Close menu" aria-label="Close menu">
                <title>Close menu</title>
                <path d="M0 0l5 4.998L10 0z"></path>
              </svg>
            </div>
          </div>
          {console.log(this.state.displayUsers)}
          {this.state.displayUsers ?

            <div className="bx--list-box__menu" style={{ zIndex: 10000 }}>
              <div className="bx--list-box__menu-item bx--list-box__menu-item--active " id="downshift-0-item-0">
                <div className="bx--form-item bx--checkbox-wrapper" >
                  <input name="item-1" readOnly="" tabIndex="-1" type="checkbox" className="bx--checkbox" id="downshift-0-item-0" checked />
                  <label htmlFor="downshift-0-item-0" className="bx--checkbox-label">
                    <span className="" >item-1</span>
                  </label>
                </div>
              </div>
            </div> : ''}
        </div>
      </div>
    )
  }
}
class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      usersList: [],
      displayUsers: false
    }
  }

  displaySelectedUsers = () => {
    console.log(this.state.usersList)
    if (this.state.usersList.length === 0) {
      return 'Select Users To Delete'
    }
    else if (this.state.usersList.length <= 2) {
      let selectedUsersList = ''
      _.cloneDeep(this.state.usersList).forEach((item, index) => {
        selectedUsersList += `${item}${index !== 2 ? ',' : ''}`
      })
      console.log(selectedUsersList)
      return selectedUsersList
    }
    else {
      return 'Multiple Users Selected'
    }
  }
  updateSelectedValues = (evt) => {
    console.log(evt)
    const selectedValueParent = this.refs.selectedUsers.children[0].children[1].children;
    if (_.isEmpty(evt.selectedItems)) {
      _.forEach(selectedValueParent, (item, index) => {
        item.children[0].children[0].checked = false
      })
    }
    else {
      _.forEach(selectedValueParent, (item, index) => {
        if (evt.selectedItems[index]) {
          item.children[0].children[0].checked = true
        }
        else {
          item.children[0].children[0].value = false
        }
        console.log(`${index}-${selectedValueParent[index].children[0].children[0].checked}`);
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
              <div style={{ verticalAlign: 'baseline', marginTop: '1rem' }}><center><h3>Delete Customer Details</h3></center></div>
            </div>
          </div>
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <DisplayMultiSelect />
          </div>
        </div>
      </div>


    )
  }
}
export default DeleteUser