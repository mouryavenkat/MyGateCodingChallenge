import React from 'react'
import Request from '../../../utilities/request'
import { TextInput, ComboBox, Form, FormGroup, Button, Tooltip } from 'carbon-components-react'
const uuidv1 = require('uuid/v1');
class AddFoodCourt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            truckname: '',
            block: '',
            blocklot: '',
            cnn: '',
            timings: '',
            facilitytype: '',
            latitude: '',
            longitude: '',
            locationdescription: '',
            lot: '',
            permit: '',
            priorPermit: '',
            schedule: '',
        }
    }
    sendRequest = async () => {
        const payload = {
            address: this.state.address,
            applicant: this.state.truckname,
            block: this.state.block,
            blocklot: this.state.blocklot,
            cnn: this.state.cnn,
            dayshours: this.state.timings,
            facilitytype: this.state.facilitytype,
            fooditems: this.state.fooditems,
            location: {
                type: 'Point',
                coordinates: [this.state.longitude, this.state.latitude]
            },
            objectid: uuidv1(),
            locationdescription: this.state.locationdescription,
            lot: this.state.lot,
            permit: this.state.permit,
            schedule: this.state.permit,
            status: 'REQUESTED',
            received: (new Date()).toISOString()
        }
        console.log(payload)
        try {
            const response = await Request('http://localhost:8080/createRequest', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                method: 'POST'
            })
            console.log(response)

            this.props.changeState('successMessage', `Successfully created request for ${this.state.truckname}`)
            setTimeout(() => {
                this.props.changeState('successMessage', '')
            }, 3000)
            this.setState({
                address: '',
                truckname: '',
                block: '',
                blocklot: '',
                cnn: '',
                timings: '',
                facilitytype: '',
                latitude: '',
                longitude: '',
                locationdescription: '',
                lot: '',
                permit: '',
                priorPermit: '',
                schedule: '',
            })

        }
        catch (ex) {
            console.log(ex);
            this.props.changeState('errorMessage', ex)
            setTimeout(() => {
                this.props.changeState('errorMessage', '')
            }, 3000)
        }

    }
    changeState = (stateName, stateValue) => {
        this.setState({ [stateName]: stateValue })
    }
    render() {
        return (

            <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ display: 'inline-block', width: '40%', marginTop: '1rem', textAlign: 'left' }}>
                    <center><h2>Place Request For FoodTruck</h2></center>
                    <br />
                    <Form className="some-class" >
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="address"
                                    labelText="Address"
                                    placeholder="Enter the address of foodtruck"
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('address', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Address where food truck is planned to be opened
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>

                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="name"
                                    labelText="FoodTruck Name"
                                    placeholder="Enter the name of foodtruck"
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('truckname', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Name of Food Truck to be opened
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="block"
                                    labelText="Block"
                                    placeholder="Enter the block"
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('block', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the block number to locate your truck
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="blocklot"
                                    labelText="BlockLot"
                                    placeholder="Enter the blocklot"
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('blocklot', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the blocklot number to locate your truck
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="cnn"
                                    labelText="CNN"
                                    placeholder="Enter the CNN"
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('cnn', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the CNN Number
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="Open Timings"
                                    labelText="Open Timings"
                                    placeholder="Enter the Days "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('timings', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the Open timings of this restaurant.
                                            Format required: Tu/We/Th:12AM-3AM;Mo-We:12PM-12AM
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="facilitytype"
                                    labelText="Type of restaurant"
                                    placeholder="Enter the Days "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('facilitytype', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the type of food truck.Ex: Truck or Push Cart
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="latitude"
                                    labelText="Latitude"
                                    placeholder="Enter the latitude "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('latitude', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the latitude of the restaurant
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="Longitude"
                                    labelText="Longitude"
                                    placeholder="Enter the longitude "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('longitude', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the longitude of the restaurant
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="locationdescription"
                                    labelText="Location Description"
                                    placeholder="Describe the location "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('locationdescription', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Describe your food truck location. Like famous spots nearby
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="lot"
                                    labelText="LOT"
                                    placeholder="Enter the lot "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('lot', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the lot number
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="permit"
                                    labelText="Permit"
                                    placeholder="Enter the permit number "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('permit', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the Permit Number
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="priorPermit"
                                    labelText="Prior Permit"
                                    placeholder="Prior Permit "
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('priorPermit', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the Prior permit
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="some-class" >
                            <div className='row' style={{ marginLeft: 0 }}>
                                <TextInput
                                    id="schedule"
                                    labelText="Schedule"
                                    placeholder="Schedule"
                                    hideLabel={false}
                                    onChange={(evt) => { this.changeState('schedule', evt.target.value) }}
                                />
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <div style={{ marginTop: '2rem' }}>
                                    <Tooltip clickToOpen={false} triggerText="" tabIndex={0}>
                                        <p>
                                            Enter the schedule link
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        </FormGroup>
                        <Button onClick={(evt) => {
                            console.log(this.state);
                            this.sendRequest()
                        }}>Place Request</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default AddFoodCourt