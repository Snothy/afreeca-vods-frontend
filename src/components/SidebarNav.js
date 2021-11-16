import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import {useContext} from 'react';
import LoginContext from '../contexts/login';


function SidebarNav(props) {
    let Login
    const context = useContext(LoginContext);
    const loggedIn = context.loggedIn;
    if(!loggedIn){
        Login = (
            <>
            <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/login">Login</Link>
            </Menu.Item>
            </>
        )
    }
    

    return (
        <>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}
                    style={{
                        backgroundColor:"#f5f6f8", marginTop:8
                    }}
                >
                    <Menu.Item key="1" icon={<UserOutlined />} style={{
                    }}>
                    <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UploadOutlined />}>
                    <Link to="/add">Add streamer</Link>
                    </Menu.Item>
                    {Login}

            </Menu>
        </>
    );
}

export default SidebarNav;