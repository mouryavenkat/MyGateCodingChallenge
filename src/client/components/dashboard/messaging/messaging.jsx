import { ComboBox, TextArea, Button } from 'carbon-components-react';
import Request from '../../../utilities/request'
import React from 'react'
const _ = require('lodash');

class Messaging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      conversation: [],
      newMessage: '',
      sendMsgTo: ''
    }
    this.props.socket.on('receiveMessage', (data) => {
      console.log(data)
      const conversations = this.state.conversation;
      conversations.push({ emailId: data.from, message: data.message })
      console.log(conversations)
      this.setState({ conversation: conversations })
    })
  }
  async componentDidMount() {
    try {
      const users = await Request(`http://localhost:8080/fetchUsers/?admin=${sessionStorage.getItem('user')}`);

      this.setState({ users })
    }
    catch (ex) {
      console.log(ex);
    }
  }
  fetchLastTenMessages = async (selectedUser) => {
    console.log(selectedUser);
    if (!selectedUser) {
      return;
    }
    this.setState({ sendMsgTo: selectedUser.text })
    const socketId = await Request(`http://localhost:3006/getData/?userId=${selectedUser.text}`);
    console.log(socketId)
    // take selectedUser.text which gives an emailId
    this.setState({
      conversation: [{ emailId: 'venkatamourya@yahoo.com', name: 'Venkat', message: 'Hey man how are you.' },
      { emailId: 'mourya.g9@gmail.com', name: 'Mourya', message: 'Hey man I am good.How about you' },
      { emailId: 'venkatamourya@yahoo.com', name: 'Venkat', message: 'I am good man, How about studies' },
      { emailId: 'venkatamourya@yahoo.com', name: 'Venkat', message: 'I miss You so much man' },
      { emailId: 'venkatamourya@yahoo.com', name: 'Venkat', message: 'When are you coming back' }
      ]
    })
  }
  displayConversation = () => {
    const sessionUser = sessionStorage.getItem('user');
    return this.state.conversation.map((item) => {
      const float = item.emailId === sessionUser ? 'right' : 'left';
      if (float === 'right') {
        return <div className='row' style={{ marginLeft: '.5rem' }}>
          <div className='col-md-6'></div>
          <div className='col-md-6'>
            <div className='pull-right' style={{
              backgroundColor: '#3d70b2', color: 'white', margin: '.5rem', float: float, minHeight: '2rem', borderRadius: '25px', display: '-webkit-flex',
              display: 'flex', alignItems: 'center'
            }}>
              <span style={{ verticalAlign: 'baseline', margin: '.5rem' }}>{item.message}</span><br />
            </div>
          </div>
        </div>

      }
      else {
        return <div className='row' style={{ marginLeft: '.5rem' }}>
          <div className='col-md-6' style={{ marginLeft: '-15px' }}>
            <div style={{
              backgroundColor: '#3d70b2', color: 'white', margin: '.5rem', marginLeft: '0rem', float: float, minHeight: '2rem', borderRadius: '25px', display: '-webkit-flex',
              display: 'flex', alignItems: 'center'
            }}>
              <span style={{ verticalAlign: 'baseline', margin: '.5rem' }}>{item.message}</span><br />
            </div>
          </div>
          <div className='col-md-6'>
          </div>
        </div>
      }
    })
  }
  sendMessage = () => {
    const conversation = this.state.conversation;
    conversation.push({ emailId: sessionStorage.getItem('user'), message: this.state.newMessage });
    this.props.socket.emit('sendMessage', { from: sessionStorage.getItem('user'), message: this.state.newMessage, to: this.state.sendMsgTo });
    this.setState({conversation})
  }
  render() {
    
    return (
      <div className='container'>
        <div className='row' style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ display: 'inline-block', width: '60%', marginTop: '1rem', textAlign: 'left' }}>
              <label htmlFor='groups' className='bx--label'>Message To</label>
              <ComboBox id='users'
                items={this.state.users.map((item) => {
                  return { id: item.name, text: item.emailId }
                })}
                placeholder="Select Group To Update Bid"
                itemToString={(item) => {
                  if (!_.isNull(item) && !_.isUndefined(item)) return item.id
                  else return ''
                }}
                onChange={evt => this.fetchLastTenMessages(evt.selectedItem)}
              />
            </div>
          </div>
        </div>
        <br />
        <div className='row' style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ display: 'inline-block', width: '60%', marginTop: '1rem', textAlign: 'left' }}>
              <label htmlFor='groups' className='bx--label'>Conversations</label>
              <div style={{ height: '15rem', border: '1px solid ', overflowY: 'auto', overflowX: 'hidden' }}>
                {this.displayConversation()}
              </div>
            </div>
          </div>
        </div>
        <div className='row' style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ display: 'inline-block', width: '60%', marginTop: '1rem', textAlign: 'left' }}>
              <label htmlFor='groups' className='bx--label'>Send New Message</label>
              <TextArea placeholder='Send a Message' onChange={evt => this.setState({ newMessage: evt.target.value })} />
            </div>
          </div>
        </div>
        <br />
        <div className='row' style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ display: 'inline-block', width: '60%', marginTop: '1rem', textAlign: 'left' }}>
              <Button onClick={evt => this.sendMessage()}>Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Messaging;