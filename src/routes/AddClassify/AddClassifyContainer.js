import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import {actions} from './AddClassifyModule'


import { Form, Select, Input, Button ,message} from 'antd';
const FormItem = Form.Item;

class AddClassifyForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err)  this.props.actions.addClassifySubmit(values,
                msg=>message.success(msg)
            )
        });
    }



    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="分类名称"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('classifyname', {
                        rules: [{ required: true, message: '请填分类!' }],
                    })(
                        <Input />
                    )}
                </FormItem>


                <FormItem
                    wrapperCol={{
                        xs: { span: 8, offset: 0 },
                        sm: { span: 8, offset: 2 },
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        提 交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const AddClassify = Form.create()(AddClassifyForm);


export default connect(state=>Object.assign({},state),dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(AddClassify)

