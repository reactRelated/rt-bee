import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, message, Button ,Upload ,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {actions} from './ModifyPersonalModule'
import './ModifyPersonalContainer.css';

const residences = [{
    value: 'zhejiang',
    label: '浙江',
    children: [{
        value: 'hangzhou',
        label: '杭州',
        children: [{
            value: 'xihu',
            label: '西湖',
        }],
    }],
}, {
    value: 'jiangsu',
    label: '江苏',
    children: [{
        value: 'nanjing',
        label: '南京',
        children: [{
            value: 'zhonghuamen',
            label: '中华门',
        }],
    },{
        value: 'zhenjian',
        label: '镇江',
        children: [{
            value: 'runzhouqu',
            label: '润州区',
        }]
    }],
}];

class ModifyForm extends Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const {personalDetails:{info:info}}=this.props
            if (!err) {
                values['residence']=values['residence'].join()
                values['user_id']=info.user_id

                this.props.actions.modifyPersonalSubmit(values,
                    msg=> message.success(msg),
                    msg=> message.error(msg))
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { info } = this.props.personalDetails;

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 14 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 14,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        昵称&nbsp;
                            <Tooltip title="需要一些提示么?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        initialValue: info.nickname,
                        rules: [{ required: true, message: 'Please input your nickname!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        initialValue: info.email,
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="重置密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {

                        rules: [{
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="常住地址"
                >
                    {getFieldDecorator('residence', {
                        initialValue: (info.residence ? info.residence.split(",") :[]),
                        rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                    })(
                        <Cascader options={residences} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        initialValue: info.phone,
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input addonBefore={prefixSelector} />
                    )}
                </FormItem>
               {/* <FormItem
                    {...formItemLayout}
                    label="验证码"
                    extra="We must make sure that your are a human."
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                            })(
                                <Input size="large" />
                            )}
                        </Col>
                        <Col span={12}>
                            <Button size="large">Get captcha</Button>
                        </Col>
                    </Row>
                </FormItem>*/}

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const Modify = Form.create()(ModifyForm);
//设置头像
class Avatar  extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    };

    componentWillReceiveProps = (nextProps)=>{
        console.log(nextProps)
        console.log("componentWillReceiveProps")
        if (this.props !== nextProps) {
            this.state.fileList[0]={
                uid: -1,
                name: 'avator.png',
                status: 'done',
                url: nextProps.personalDetails.info.avator,
            }
        }

    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    handleRemove=({fileList}) =>{
        console.log("handleRemove")
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={__SERVER_HOST__+'/AdminApi/EditUserAvatar'}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

 class ModifyPersonal extends Component {
     componentWillMount=()=>{
         const {actions} =  this.props
         console.log(actions)
         actions.personalDetails()

     };
        render(){
            const {props} =  this
            const formItemLayout = {
                labelCol: { span: 2 },
                wrapperCol: { span: 14 },
            };

            return (
                <div>
                    <div className="ant-form-horizontal">
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                        头像&nbsp;
                            <Tooltip title="头像是不与下面表单关联?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                            )}
                            hasFeedback
                        >
                            <Avatar  {...props}/>
                        </FormItem>
                    </div>
                    <Modify {...props}/>
                </div>
            )
        }
 }


export default connect((state) => {
    const {
        info: info
    } = state['ModifyPersonal']['personalDetails'] || {
        info:{}
    };

    return {
        personalDetails:{
            info: info
        }
    }
},dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(ModifyPersonal)