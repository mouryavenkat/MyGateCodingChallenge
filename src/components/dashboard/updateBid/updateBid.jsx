import React from 'react';
import { Loading, ComboBox, TextInput, Button } from 'carbon-components-react';
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
    12: 'December'
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
            bidAmount: 0,

        }
    }

    fetchGroupDetails = async () => {
        this.setState({ isLoading: true });
        fetch(`http://localhost:8080/fetchGroups/?admin=${sessionStorage.getItem('user')}`, {
            credentials: 'include' // include sends cookie information from client to server.
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                if (_.isArray(response)) {
                    this.setState({
                        groupDetails: response
                    })
                }
                this.setState({ isLoading: false })
            }).catch((ex) => {
                console.log(ex);
                this.setState({ isLoading: false })
            })
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
            fetch(`http://localhost:8080/fetchUsers/?admin=${sessionStorage.getItem('user')}&groupNames=${selectedItem.text}`, {
                credentials: 'include' // include sends cookie information from client to server.
            }).then(response => response.json())
                .then(response => {
                    console.log(`Users under group and admin ${JSON.stringify(response)}`);
                    this.setState({
                        usersUnderGroup: response.map((item, index) => {
                            return { id: item.name, text: item.name };
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
    async componentDidMount() {
        await this.fetchGroupDetails();
    }
    render() {
        return (
            <div className='container' style={{ marginTop: '10%', overflow: 'hidden' }}>
                <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}><Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} /></div>
                <div style={{ marginLeft: '25%', marginRight: '25%', marginBottom: '15px' }}>
                    <div className='row' >
                        <div style={{ backgroundColor: '#dfe6eb', height: '3.5rem', textAlign: 'center', width: '100%' }}>
                            <div style={{ verticalAlign: 'baseline', marginTop: '1rem', display: 'inline-block' }}><h3>Update Bid Details</h3></div>
                        </div>
                    </div>
                    <br />
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
                            labelText='Bid Amount' />
                    </div>
                    <br />
                    <div className='row' >
                        <label htmlFor='usersList' className='bx--label'>Select Bidded User</label>
                        <ComboBox id='usersList'
                            items={this.state.usersUnderGroup}
                            itemToString={(item) => { if (item) return item.id }}
                            placeholder="Select Month To Update Bid"
                        />
                    </div>
                    <br />
                    <div >
                        <center><Button>Update Bid</Button></center>
                    </div>
                </div>

            </div>
        )
    }
}
export default UpdateBid