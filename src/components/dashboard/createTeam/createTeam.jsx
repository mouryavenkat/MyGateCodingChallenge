import React from 'react';
import { TextInput, NumberInput, DatePicker, DatePickerInput, Button, Loading } from 'carbon-components-react'
import '../../../resources/customStyles.css';
const axios = require('axios');
class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minCount: 1,
      maxCount: 2,
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
      minCount: 1,
      maxCount: 2,
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
  createGroup = (event) => {
    this.setState({ isLoading: true })
    const minCount = this.state.minCount;
    const maxCount = this.state.maxCount;
    const groupName = this.state.groupName;
    const groupBudget = this.state.groupBudget;
    const fromDate = this.state.fromDate;
    const toDate = this.state.toDate;
    const description = this.state.description;
    const chitCommission = this.state.chitCommission;
    console.log(minCount, maxCount, groupName, groupBudget, fromDate, toDate)
    const totalMonths = (toDate.year - fromDate.year) * 12 + (toDate.month - fromDate.month);
    const GroupStructure = {
      groupName,
      groupBudget,
      minCount,
      maxCount,
      fromDate,
      toDate,
      totalMonths,
      chitCommission,
      description,
      admin: 'mourya.g9@gmail.com'//has to be removed later once user session in place *******************
    }
    //Save group details to DB has to be implemented
    axios({
      url: 'http://localhost:8080/createGroup',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      method: 'POST',
      data: GroupStructure,
      json: true,
      rejectUnauthorized: false,
      crossdomain: true
    }).then((response) => {
      console.log(response);
      this.setState({ isLoading: false })
      this.resetState()
      this.timeOutForNotification('successMessage', `Sucessfully created Group ${groupName}`, '')
    }).catch((ex) => {
      console.log(ex.message);
      this.setState({ isLoading: false });
      this.resetState();
      this.timeOutForNotification('errorMessage', `Unable to created Group.${ex.message}`, '')
    })
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
              <div className='col-lg-6' style={{ paddingLeft: 0 }}>
                <NumberInput
                  id="minCount"
                  label="Minimum Count"
                  min={0}
                  max={100}
                  value={1}
                  step={1}
                  invalidText="Number is not valid"
                  className='noflex'
                  onChange={(evt) => { this.setState({ minCount: evt.imaginaryTarget.defaultValue }) }}
                  value={this.state.minCount}
                />
              </div>
              <div className="col-lg-6" style={{ paddingRight: 0 }}>
                <NumberInput
                  id="minCount"
                  label="Maximum Count"
                  min={2}
                  max={100}
                  value={1}
                  step={1}
                  invalidText="Number is not valid"
                  className='noflex'
                  onChange={(evt) => { this.setState({ maxCount: evt.imaginaryTarget.defaultValue }) }}
                  value={this.state.maxCount}
                />
              </div>
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
                    className="some-class"
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

            <center><Button onClick={(evt) => { this.createGroup() }}>Create Group</Button></center>
          </div>

        </div>
      </div>
    )
  }
}
export default CreateTeam;