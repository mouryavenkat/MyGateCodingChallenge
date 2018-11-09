import React from 'react';
import './UpdatePaymentDetails.css'
import { TextInput, ComboBox, Loading, Button } from 'carbon-components-react'
import Request from '../../../../utilities/request';
const _ = require('lodash');
const monthMap = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  0: 'December'
}
class DisplayPaymentDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.selectedUser !== '' ?
        <React.Fragment>
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%', textAlign: 'left' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ display: 'inline-block', width: '70%', textAlign: 'left' }}>

                    <TextInput id='AmountToBePaid'
                      labelText={<span style={{ textAlign: 'left' }}>Amount To Be Paid</span>}
                      readOnly
                      disabled
                      value={this.props.amountToBePaid}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          < div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ display: 'inline-block', width: '70%', textAlign: 'left' }}>
                    <TextInput id='AmountPaid'
                      labelText={<span style={{ textAlign: 'left' }}>Amount Paid Till Date</span>}
                      readOnly
                      disabled
                      value={this.props.amountPaidTillDate}
                    />
                  </div>
                </div>
              </div>
            </div >
          </div>
          <br />
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ display: 'inline-block', width: '70%', textAlign: 'left' }}>
                    <TextInput id='BalancePayment'
                      labelText={<span style={{ textAlign: 'left' }}>Balance To Be Paid</span>}
                      readOnly
                      disabled
                      value={this.props.amountToBePaid - this.props.amountPaidTillDate}

                    />
                  </div>
                </div>
              </div>
            </div>
          </div >
          <br />
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ display: 'inline-block', width: '70%', textAlign: 'left' }}>
                    <TextInput id='AddPayment'
                      labelText={<span style={{ textAlign: 'left' }}>Add New Payment</span>}
                      onChange={evt => this.props.changeState('amountAdded', evt.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>>
        </div >
        </React.Fragment > : ''
    )
  }
}
class UpdatePaymentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      groupDetails: [],
      monthDetails: [],
      userDetails: [],
      groupSelected: '',
      selectedUser: '',
      amountToBePaid: 0,
      amountPaidTillDate: 0,
      amountAdded: 0
    }
  }
  setMonthDetails = (selectedItem) => {
    if (selectedItem) {
      this.setState({ groupSelected: selectedItem.id });
      const detailsOfSelectedGroup = _.find(this.state.groupDetails, { groupName: selectedItem.id });
      const monthDetails = [...Array(detailsOfSelectedGroup.totalMonths)].map((item, month) => {
        return {
          text: `${(detailsOfSelectedGroup.fromDate.month + month) % 12}/${detailsOfSelectedGroup.fromDate.year + Math.floor((detailsOfSelectedGroup.fromDate.month + month) / 12)}`,
          id: `${monthMap[(detailsOfSelectedGroup.fromDate.month + month) % 12]}-${detailsOfSelectedGroup.fromDate.year + Math.floor((detailsOfSelectedGroup.fromDate.month + month) / 12)} ( Month-${month + 1})`
        }
      })
      this.setState({ monthDetails })
    }
  }
  setUserDetails = (selectedMonth) => {
    if (selectedMonth) {
      this.setState({ monthSelected: selectedMonth.text })
      const detailsOfSelectedGroup = _.find(this.state.groupDetails, { groupName: this.state.groupSelected });
      const paymentDetails = JSON.parse(JSON.parse(JSON.stringify(detailsOfSelectedGroup.payments)));
      this.setState({
        userDetails: Object.keys(paymentDetails[selectedMonth.text]).map((item) => {
          return { id: item, text: item }
        })
      })
    }
  }
  showPaymentDetails = (selectedUser) => {
    if (selectedUser) {
      this.setState({ selectedUser: selectedUser.id });
      const detailsOfSelectedGroup = _.find(this.state.groupDetails, { groupName: this.state.groupSelected });
      const paymentDetails = JSON.parse(JSON.parse(JSON.stringify(detailsOfSelectedGroup.payments)));
      const payableAmountAfterBid = _.find(detailsOfSelectedGroup.bidDetails, { bidMonth: this.state.monthSelected }).payableAmountAfterBid;
      this.setState({ amountToBePaid: payableAmountAfterBid });
      const amountPaidTillDate = _.sum(_.map(paymentDetails[this.state.monthSelected][selectedUser.id], ((item) => {
        return item.amountPaid
      })))
      console.log(amountPaidTillDate)
      this.setState({ amountPaidTillDate })
    }
    else {
      this.setState({ selectedUser: '' });
    }
  }
  clearAllInputFields = () => {
    this.refs.group.selectedItem = null
    console.log(this.refs.group)
  }
  updateTeamWithUsers = async () => {
    this.setState({ isLoading: true })
    const groupSelected = this.state.groupSelected;
    const monthSelected = this.state.monthSelected;
    const userSelected = this.state.selectedUser;
    const amountAdded = this.state.amountAdded;
    const url = `http://localhost:8080/updateUserPayments/?admin=${sessionStorage.getItem('user')}&groupName=${groupSelected}&month=${monthSelected}&user=${userSelected}&amount=${amountAdded}`
    try {
      await Request(url, { method: 'PUT', body: JSON.stringify({}) });
      this.props.updateParentState('successMessage', `Successfully updated the payment details`);
      this.setState({ isLoading: false })
      this.clearAllInputFields()
    }
    catch (ex) {
      console.log(ex.message);
      this.props.updateParentState('errorMessage', ex);
      this.setState({ isLoading: false });
    }
  }

  changeState = (stateName, stateValue) => {
    this.setState({ [stateName]: stateValue })
  }
  async componentDidMount() {
    try {
      const groupDetails = await Request(`http://localhost:8080/fetchGroups/?admin=${sessionStorage.getItem('user')}`, { credentials: 'include' });
      this.setState({ groupDetails })
    }
    catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: '1rem' }}>
          <Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} />
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%', textAlign: 'left' }}>
                <label htmlFor='groups' className='bx--label'>Select Group</label>
                <ComboBox id='groups'
                  items={this.state.groupDetails.map((item, index) => {
                    return { id: item.groupName, text: item.groupName };
                  })}
                  itemToString={(item) => {
                    if (!_.isNull(item) && !_.isUndefined(item)) return item.id
                    else return ''
                  }}
                  placeholder="Select Group To Update Bid"
                  onChange={evt => this.setMonthDetails(evt.selectedItem)}
                  ref='group'
                />
              </div>
            </div>
          </div>
          <br />
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%', textAlign: 'left' }}>
                <label htmlFor='groups' className='bx--label'>Select Payment Month</label>
                <ComboBox id='groups'
                  items={this.state.monthDetails}
                  itemToString={(item) => { if (item) return item.id }}
                  placeholder="Select Month To Update Payment"
                  onChange={evt => this.setUserDetails(evt.selectedItem)}
                />
              </div>
            </div>
            <br />
          </div>
          <br />
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%', textAlign: 'left' }}>
                <label htmlFor='groups' className='bx--label'>Select User</label>
                <ComboBox id='groups'
                  items={this.state.userDetails}
                  itemToString={(item) => { if (item) return item.id }}
                  placeholder="Select User"
                  onChange={evt => this.showPaymentDetails(evt.selectedItem)}
                />
              </div>
            </div>
          </div>
          <br />
          <DisplayPaymentDetails
            selectedUser={this.state.selectedUser}
            groupDetails={this.state.groupDetails}
            groupSelected={this.state.groupSelected}
            monthSelected={this.state.monthSelected}
            amountToBePaid={this.state.amountToBePaid}
            amountPaidTillDate={this.state.amountPaidTillDate}
            changeState={this.changeState}
          />
          <br />
          <div className='row' style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{ display: 'inline-block', width: '60%' }}>
                <Button onClick={evt => this.updateTeamWithUsers()}>Update Customer Payments</Button>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
export default UpdatePaymentDetails