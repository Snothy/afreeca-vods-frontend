import React from 'react';
import { withRouter } from "react-router";
import LoginContext from '../contexts/login';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ws: null,
          msgs: [{
            user: "Chat",
            content: ""
          }],
          mounted: false
        }
    }

    static contextType = LoginContext;


    componentDidMount() {
      this.setState({mounted: true});
      this.connect();
    }
    

    connect = () => {
      const ws = new WebSocket(this.props.data.chat, "chat");
      this.setState({ws: ws});

      let connection;
      if(this.props.data.auth === "") {
        connection = "	00010000060016";
      } else {
        //	000100000600 represents the length of the message
        //there's 6 extra special characters in the request besides the cookie (auth code) submission
        const baseValue = "0001000";
        const length = addZeroes(baseValue, 6 + this.props.data.auth.length);
        connection = "	"+ length +"" +this.props.data.auth+"16";
      }
  
      const ping = "	000000000100";
      let sendPing = setInterval(function() {
        ws.send(ping);
      }, 1*60*1000); //60 seconds

      ws.onclose = e => {
        clearInterval(sendPing);
        //console.log(e);
      }

      ws.onopen = () => {
        ws.send(connection);
      }

      let counter = 0;
      const baseValue = "0002000";
      let connection2 = '' + this.props.data.chatno + '' +this.props.data.ftk +'0log&set_bps=2000&quality=ori&geo_cc=BG&geo_rc=39&acpt_lang=en_US&svc_lang=en_US&join_cc=100pwdauth_infoNULLpver1access_systemhtml5';
      const length = addZeroes(baseValue, connection2.length);
      connection2 = '	' + length + connection2;
      ws.onmessage = async e => {
        //Once a response is received, send second handshake message
        if(counter === 0) {
          ws.send(connection2);
          counter += 1;
        }
        //console.log(e.data);
        const arrayBuffer = await e.data.arrayBuffer();
        var bytes = new Uint8Array(arrayBuffer);
        const txt = new TextDecoder("UTF-8").decode(bytes);
        //console.log(txt);
        const character = txt.substring(14,15);
        const splitMsg = txt.split(character);
        const code = splitMsg[0].substring(2, 6);
        //Sent messages begin with 0005
        if(code === '0005') {
          //console.log(splitMsg[6] + ": " + splitMsg[1]);
          const msg = {
            user: splitMsg[6],
            content: splitMsg[1]
          };
          let msgs = this.state.msgs;
          msgs.push(msg);
          //remove first msg if there are 40 msgs
          if(msgs.length > 40) {
            msgs.shift();
          }
          if(!this.state.mounted) {
            return;
          }
          this.setState({msgs: msgs})
        }
      }
      
    }

    handleSendMessage = (e) => {
      e.preventDefault();
      const value = e.target[0].value;

      //can't send empty messages
      if(value === "") {
        return;
      }
      this.myFormRef.reset();

      if(!this.context.loggedIn) {
        alert("Log in to send messages");
        return;
      }

      const ws = this.state.ws;
      //Message submits appear to start at  000500000400
      //Each character increases this value 000500000500
      //                                    000500000600
      //...                                 000500001000
      //there's 4 extra special characters in the request besides the text submission
      //=> 0050005000 + 001 or + 010 or + 100  -> i'm capping it at 999characters
      const baseValue = "0005000";
      const length = addZeroes(baseValue, 4+value.length);
      ws.send('	'+ length +'' + value + '0');
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ block: 'nearest', inline: 'start' });
    }

    componentDidUpdate() {
      if (this.messagesEnd) {
        this.scrollToBottom();
      }
      
    }

    componentWillUnmount() {
      const ws = this.state.ws;
      this.setState({mounted: false});
      ws.close();
    }


    render() {
      if(this.state.ws === null) {
        return (
          <>
          <p>Loading msg</p>
          </>
        )
      }
      //const ws = this.state.ws;

      if(this.state.msgs.length === 0) {
        return(
          <>
          </>
        );
      }

      const msgList = this.state.msgs.map((msg, i) => {
        return (
          <div key={i} style={{
            marginLeft: "3px"
          }}>
            <span key={msg.user} style={{color:"#767676", fontSize: "10px"}}>{msg.user} :</span>
            <p style={{marginBottom:"2.5px"}} key={msg.content}>{msg.content}</p>
          </div>
        )
      });

      return (
        <>
        <div style={{
          display:'inline-block',
          width: "24%",
          height: "80%",
          float: "right"
        }}>
        <div style={{
            display: 'inline',
            position:"relative",
            width: "100%",
            height: "90%",
            overflowY: "scroll",
            overflowWrap: "break-word",
            border: "2px solid black",
            float: "left",
            boxSizing: "border-box",
          }}
          >
            {msgList}
            <div ref={(el) =>  this.messagesEnd = el }>
              
            </div>
          </div>

          <form onSubmit={this.handleSendMessage}
          ref={(el) => this.myFormRef = el}
          style={{
            position:"relative",
            display:'inline',
            width: "100%",
            height: "10%",
            border: "2px solid black",
            borderTop: "",
            float: "left",
            boxSizing: "border-box"
          }}
          >
          <input type="text" name="Chat" placeholder="Message" 
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Message"}
          style={{
            width: "80%",
            height:"100%",
            paddingBottom: "50px",
            resize: "none",
            outline: "none",
            overflow: "auto",
            background: "transparent"
            }} />
          <button type="submit" style={{
            width: "20%",
            height: "100%"
          }}>Send</button>
        </form>
        </div>
        </>
);
    }
}

export default withRouter(Chat);

const addZeroes = (base, num) => {
  //Create the submission code
  // BASE:    000X000
  // LENGTH:  YYY     -> example: 001, 052, 124
  // END:     00
  //assuming max is 999
  let numStr = num.toString();
  const length = numStr.length;
  for(let i=0; i< 3-length; i++) {
    numStr = "0" + numStr;
  }
  return base+numStr+'00';
}



/* old chat


      const msgList = this.state.msgs.map((msg, i) => {
        return (
          <div key={i} style={{
            position: "relative"
          }}>
            <p key={i}>{msg.user}: {msg.content}</p>
          </div>
        )
      });




          <div style={{
            position:"absolute",
            left: "46%",
            bottom: "49%",
            width: "20%",
            height: "45%",
            overflowY: "scroll",
            border: "2px solid black",
            float: "left"
          }}
          >
            {msgList}
            <div ref={(el) =>  this.messagesEnd = el }>
              
            </div>
          </div>
*/