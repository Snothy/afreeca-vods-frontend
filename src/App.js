import React from 'react';
import { Layout } from 'antd';
import './App.css';

import SidebarNav from './components/SidebarNav';
import Favourites from './components/Favourites';
import Vods from './components/Vods';
import Vod from './components/Vod';
import AddStreamer from './components/AddStreamer';
import Login from './components/Login';
import Live from './components/Live';
import Browse from './components/Browse';
import LoginContext from './contexts/login';


import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


const { Content, Sider } = Layout;



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            cookie: ''
        }
        this.login = this.login.bind(this);
    }


    login(cookie) {
        
        //sessionStorage.setItem( `cookie`, cookie );
        this.setState({cookie:cookie});
        this.setState({loggedIn: true});
    }

    render() {

        const context = {
            loggedIn: this.state.loggedIn,
            cookie: this.state.cookie,
            login: this.login
            };
            
        return(
            <LoginContext.Provider value={context}>
            <Router >
                <Layout className="layout" style={{backgroundColor:"#f5f6f8"}} >

                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme="light"
                style={{
                    backgroundColor:"#f5f6f8"
                }}
                onBreakpoint={broken => {
                    //console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    //console.log(collapsed, type);
                }}
                >
                <div className="logo" />

                <SidebarNav />

                </Sider>



                <Content >
                    <Switch >
                        <Route path="/:id/live" children={<Live />} />
                        <Route path="/:id/:vodId" children={<Vod />} />
                        
                        <Route path="/favourites" children={<Favourites />} />
                        <Route name="add" path="/add" children={<AddStreamer />} />
                        <Route name="add" path="/login" children={<Login />} />
                        <Route name="vods" path="/:id" children={<Vods />} />

                        <Route path="/" children={<Browse />} />

                        
                    </Switch>
                </Content>
               

                </Layout>

            </Router>
            </LoginContext.Provider>
        )
    }
}

export default App;
//                               <Route path="/:id/:vodId" children={<Vod />} />
//                              <Route path="/:id" children={<Vods />} />