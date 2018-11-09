import React from 'react';
import { Loading, ComboBox, TextInput, Button } from 'carbon-components-react';
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
class UpdateBid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            groupDetails: [],
            monthDetails: [],
            groupSelected: '',
            monthSelected: '',
            usersUnderGroup: [],
            biddedUser: '',
            bidAmount: 0,

        }
    }
    fetchGroupDetails = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await Request(`http://localhost:8080/fetchGroups/?admin=${sessionStorage.getItem('user')}`, { credentials: 'include' })
            if (_.isArray(response)) {
                this.setState({
                    groupDetails: response
                })
            }
            this.setState({ isLoading: false })
        }
        catch (ex) {
            this.setState({ isLoading: false })
        }
    }
    updateMonthDetails = (selectedItem) => {
        if (!_.isNull(selectedItem)) {
            const detailsOfSelectedGroup = _.find(this.state.groupDetails, { groupName: selectedItem.id });
            const monthDetails = [...Array(detailsOfSelectedGroup.totalMonths)].map((item, month) => {
                return {
                    text: `${(detailsOfSelectedGroup.fromDate.month + month) % 12}/${detailsOfSelectedGroup.fromDate.year + Math.floor((detailsOfSelectedGroup.fromDate.month + month) / 12)}`,
                    id: `${monthMap[(detailsOfSelectedGroup.fromDate.month + month) % 12]}-${detailsOfSelectedGroup.fromDate.year + Math.floor((detailsOfSelectedGroup.fromDate.month + month) / 12)} ( Month-${month + 1})`
                }
            })
            console.log(monthDetails)
            this.setState({ monthDetails })
        }
    }
    updateUserDetailsUnderGroup = async (selectedItem) => {
        if (!_.isNull(selectedItem)) {
            fetch(`http://localhost:8080/fetchUsersUnderGroup/?admin=${sessionStorage.getItem('user')}&groupName=${selectedItem.text}`, {
                credentials: 'include' // include sends cookie information from client to server.
            }).then(response => response.json())
                .then(response => {
                    console.log(`Users under group and admin ${JSON.stringify(response)}`);
                    this.setState({
                        usersUnderGroup: response.map((item, index) => {
                            return { id: item, text: item };
                        })
                    })
                }).catch((ex) => {
                    console.log(ex);
                })
        }
    }
    fetchMonthsAndUsers = async (selectedItem) => {
        try {
            this.setState({ isLoading: true })
            this.setState({ groupSelected: selectedItem.text });
            this.updateMonthDetails(selectedItem)
            await this.updateUserDetailsUnderGroup(selectedItem);
            this.setState({ isLoading: false })
        }
        catch (ex) {
            this.setState({ isLoading: false })
        }
    }
    updateCommissionDetails = async (groupName, bidMonth, biddedFor) => {
        try {
            const commissionPercentage = _.find(this.state.groupDetails, { groupName }).chitCommission;
            console.log(`Commissiong for selected group ${groupName} is ${commissionPercentage}`)
            const commissionDetails = {
                bidMonth,
                groupName,
                admin: sessionStorage.getItem('user'),
                commission: parseInt(commissionPercentage * biddedFor) / 100
            }
            await Request(`http://localhost:8080/addCommission`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(commissionDetails),
                credentials: 'include'
            })
        }
        catch (ex) {
            console.log(ex.message);
            throw new Error(ex.message);
        }
    }
    updateGroupWithBidDetails = async () => {
        const group = this.state.groupSelected;
        const bidMonth = this.state.monthSelected;
        const biddedFor = this.state.bidAmount;
        const biddedBy = this.state.biddedUser;
        const bidDetailsToBeUpdated = { bidMonth, biddedFor, biddedBy };
        console.log(bidDetailsToBeUpdated, group)
        try {
            const response = await Request(`http://localhost:8080/updateGroup/?admin=${sessionStorage.getItem('user')}&groupName=${group}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(bidDetailsToBeUpdated),
                credentials: 'include'
            })
            await this.updateCommissionDetails(group, bidMonth, biddedFor)
            console.log(response);
            this.props.updateParentState('successMessage', 'Successfully updated bid details');
        }
        catch (ex) {
            console.log(ex);
            this.props.updateParentState('errorMessage', 'Successfully updated bid details');
        }
    }
    async componentDidMount() {
        await this.fetchGroupDetails();
    }
    render() {
        return (
            <div className='container' style={{ overflow: 'hidden' }}>
                <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}><Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} /></div>
                <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}>
                    
                    <div className='row' >
                        <label htmlFor='groups' className='bx--label'>Select Group</label>
                        <ComboBox id='groups'
                            items={_.map(this.state.groupDetails, (item) => {
                                return { id: item.groupName, text: item.groupName };
                            })}
                            itemToString={(item) => { if (item) return item.id }}
                            placeholder="Select Group To Update Bid"
                            onChange={(evt) => this.fetchMonthsAndUsers(evt.selectedItem)}
                        />
                    </div>
                    <br />
                    <div className='row' >
                        <label htmlFor='months' className='bx--label'>Select Bid Month</label>
                        <ComboBox id='months'
                            items={this.state.monthDetails}
                            itemToString={(item) => { if (item) return item.id }}
                            placeholder="Select Month To Update Bid"
                            onChange={(evt) => {
                                this.setState({ monthSelected: !_.isNull(evt.selectedItem) ? evt.selectedItem.text : '' });
                            }}
                        />
                    </div>
                    <br />
                    <div className='row' >
                        <TextInput
                            placeholder='Enter Amount bidded for selected month'
                            onChange={(evt) => { this.setState({ bidAmount: evt.target.value }) }}
                            labelText='Bid Amount'
                            id='bidAmount' />
                    </div>
                    <br />
                    <div className='row' >
                        <label htmlFor='usersList' className='bx--label'>Select Bidded User</label>
                        <ComboBox id='usersList'
                            items={this.state.usersUnderGroup}
                            itemToString={(item) => { if (item) return item.id }}
                            placeholder="Select Month To Update Bid"
                            onChange={(evt) => this.setState({ biddedUser: !_.isNull(evt.selectedItem) ? evt.selectedItem.text : '' })}
                        />
                    </div>
                    <br />
                    <div >
                        <center><Button onClick={(evt) => { this.updateGroupWithBidDetails() }}>Update Bid</Button></center>
                    </div>
                </div>

            </div>
        )
    }
}
export default UpdateBid