import React from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import { Layout, Menu, Icon ,Breadcrumb ,Affix} from 'antd';
const { SubMenu } = Menu;
const { Header, Sider, Content ,Footer} = Layout;

import './MainLayout.css';
import {layoutResize} from '../../store/coreLayout'

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {a:2} ;
        // this.state =  {LayoutResize: document.documentElement.clientHeight};
    }

    componentDidMount=()=>{
        window.onresize=function () {
            this.props.actions.layoutResize(document.documentElement.clientHeight)
        }.bind(this);
    };
    render() {

        // let _LayoutResize = this.state.LayoutResize;
        console.log(this)


        return (
            <Layout  style={{ minHeight:this.props.layout.minheight}}>
                {console.log(this)}
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Affix >
                                <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                            </Affix>
                        </Sider>

                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2017 https://github.com/VanquisherMe Bee by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
};

//合并 Action
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        layoutResize
    }, dispatch)

});
export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo)
