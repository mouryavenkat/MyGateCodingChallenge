import React from 'react';
import { ContentSwitcher, Switch } from 'carbon-components-react'
class UpdateTeamSubComponent extends React.Component {
  render() {
    return (
      <div className='container'>
        <div style={{ textAlign: 'center',marginTop:'1rem',marginBottom:'1rem' }}>
          <div style={{display:'inline-block'}}>
            <ContentSwitcher >
              <Switch name="User Details" text="User Details" />
              <Switch name="Payment Details" text="Payment Details" />
            </ContentSwitcher>
          </div>
        </div>
        <hr width='100%' ></hr>
      </div>
    )
  }
}
export default UpdateTeamSubComponent;