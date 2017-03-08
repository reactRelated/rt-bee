import React,{ Component ,Children} from 'react'
import { connect, } from 'react-redux'
import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentDidMount=()=>{
       this.actions.selectArticleClassify()
    };
    render() {
        const { getFieldDecorator } = this.props.form;
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
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: '请选择分类!' }],
                        onChange: this.handleSelectChange,
                    })(
                        <Select placeholder="选择文章分类">

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
                        sm: { span: 8, offset: 4 },
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

//合并 Action
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});
export default connect()(AddArticle)

