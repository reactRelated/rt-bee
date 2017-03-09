import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import {actions} from './AddArticleModule'

import { Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddArticleForm extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            classify:[]
        };
    }*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleSelectChange = (value) => {
        console.log(value);
        console.log(this.props.classify)

    }
    options =() =>{
       /* console.log(this.props.classify)
        this.state.classify.map(d => {
            console.log(d)
        });*/

        return  <Option value="male">male</Option>
    }

    componentDidMount=()=>{
        this.props.actions.selectArticleClassify()
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="Note"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('note', {
                        rules: [{ required: true, message: '请填写标题!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="Gender"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请填写分类!' }],
                        onChange: this.handleSelectChange,
                    })(
                        <Select placeholder="选择分类">
                            {this.options()}
                           {/* <Option value="male">male</Option>
                            <Option value="female">female</Option>*/}
                        </Select>
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

const mapStateToProps = (state) => {
    console.log(state)
   return {

   }
};




const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(AddArticle)

