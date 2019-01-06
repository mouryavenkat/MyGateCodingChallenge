import React from 'react'
import { Modal } from 'carbon-components-react'
import ReactJson from 'react-json-view'

// use the component in your app!

class DetailedView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: true
        }
    }
    componentDidMount() {
        console.log('component mounted')
        this.setState({ openModal: true })
    }
    render() {
        return (
            <Modal
                className="some-class"
                open={this.state.openModal}
                danger={false}
                shouldSubmitOnEnter={false}
                modalLabel="Food Truck Details"
                modalAriaLabel=""
                primaryButtonText="Close"
                secondaryButtonText="Secondary Button"
                iconDescription="Close the modal"
                onRequestClose={(evt) => {
                    this.setState({ openModal: false })
                    this.props.changeState('viewRestaurant',false )
                }}
            >
                <ReactJson src={this.props.selectedRestaurant} enableClipboard={false} displayDataTypes={false} displayObjectSize={false} />

            </Modal>
        )
    }
}
export default DetailedView