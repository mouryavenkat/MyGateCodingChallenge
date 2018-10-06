import React from 'react';
import { TextInput, NumberInput, DatePicker, DatePickerInput, Button, Loading } from 'carbon-components-react'
import '../../../resources/customStyles.css';
import './createTeam.css'
import Request from '../../../utilities/request'
class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalMembers: 1,
      isLoading: false,
      groupName: '',
      groupBudget: '',
      fromDate: '',
      toDate: '',
      chitCommission: '',
      description: ''
    }
  }
  resetState = () => {
    this.setState({
      totalMembers: 1,
      isLoading: false,
      groupName: '',
      groupBudget: '',
      fromDate: '',
      toDate: '',
      chitCommission: '',
      description: ''
    })
  }
  timeOutForNotification = (stateName, stateValue, initialState) => {
    this.props.changeState(stateName, stateValue);
    setTimeout(() => {
      this.props.changeState(stateName, initialState);
    }, 5000)
  }
  formPayments = (fromDate, totalMonths) => {
    const paymentInfo = {};
    [...Array(totalMonths)].map((item, month) => {
      const paymentMonth = `${(fromDate.month + month) % 12}/${fromDate.year + Math.floor((fromDate.month + month) / 12)}`
      paymentInfo[paymentMonth] = {}
    })
    return paymentInfo
  }
  formGroupSchema = () => {
    const totalMembers = this.state.totalMembers;
    const groupName = this.state.groupName;
    const groupBudget = this.state.groupBudget;
    const fromDate = this.state.fromDate;
    const toDate = this.state.toDate;
    const description = this.state.description;
    const chitCommission = this.state.chitCommission;
    const admin = sessionStorage.getItem('user');
    const totalMonths = (toDate.year - fromDate.year) * 12 + (toDate.month - fromDate.month);
    const customers = [] // Set initial customers list to empty
    const payments = this.formPayments(fromDate, totalMonths);
    const ActualPayPerMonth = groupBudget / totalMonths; // Actual Amount an indicidual need to pay every month;
    const GroupStructure = {
      groupName,
      groupBudget,
      totalMembers,
      fromDate,
      toDate,
      totalMonths,
      chitCommission,
      description,
      customers,
      admin,
      payments,
      ActualPayPerMonth
    }
    return GroupStructure;
  }
  createGroupAndUpdateAdmin = async (event) => {
    // this.setState({ isLoading: true })
    const groupSchema = this.formGroupSchema();
    console.log(groupSchema)
    const requestBodyForPayments = {
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      totalMonths: (this.state.toDate.year - this.state.fromDate.year) * 12 + (this.state.toDate.month - this.state.fromDate.month)
    }
    console.log(`Request body for payments ${JSON.stringify(requestBodyForPayments)}`)
    try {
      //Save group details to DB has to be implemented
      const groupCreationResponse = await Request('http://localhost:8080/createGroup', {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        method: 'POST',
        body: JSON.stringify(groupSchema),
        credentials: 'include'
      })
      if (groupCreationResponse.code === 500) {
        this.timeOutForNotification('errorMessage', groupCreationResponse.message, '');
      }
      // Add The GroupName Under Admin.
      const updateAdminResponse = await Request(`http://localhost:8080/addTeamsUnderAdmin/?adminId=${sessionStorage.getItem('user')}&teamName=${this.state.groupName}`, {
        method: 'PUT',
        credentials: 'include',
      })
      if (updateAdminResponse.code === 500) {
        this.timeOutForNotification('errorMessage', updateAdminResponse.message, '');
      }
      this.setState({ isLoading: false })
      //this.resetState()
      this.timeOutForNotification('successMessage', `Sucessfully created Group ${this.state.groupName}`, '')
    }
    catch (ex) {
      this.setState({ isLoading: false });
      this.resetState();
      this.timeOutForNotification('errorMessage', `Unable to created Group.${ex.message}`, '')
    }
  }
  render() {
    return (
      <div>
        <div className='container' style={{ marginTop: '10%' }}>
          <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}><Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} /></div>
          <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}>
            <div className='row'>
              <div style={{ backgroundColor: '#dfe6eb', height: '3.5rem', textAlign: 'center', width: '100%' }}>
                <div style={{ verticalAlign: 'baseline', marginTop: '1rem', display: 'inline-block' }}><h3>Create New Chit Group</h3></div>
              </div>
            </div>

          </div>
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='groupname'
                placeholder='Enter name of group to be created'
                labelText={<span>Group Name<span style={{ color: 'red' }}> *</span></span>}
                onChange={(evt) => { this.setState({ groupName: evt.target.value }) }}
                value={this.state.groupName}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='description'
                placeholder='Enter text to describe the group'
                labelText={<span>Group Description<span style={{ color: 'red' }}> *</span></span>}
                onChange={(evt) => { this.setState({ description: evt.target.value }) }}
                value={this.state.description}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='groupBudget'
                labelText={<span>Group Budget<span style={{ color: 'red' }}> *</span></span>}
                placeholder='Enter total budget of the group'
                onChange={(evt) => { this.setState({ groupBudget: evt.target.value }) }}
                value={this.state.groupBudget}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='chitCommission'
                labelText={<span>Chit Commission<span style={{ color: 'red' }}> *</span></span>}
                placeholder='Enter Chit Commission'
                onChange={(evt) => { this.setState({ chitCommission: evt.target.value }) }}
                value={this.state.chitCommission}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className="row" >
              <NumberInput
                id="totalMembers"
                label="Maximum Count"
                min={1}
                max={100}
                step={1}
                invalidText="Number is not valid"
                className='noflex'
                onChange={(evt) => { console.log(evt); this.setState({ totalMembers: parseInt(evt.imaginaryTarget.defaultValue) }) }}
                value={this.state.totalMembers}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className="row" >
              <div className='col-lg-6' style={{ paddingLeft: 0 }}>
                <DatePicker id="date-picker" datePickerType="single" onChange={(evt) => { this.setState({ fromDate: { year: evt[0].getFullYear(), month: evt[0].getMonth(), date: evt[0].getDate() } }) }}>
                  <DatePickerInput
                    id="date-picker-input-id"
                    className="some-class"
                    labelText="Select Date Applicable From"
                    pattern="d{1,2}/d{4}"
                    placeholder="mm/dd/yyyy"
                    value={this.state.fromDate !== '' ? `${this.state.fromDate.month}/${this.state.fromDate.date}/${this.state.fromDate.year}` : ''}
                  />
                </DatePicker>
              </div>
              <div className='col-lg-6' style={{ paddingRight: 0 }}>
                <DatePicker id="date-picker" datePickerType="single" onChange={(evt) => { this.setState({ toDate: { year: evt[0].getFullYear(), month: evt[0].getMonth(), date: evt[0].getDate() } }) }}>
                  <DatePickerInput
                    id="date-picker-input-id"
                    className="fullWidth"
                    labelText="Select Date Applicable Till"
                    pattern="d{1,2}/d{4}"
                    placeholder="mm/dd/yyyy"
                    invalidText="A valid value is required"
                    value={this.state.toDate !== '' ? `${this.state.toDate.month}/${this.state.toDate.date}/${this.state.toDate.year}` : ''}

                  />
                </DatePicker>
              </div>
            </div>
          </div>
          <br />

          <div >

            <center><Button onClick={(evt) => { this.createGroupAndUpdateAdmin() }}>Create Group</Button></center>
          </div>

        </div>
      </div>
    )
  }
}
export default CreateTeam;