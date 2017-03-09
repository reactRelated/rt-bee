import React, { PropTypes } from 'react'
import { Select} from 'antd';
const Option = Select.Option;

const SelectClassify = ({items}) => {
    console.log(items)
   return items.map((d) =>
           <Option key={d.classify_id}>{d.classifyname}</Option>
       )
}

SelectClassify.propTypes = {
    items: PropTypes.array.isRequired
}

export default SelectClassify
