// import React from 'react';
// // import openSocket from 'socket.io-client';
// // const socket = openSocket('http://localhost:3006');
// const socketioclient = require("socket.io-client");
// const client = socketioclient("http://localhost:3006");

// class Notifications extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             message: ''
//         }
//     }
//     render() {
//         client.once("connect", () => {
//             console.log("[CLIENT] Connected to remote server, identificating.")
//             client.on('test', (data) => {
//                 this.setState({message:data})
//             })
//         });
//         return (
//             <div>
//                 hello
//                 {this.state.message}
//             </div>
//         )
//     }
// }
// export default Notifications;