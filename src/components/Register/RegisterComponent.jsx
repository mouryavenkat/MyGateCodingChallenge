import React from 'react';
import { TextInput, FileUploaderButton, Button } from 'carbon-components-react';
import './RegisterComponent.css'
class RegisterComponent extends React.Component {

  render() {
    return (
      <div className='container' style={{ overflow: 'hidden' }}>
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <TextInput labelText='Name' placeholder='Enter Username' />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <TextInput labelText='Mobile Number' placeholder='Enter Mobile Number' />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <TextInput labelText='Email Id' placeholder='Enter Email Id' />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <TextInput labelText='Password' placeholder='Enter Password.' />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <TextInput labelText='Re-Enter Password' placeholder='Re-Enter Password.' />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <div className='col' style={{ paddingLeft: 0, verticalAlign: 'baseline', alignContent: 'center' }}>
              <label for='proofUploader' className='bx--label alignLabelToProof'>Provide Any Government Id<span style={{ color: 'red' }}> *</span></label>
            </div>
            <div className='col' style={{ paddingLeft: 0, paddingRight: 0, width: '100%' }}>
              <FileUploaderButton
                labelText="Add Government Id"
                name="Add Proof"
                multiple
                role=""
                tabIndex={-1}
                className='alignContentToButton'
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
        <br />
        <div >
          <center> <Button>Register</Button></center>

        </div>
      </div>
    )
  }
}
export default RegisterComponent