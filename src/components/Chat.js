import React from 'react';
import { withRouter } from 'react-router';
import LoginContext from '../contexts/login';
import PropTypes from 'prop-types';

class Chat extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      ws: null,
      msgs: [{
        user: 'Chat',
        content: ''
      }],
      mounted: false
    };
  }

  static propTypes = {
    data: PropTypes.object
  }

  static contextType = LoginContext;

  componentDidMount () {
    this.setState({ mounted: true });
    this.connect();
  }

  connect = () => {
    const ws = new WebSocket(this.props.data.chat, 'chat');
    this.setState({ ws: ws });

    // We need to send two messages to connect to the chat
    // First one is the authentication message
    // Second one contains details about the broadcast/stream
    // Every message begins two special cahracters \x1b\t and has a special 12 digit number
    // The 12 digit number contains:
    // A base value of - XXXX - represents the operation being performed
    // A length value of - YYYYYY - a 6 digit number representing the length of the message
    // An ending value of - 00
    // Messages are usually separated by \f
    // The auth message contains the special code, an authentication value obtained from the cookie and the number 16
    // All of those are separated by \f
    const connection = createMessage(1, this.props.data.auth, 16);
    const connection2 = createMessage(2, this.props.data.chatno, this.props.data.ftk, 0);
    const ping = '\x1b\t000000000100\f';
    const sendPing = setInterval(function () {
      ws.send(ping);
    }, 1 * 60 * 1000); // 60 seconds

    ws.onclose = () => {
      clearInterval(sendPing);
    };

    ws.onopen = () => {
      ws.send(connection);
    };

    let counter = 0;
    ws.onmessage = async e => {
      // Once a response is received, send second handshake message
      if (counter === 0) {
        ws.send(connection2);
        counter += 1;
      }
      // console.log(e.data);
      const arrayBuffer = await e.data.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const txt = new TextDecoder('UTF-8').decode(bytes);
      const splitMsg = txt.split('\f');
      const code = splitMsg[0].substring(2, 6);
      // Sent messages begin with 0005
      if (code === '0005') {
        // console.log(splitMsg[6] + ": " + splitMsg[1]);
        const msg = {
          user: splitMsg[6],
          content: splitMsg[1]
        };
        const msgs = this.state.msgs;
        msgs.push(msg);
        // remove first msg if there are 40 msgs
        if (msgs.length > 40) {
          msgs.shift();
        }
        if (!this.state.mounted) {
          return;
        }
        this.setState({ msgs: msgs });
      }
    };
  }

  handleSendMessage = (e) => {
    e.preventDefault();
    const value = e.target[0].value;

    // can't send empty messages
    if (value === '') {
      return;
    }

    if (!this.context.loggedIn) {
      alert('Log in to send messages');
      return;
    }

    const ws = this.state.ws;
    const message = createMessage(5, value, 0);
    ws.send(message);
    this.myFormRef.reset();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ block: 'nearest', inline: 'start' });
  }

  componentDidUpdate () {
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount () {
    const ws = this.state.ws;
    this.setState({ mounted: false });
    ws.close();
  }

  render () {
    if (this.state.ws === null) {
      return (
        <>
        <p>Loading msg</p>
        </>
      );
    }
    // const ws = this.state.ws;

    if (this.state.msgs.length === 0) {
      return (
        <>
        </>
      );
    }

    const msgList = this.state.msgs.map((msg, i) => {
      return (
        <div key={i} style={{
          marginLeft: '3px'
        }}>
          <span key={msg.user} style={{ color: '#767676', fontSize: '10px' }}>{msg.user} :</span>
          <p style={{ marginBottom: '2.5px' }} key={msg.content}>{msg.content}</p>
        </div>
      );
    });

    return (
      <>
      <div style={{
        display: 'inline-block',
        width: '24%',
        height: '80%',
        float: 'right'
      }}>
      <div style={{
        display: 'inline',
        position: 'relative',
        width: '100%',
        height: '90%',
        overflowY: 'scroll',
        overflowWrap: 'break-word',
        border: '2px solid black',
        float: 'left',
        boxSizing: 'border-box'
      }}
        >
          {msgList}
          <div ref={(el) => { this.messagesEnd = el; } }>

          </div>
        </div>

        <form onSubmit={this.handleSendMessage}
        ref={(el) => { this.myFormRef = el; }}
        style={{
          position: 'relative',
          display: 'inline',
          width: '100%',
          height: '10%',
          border: '2px solid black',
          borderTop: '',
          float: 'left',
          boxSizing: 'border-box'
        }}
        >
        <input type="text" name="Chat" placeholder="Message"
        onFocus={(e) => { e.target.placeholder = ''; }}
        onBlur={(e) => { e.target.placeholder = 'Message'; }}
        style={{
          width: '80%',
          height: '100%',
          paddingBottom: '50px',
          resize: 'none',
          outline: 'none',
          overflow: 'auto',
          background: 'transparent'
        }} />
        <button type="submit" style={{
          width: '20%',
          height: '100%'
        }}>Send</button>
      </form>
      </div>
      </>
    );
  }
}

export default withRouter(Chat);

const addZeroes = (num, length) => {
  let numStr = num.toString();
  const numStrLength = numStr.length;
  for (let i = 0; i < length - numStrLength; i++) {
    numStr = '0' + numStr;
  }
  return numStr;
};

const createCode = (base, num) => {
  // Takes in integers, returns string
  // Create the submission code
  // BASE:    000X
  // LENGTH:  YYYYYY     -> example: 000001, 000052, 000124
  // END:     00
  base = addZeroes(base, 4);
  num = addZeroes(num, 6);

  return base + num + '00';
};

/**
 * Takes in n amount of string parameters.
 *
 * The first and last arguments are numbers related to the operation being performed.
 *
 * Anything inbetween is a message you want to send to the server
 * @param  {...any} values Message parameters. Split into 3 parts:
 * 1. Operation code
 *
 * 2. Messages
 *
 * 3. Ending code
 * @returns {string} The full message to be sent to the server
 */
const createMessage = (...values) => {
  let message = values.slice(1, values.length - 1);
  message = '\f' + message.join('\f') + '\f\f' + values[values.length - 1] + '\f';

  // After a lot of trial and error, I have determined the length of the message
  // is determined by converting it to a UTF8 array buffer.
  // This handles cases for special characters
  const uint8array = new TextEncoder('utf-8').encode(message);
  const code = createCode(values[0], uint8array.length);
  message = '\x1b\t' + code + message;

  return message;
};
