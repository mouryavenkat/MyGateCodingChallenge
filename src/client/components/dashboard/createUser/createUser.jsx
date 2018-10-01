import React from 'react';
import { TextInput, FileUploaderButton, FormGroup, RadioButton, RadioButtonGroup, Button, Loading } from 'carbon-components-react'
import './createUser.css'
class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      customername: '',
      isLoading: false,
      customerMobile: '',
      gender: '',
      proof: ''
    }
  }
  createUser = (event) => {
    this.setState({ isLoading: true })
    console.log(this.state.emailId, this.state.customername, this.state.customerMobile, this.state.gender)
    //Save user details to DB has to be implemented and also notify feature.
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 3000)
  }
  render() {
    return (
      <div>
        <div className='container' style={{ marginTop: '10%' }}>
          <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}><Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} /></div>
          <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}>
            <div className='row'>
              <div style={{ backgroundColor: '#dfe6eb', height: '3.5rem', textAlign: 'center', width: '100%' }}>
                <div style={{ verticalAlign: 'baseline', marginTop: '1rem', display: 'inline-block' }}><h3>Create New Customer</h3></div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='emailId'
                labelText={<span>Email<span style={{ color: 'red' }}> *</span></span>}
                placeholder='Enter the mail Address of the customer'
                onChange={(evt) => { this.setState({ emailId: evt.target.value }) }}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='customername'
                placeholder='Enter name of Customer'
                labelText={<span>Customer Name<span style={{ color: 'red' }}> *</span></span>}
                onChange={(evt) => { this.setState({ customername: evt.target.value }) }}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <TextInput
                id='customerMobile'
                labelText={<span>Mobile Number<span style={{ color: 'red' }}> *</span></span>}
                placeholder='Enter mobile number of customer'
                onChange={(evt) => { this.setState({ customerMobile: evt.target.value }) }}
              />
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <div className='col-lg-6' style={{ paddingLeft: 0 }}>
                <FormGroup style={{ marginBottom: 0 }} legendText={<span>Gender<span style={{ color: 'red' }}> *</span></span>}>
                  <RadioButtonGroup name="gender" >
                    <RadioButton
                      onClick={(evt) => { this.setState({ gender: evt.target.value }) }}
                      value="Male"
                      id="radio-1"
                      disabled={false}
                      
                      labelText="Male"
                    />
                    <RadioButton
                      onClick={(evt) => { this.setState({ gender: evt.target.value }) }}
                      value="Female"
                      id="female"
                      disabled={false}
                      labelText="Female"
                    />
                  </RadioButtonGroup>
                </FormGroup>
              </div>
            </div>
          </div>
          <br />
          <div style={{ marginLeft: '25%', marginRight: '25%' }}>
            <div className='row'>
              <div className='col-lg-6' style={{ paddingLeft: 0, verticalAlign: 'baseline', alignContent: 'center' }}>
                <label for='proofUploader' className='bx--label alignLabelToProof'>Provide Any Government Id<span style={{ color: 'red' }}> *</span></label>
              </div>
              <div className='col-lg-6' style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}>
                <FileUploaderButton
                  labelText="Add Government Id"
                  name="Add Proof"
                  multiple
                  tabIndex={-1}
                  onChange={(evt) => { this.setState({ proof: evt.target.value }) }}
                  style={{ width: '100%',overflow:'hidden' }}
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            <center><Button onClick={(evt) => { this.createUser() }}>Create User</Button></center>
          </div>
        </div>
      </div>
    )
  }
}
export default CreateUser;