import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import {actions} from './AddArticleModule'

import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classify:[
                {classify_id:"798cc20b0de725039ce946a8adb42e8c", classifyname:"javascript"}
            ]
        };
    }

    componentDidMount=()=>{
        this.props.actions.selectArticleClassify()
    };
    shouldComponentUpdate =(nextProps)=>{
        console.log(nextProps)
        console.log(this.props)

        return nextProps.id !== this.props.id;
    };
    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            title: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this)
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="标题"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请填写标题!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="分类"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                >
                    {getFieldDecorator('select', {
                        rules: [{ required: true, message: '请选择分类!' }],
                        onChange: this.handleSelectChange,
                    })(
                        <Select  placeholder="选择文章分类">
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="内容"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                >
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请填写内容!' }],
                    })(
                        <Input type="textarea" rows={4} />
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 8, offset: 0 },
                        sm: { span: 8, offset: 2 },
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const AddArticle = Form.create()(AddArticleForm);

const mapStateToProps = (state) => {
    console.log(state)
   return {
       classify:state.AddArticle
   }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(AddArticle)

