import React from 'react';
import { ComposedModal, ModalHeader, ModalBody, ModalFooter, Loading } from 'carbon-components-react';
const axios = require('axios');
class DeleteTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }
  deleteTeam = async () => {
    console.log(`deleting group ${this.props.groupNameToDelete}`)
    this.setState({ isLoading: true });
    try {
      await axios({
        url: `http://localhost:8080/deleteGroup/?groupName=${this.props.groupNameToDelete}&admin=mourya.g9@gmail.com`, // admin name to be changed once session implementation is done.
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        method: 'DELETE',
        json: true,
        rejectUnauthorized: false,
        crossdomain: true
      })
      this.setState({ isLoading: false });
      this.props.changeState('showModalForDeleteteam', false)
      console.log(this.props.setOfGroups.filter((item) => {
        return item.groupName !== this.props.groupNameToDelete
      }))
      this.props.changeState(
        'setOfGroups', this.props.setOfGroups.filter((item) => {
          return item.groupName !== this.props.groupNameToDelete
        })
      )
      this.props.parentChangeState('successMessage', `Deleted group ${this.props.groupNameToDelete}`);
    }
    catch (ex) {
      console.log(ex);
      this.props.changeState('showModalForDeleteteam', false)
      this.props.parentChangeState('errorMessage', `Unable to delete Group->${ex.message}`);
    }
  }
  render() {
    return (
      <div>
        <Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} />
        <ComposedModal open >
          <ModalHeader
            title={`Delete Team ${this.props.groupNameToDelete}`}
            iconDescription="Close"
          />
          <ModalBody>
            <p className="bx--modal-content__text">
              Deleting a Team mean, You cannot recover it back neither track it. Would You still prefer to Delete?
            </p>
          </ModalBody>
          <ModalFooter
            primaryButtonText="Delete"
            primaryButtonDisabled={false}
            onRequestSubmit={(evt) => this.deleteTeam()}
          />
        </ComposedModal>
      </div>
    )
  }
}
export default DeleteTeam;