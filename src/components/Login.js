import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import LoginContext from '../contexts/login';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import info from '../config';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
};

const usernameRules = [
  { required: true, message: 'Input username', whitespace: true }
];

const passwordRules = [
  { required: true, message: 'Input password', whitespace: true }
];

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      success: false
    };
    this.onFinish = this.onFinish.bind(this);
  }

  static contextType = LoginContext;

  onFinish = (values) => {
    const { ...data } = values;
    const url = info.url + 'streamers/login';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        // console.log(data);
        if (data.login === true) {
          let index, cookie;
          let cookieString = '';
          for (let i = 0; i < data.headers['set-cookie'].length; i++) {
            cookie = data.headers['set-cookie'][i];
            index = cookie.indexOf(';');
            cookie = cookie.slice(0, index + 1);
            if (i === 0) {
              cookieString = cookieString + cookie;
            } else {
              cookieString = cookieString + ' ' + cookie;
            };
          }
          // sessionStorage.setItem( `cookie`, cookieString );
          this.context.login(cookieString);
          alert('Login successful');
          this.setState({ success: true });
        } else {
          // console.log('false');
          alert('Login failed');
        }

        // console.log(data);
      })
      .catch(error => {
        alert('Login failed');
        console.log(error);
      });
  };

  render () {
    return (
      <>
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >

          <Form.Item name="username" label="Username" rules={usernameRules} >
              <Input autoComplete="on" placeholder="Enter username" />

          </Form.Item>

          <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
          <Input.Password
              autoComplete="on"
              placeholder="input password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                  Login
              </Button>
          </Form.Item>
      </Form>

      { this.state.success && <Redirect to="/" /> }
      </>
    );
  };
};

export default Login;
