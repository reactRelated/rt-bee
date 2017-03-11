import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import {actions} from './AddArticleModule'


import { Form, Select, Input, Button ,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err)  this.props.actions.addArticleSubmit(values,
                msg=>message.success(msg)
            )
        });
    }
    handleSelectChange = (value) => {
        console.log(this.props.classify)

    }

    componentWillMount=()=>{
        this.props.actions.selectArticleClassify()
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const { classify } = this.props;
        const  options = classify.items.map(d => <Option key={d.classify_id}>{d.classifyname}</Option>);
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="标题"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请填写标题!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="文章类别"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('classify', {
                        rules: [{ required: true, message: '请填写分类!' }],
                        onChange: this.handleSelectChange,
                    })(
                        <Select placeholder="选择分类">
                            {options}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    label="内容"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('info', {
                        rules: [{ required: true, message: '请填写文章内容!' }],
                    })(
                        <Input type="textarea" placeholder="文章内容" autosize={{ minRows: 20, maxRows: 25 }} />
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
    const {
        items: items
    } = state['AddArticle']['classify'] || {
        items:[]
    };
   return {
       classify:{
           items: items
       }
   }
};



const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(AddArticle)

