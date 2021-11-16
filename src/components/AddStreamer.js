import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const nameRules = [
    {required: true, message: 'Input name', whitespace: true }
];

class AddStreamer extends React.Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    
    onFinish = (values) => {
        const {...data } = values;
        fetch('https://afreeca-backend.herokuapp.com/api/streamers/', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json", 
            }        
        })
        .then(status)
        .then(json)
        .then(data => {
            alert("Bj added")
            //console.log(data);
        })
        .catch(error => {
            alert("Adding bj failed");
            //console.log(error);
        });  
    };


    render() {



        return (
        <>
        <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
            
            <Form.Item name="bj_id" label="Bj Id" rules={nameRules} >
                <Input />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Add Bj
                </Button>
            </Form.Item>
        </Form>
        </>
        );
    };
};

export default AddStreamer;