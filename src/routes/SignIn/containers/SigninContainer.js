import React from 'react'
import { bindActionCreators } from 'redux'

import { connect, } from 'react-redux'
import {actions} from '../modules/signin'
// import Signin from '../components/Signin'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const Signin = Form.create()(React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {


                this.props.actions.handleSubmit(values)
            }
        });
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        const { actions } = this.props;

        return (
            <div style={{ width:300}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请你输入密码!' }],
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <Button type="primary" onClick={actions.signinPostSubmit} className="login-form-button">
                        ajax
                    </Button>
                    Or <a>register now!</a>
                </FormItem>
            </Form>
            </div>
        );
    },
}));



const mapStateToProps = (state) => ({

})
/*const mapDispatchToProps = {
    ...key
}*/



//合并 Action
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Signin)
