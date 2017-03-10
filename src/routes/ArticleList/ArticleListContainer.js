import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import { Form, Row, Col, Input, Button, Icon , Table } from 'antd';
const FormItem = Form.Item;
import {actions} from './ArticleListModule'
import  './ArticleListContainer.css';

const columns = [{
    title: '标题',
    placeholder: '标题',
    dataIndex: 'title',
},{
    title: '分类',
    placeholder: '分类',
    dataIndex: 'classify',
}, {
    title: '作者',
    placeholder: '作者',
    dataIndex: 'author',
}, {
    title: '时间',
    placeholder: '时间',
    dataIndex: 'updatetime',
}];
/*const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}*/
class QueryListForm extends Component {

    /*constructor(props){
        super(props)
        this.state = {
            expand: false,
        };
    }*/
    state = {
        expand: false,
        searchItem:[
            "标题",
            "分类",
            "作者",
            "时间"
        ]
    };
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.actions.queryListArticle(values)
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    //Table
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    componentWillMount=()=>{
        this.props.actions.queryListArticle()
    };
    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };

        // To generate mock Form.Item
        const children = [];
        for (let i = 0; i < columns.length; i++) {
            children.push(
                <Col span={8} key={i}>
                    <FormItem {...formItemLayout} label={columns[i].title}>
                        {getFieldDecorator(columns[i].dataIndex)(
                            <Input placeholder={columns[i].placeholder} />
                        )}
                    </FormItem>
                </Col>
            );
        }

        const expand = this.state.expand;
        const shownCount = expand ? children.length : 6;


        //Table
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };

        const {queryList} = this.props;
        console.log(queryList)
        const queryListData =[];

        queryList.items.map((d)=>{
            queryListData.push({
                key:d.article_id,
                title:d.title,
                classify:d.classify,
                author:d.author,
                updatetime:d.updatetime
            })
        });
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={40}>
                        {children.slice(0, shownCount)}
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">Search</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
                            </Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                Collapse <Icon type={expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
                <Table rowSelection={rowSelection} columns={columns} dataSource={queryListData} />
            </div>

        );
    }
}

const ArticleList = Form.create()(QueryListForm);

/*class ArticleList extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedRowKeys: [],  // Check here to configure the default column
            items:[]

        };
    }


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    componentWillMount=()=>{
        this.props.actions.queryListArticle()
    };
    render() {
        //Table
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };

        const {queryList} = this.props;
        const queryListData =[];

        queryList.items.map((d)=>{
            queryListData.push({
                key:d.article_id,
                title:d.title,
                classify:d.classify,
                author:d.author,
                updatetime:d.updatetime
            })
        });

        return (
            <div>
                <QueryListForms />
                <Table rowSelection={rowSelection} columns={columns} dataSource={queryListData} />
            </div>
        )
    }
}*/


/*const mapStateToProps = (state) => {
    console.log(state)
    const {
        items: items
    } = state['ArticleList']['queryList'] || {
        items:[]
    };
    console.log(items)
    return {
        queryList:{
            items: items
        }
    }
};



const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});*/
export default connect((state) => {
    console.log(state)
    const {
        items: items
    } = state['ArticleList']['queryList'] || {
        items:[]
    };
    console.log(items)
    return {
        queryList:{
            items: items
        }
    }
},dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(ArticleList)
