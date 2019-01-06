import React from 'react';
import { Button, Loading } from 'carbon-components-react'
import Request from '../../../utilities/request'
import DetailedView from './DetailedView'
const _ = require('lodash');

class DisplayFoodCourts extends React.Component {
    render() {
        return (
            <div className='row'>
                {this.props.setOfFoodCourts.map((item, index) => {
                    return <div className='col' style={{ maxWidth: '21rem' }} key={index}>
                        <div
                            className="card"
                            style={{ width: '18rem', borderTop: '5px solid #3d70b2', margin: '1.25rem', height: '17rem' }}>
                            <div style={{ margin: '.5rem', height: '4rem', backgroundColor: '#f4f7fb' }}>
                                <center>
                                    <img
                                        src={require('../../../resources/images/cardLogo.svg')}
                                        style={{ verticalAlign: 'baseline', marginTop: '0.7rem', height: '2.6rem' }}
                                    >
                                    </img>
                                </center>
                            </div>
                            <div className="card-body" style={{ paddingLeft: '.5rem' }}>
                                <h5 className="card-title">{item.applicant}</h5>
                                <div style={{ marginTop: '.5rem', maxHeight: '4.5rem', height: '4.5rem', overflow: 'auto', position: 'absolute' }}>
                                    <p className="card-text">{item.locationdescription}</p>
                                </div>
                                <div style={{ right: '0.5rem', bottom: '.5rem', position: 'absolute', marginTop: '.5rem', textAlign: 'center' }}>
                                    <Button style={{ marginTop: '1rem', right: '0.5rem' }} onClick={(evt) => {
                                        console.log('---------------------')
                                        this.props.changeState('selectedRestaurant', item);
                                        this.props.changeState('viewRestaurant', true)
                                    }}>View</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}


/* 
1-> When component mounted we will fetch all records.
2-> On type ahead search the filter will be applied if user action hsnt been there for a second to reduce the load on cpu.
*/


class ViewFoodCourts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedGroup: '',
            setOfFoodCourts: [],
            setOfFoodCourtsClone: [],
            viewRestaurant: false,
            selectedRestaurant: {}
        }
    }
    // When component loaded fetch all food courts and set the loading to false.
    async componentDidMount() {
        console.log('component mounted');
        this.setState({ isLoading: true })
        try {
            const response = await Request(`http://localhost:8080/fetchFoodCourts`, { method: 'GET', json: true })
            console.log(response)
            this.setState({ setOfFoodCourts: response, setOfFoodCourtsClone: response })
            this.setState({ isLoading: false })
        }
        catch (ex) {
            console.log(ex);
            this.setState({ isLoading: false })
        }
    }
    componentWillMount() {
        console.log('Setting timer to null');
        this.timer = null;
    }
    filterItems = (searchText) => {
        clearTimeout(this.timer)
        setTimeout(() => {
            this.setState({ isLoading: true })
            console.log('waited for a second')
            const setOfFoodCourts = _.filter(this.state.setOfFoodCourts, (iterate) => {
                console.log(iterate)
                if (iterate['applicant'].indexOf(searchText) > -1 || iterate['address'].indexOf(searchText) > -1) {
                    return true
                }
            })
            console.log(setOfFoodCourts)
            this.setState({ setOfFoodCourts, isLoading: false })

        }, 1000)

    }
    filterItemsByStatus = (status) => {
        this.setState({
            'setOfFoodCourts': this.state.setOfFoodCourtsClone.filter((item) => {
                if (item.status === status) {
                    return true
                }
            })
        })
    }
    // When searchText changes this component will be updated . Check with prevprops and if searchText causes component to be updated then filter the items by searchText
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchText !== this.props.searchText) {
            if (this.props.searchText === '') {
                console.log('Search Text is empty');
                this.setState({ setOfFoodCourts: this.state.setOfFoodCourtsClone })
            }
            else {
                this.filterItems(this.props.searchText)
            }
        }
        if (prevProps.statusFilter !== this.props.statusFilter) {
            console.log(`applying filter by status ${this.props.statusFilter}`)
            if (this.props.statusFilter === '' || this.props.statusFilter === 'All') {
                console.log(this.state.setOfFoodCourtsClone)
                this.setState({ setOfFoodCourts: this.state.setOfFoodCourtsClone })
            }
            else {
                this.filterItemsByStatus(this.props.statusFilter)
            }
        }
    }
    changeState = (stateName, stateValue) => {
        console.log(stateName, stateValue)
        this.setState({ [stateName]: stateValue })

    }
    render() {
        return (
            <div style={{ position: 'absolute', width: '100%' }} >
                <Loading withOverlay={true} active={this.state.isLoading} style={{ verticalAlign: 'baseline' }} />
                {this.state.viewRestaurant === true ? <DetailedView selectedRestaurant={this.state.selectedRestaurant} changeState={this.changeState} /> : ''}
                <div className='container-fluid'>
                    <DisplayFoodCourts setOfFoodCourts={this.state.setOfFoodCourts} changeState={this.changeState} parentStateChange={this.props.changeState} />
                </div>
            </div>
        )
    }
}

export default ViewFoodCourts;