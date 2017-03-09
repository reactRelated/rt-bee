import React,{ Component ,Children} from 'react'
import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import {actions} from './AddArticleModule'

import SelectClassify from './ClassifyOptionComponet'

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
    handleSelectChange = (value) => {
        console.log(value);
        console.log(this.props.classify)

    }

    componentWillMount=()=>{
        this.props.actions.selectArticleClassify()
    };

    render() {

        console.log(this)
        const { getFieldDecorator } = this.props.form;
        const { classify } = this.props;
        const  options = classify.items.map(d => <Option key={d.classify_id}>{d.classifyname}</Option>);
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
                            {options}
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
    const {
        items: items
    } = state['AddArticle']['classify'] || {
        items:[]
    };
    console.log(items)
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
