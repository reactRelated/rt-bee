import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { Layout, Menu, Icon ,Breadcrumb ,Affix} from 'antd';
const { SubMenu } = Menu;
const { Header, Sider, Content ,Footer} = Layout;

import './MainLayout.css';

export default class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {layoutMinHeight: document.documentElement.clientHeight};
    }

    componentWillMount=()=>{
        window.onresize=function () {
            this.setState({layoutMinHeight: document.documentElement.clientHeight});
        }.bind(this);
    };
    render() {
        const { layoutMinHeight } = this.state;
        const { layout,children } = this.props;
        return (
            <Layout  style={{ minHeight:layoutMinHeight}}>
                <Header className="header">
                    <div className="logo">Bee</div>
                    <img />
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                            <Affix >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                onClick={function (item) {
                                    browserHistory.push({
                                        pathname: item.key,
                                        state: { path: item.key}
                                    })
                                }}
                            >

                                    <Menu.Item key="/">首页</Menu.Item>
                                <SubMenu key="sub1" title={<span><Icon type="laptop" />文章管理</span>} >
                                    <Menu.Item key="/AddArticle" >文章添加</Menu.Item>
                                    <Menu.Item key="/ArticleList" >文章列表</Menu.Item>
                                    <Menu.Item key="/AddClassify" >添加分类</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="user" />个人中心</span>}>
                                    <Menu.Item key="/ModifyPersonal">修改资料</Menu.Item>
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
                            {children}
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


