import React from 'react';
import Request from '../../../../utilities/request';
import { PaginationV2 } from 'carbon-components-react';
import './ViewUsersAndPayments.css'
const _ = require('lodash');
const respectiveMonth = {
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
class Toolbar extends React.Component {
  render() {
    return (
      <section className="bx--table-toolbar">
        <div className="bx--toolbar-search-container">
          <div className="bx--search bx--search--sm bx--search--light" role="search">
            <svg className="bx--search-magnifier" fillRule="evenodd" height="16" role="img" viewBox="0 0 16 16" width="16" aria-label="Filter table" alt="Filter table">
              <title>Filter table</title>
              <path d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm4.936-1.27l4.563 4.557-.707.708-4.563-4.558a6.5 6.5 0 1 1 .707-.707z"></path>
            </svg>
            <label htmlFor="data-table-search-9" className="bx--label">Filter table</label>
            <input type="text" className="bx--search-input" id="data-table-search-9" placeholder={this.props.placeholder} onChange={evt => this.props.filterUsers(evt.target.value)} />
            <button className="bx--search-close bx--search-close--hidden" type="button">
              <svg fillRule="evenodd" height="16" role="img" viewBox="0 0 16 16" width="16" aria-label="Provide a description that will be used as the title" alt="Provide a description that will be used as the title">
                <title>Provide a description that will be used as the title</title>
                <path d="M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    )
  }
}
class TableHeader extends React.Component {

  render() {
    const headersSection = this.props.tableHeaders.map((item) => {
      return <th style={{ width: item.width }}>{item.header}</th>
    })
    return (
      <thead>
        <tr>
          {headersSection}
        </tr>
      </thead>
    )
  }
}
class ViewUsersAndPayments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      displayUsers: [],
      userDetailsCopy: [],
      page: 1,
      pageSize: 5
    }
  }
  fetchAllUsersUnderAdmin = async () => {
    const usersUnderAdmin = await Request(`http://localhost:8080/fetchUsersAndPayments/?admin=${sessionStorage.getItem('user')}&groupName=${this.props.selectedGroup}`)
    const userDetails = _.map(usersUnderAdmin, (item) => {
      return {
        Customer: item.name,
        EmailId: item.emailId,
        MobileNumber: item.mobileNumber,
        Gender: item.gender,
        Payments: item.payments
      }
    })
    this.setState({ userDetails, userDetailsCopy: userDetails.slice(0, this.state.pageSize) });
  }
  filterUsers = (target) => {
    if (target === '' || _.isNull(target)) {
      this.setState({ userDetailsCopy: this.state.userDetails.slice(0, this.state.pageSize) }, () => {
        this.setState({ displayUsers: new Array(this.state.userDetailsCopy.length).fill(false) })
      })
    }
    else {
      this.setState({
        userDetailsCopy: this.state.userDetails.filter((item) => {
          return item.Customer.indexOf(target) > -1
        }, () => {
          this.setState({ displayUsers: new Array(this.state.userDetailsCopy.length).fill(false) })
        })
      })
    }
  }
  filterUsersByIndex = (targetIndex) => {
    console.log(`Slicing list from ${targetIndex.pageSize * (targetIndex.page - 1)} - ${targetIndex.pageSize * targetIndex.page}`)
    this.setState({ userDetailsCopy: this.state.userDetails.slice(targetIndex.pageSize * (targetIndex.page - 1), targetIndex.pageSize * targetIndex.page) })
  }
  changeDisplayState = (index) => {
    const displayUsers = this.state.displayUsers;
    if (_.isUndefined(this.state.displayUsers[index]) || this.state.displayUsers[index] === false) {
      displayUsers[index] = true;
    }
    else {
      displayUsers[index] = false;
    }
    console.log(displayUsers[index])
    this.setState({ displayUsers });
  }
  displayPaymentDetails = (index) => {
    return Object.keys(_.cloneDeep(this.state.userDetailsCopy[index].Payments)).map((item, PaymentIndex) => {
      return <tr className="bx--parent-row-v2" data-parent-row="true" style={{ outline: 'none' }}>
        <td>
          <td className="bx--table-expand-v2" style={{ border: 0 }}>
            <button className="bx--table-expand-v2__button" aria-label="Expand current row">
              <svg className="bx--table-expand-v2__svg"
                fillRule="evenodd"
                height="12"
                role="img"
                viewBox="0 0 7 12"
                width="7">
                <path d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"></path>
              </svg>
            </button>
          </td>
        </td>
        <td>
          {`${respectiveMonth[item.split('/')[0]]}-${item.split('/')[1]}`}
        </td>
        <td style={{ overflow: 'hidden' }}>
          {this.state.userDetailsCopy[index].Payments[item].toBePaid !== '' ? this.state.userDetailsCopy[index].Payments[item].toBePaid : 'Bidding Yet to Happen'}
        </td>
        <td>
          {_.sumBy(this.state.userDetailsCopy[index].Payments[item].paid, (item) => { return item.amountPaid })}
        </td>
      </tr>
    })

  }
  async componentDidMount() {
    await this.fetchAllUsersUnderAdmin();
  }
  render() {
    const displayUserDetails = this.state.userDetailsCopy.map((item, index) => {
      return <React.Fragment>
        <tr className="bx--parent-row-v2" data-parent-row="true" style={{ outline: 'none' }}>
          <td className="bx--table-expand-v2">
            <button className="bx--table-expand-v2__button" aria-label="Expand current row">
              <svg className="bx--table-expand-v2__svg"
                fillRule="evenodd"
                height="12"
                role="img"
                viewBox="0 0 7 12"
                width="7"
                onClick={(evt) => this.changeDisplayState(index)}>
                <path d="M5.569 5.994L0 .726.687 0l6.336 5.994-6.335 6.002L0 11.27z"></path>
              </svg>
            </button>
          </td>
          <td>{item.Customer}</td>
          <td>{item.EmailId}</td>
          <td>{item.MobileNumber}</td>
          <td>{item.Gender}</td>
        </tr>
        {this.state.displayUsers[index] === true ?
          <tr class="bx--expandable-row-v2 removeBackgroundBorder" data-child-row="true">
            <td colspan="7">
              <div className="bx--data-table-v2-container">
                <Toolbar placeholder='Search by Month' />
                <table className="bx--data-table-v2 bx--data-table-v2--zebra">
                  <TableHeader tableHeaders={[{ width: '7%', header: '' }, { width: "31%", header: 'Payment Month' }, { width: "31%", header: "Amount To Be Paid" }, { width: "31%", header: "Amount Paid" }]} />
                  <tbody>
                    {this.displayPaymentDetails(index)}
                  </tbody>
                </table>
                <PaginationV2
                  totalItems={this.state.userDetailsCopy[index].Payments.length}
                  pageSize={this.state.pageSize}
                  pageSizes={[5, 10, 15, 20]}

                />
              </div>
            </td>
          </tr> : ''}
      </React.Fragment>
    })
    return (
      <div className='container'>
        <div className="bx--data-table-v2-container">
          <Toolbar filterUsers={this.filterUsers} placeholder="Search By Customer Name" />
          <table className="bx--data-table-v2 bx--data-table-v2--zebra">
            <TableHeader tableHeaders={[{ width: '8%', header: '' }, { width: "23%", header: 'Customer' }, { width: "23%", header: "Email-Id" }, { width: "23%", header: "Mobile Number" }, { "width": "23%", header: "Gender" }]} />
            <tbody>
              {displayUserDetails}
            </tbody>
          </table>
        </div>
        <PaginationV2
          totalItems={this.state.userDetails.length}
          pageSize={this.state.pageSize}
          pageSizes={[5, 10, 15, 20]}
          onChange={evt => this.filterUsersByIndex(evt)}
        />
      </div>
    )
  }
}
export default ViewUsersAndPayments;