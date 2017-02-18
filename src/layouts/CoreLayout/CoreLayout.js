import React from 'react'
import Header from '../../components/Header'
/*import './CoreLayout.scss'
import '../../styles/core.scss'*/

export const CoreLayout = ({ children }) => {
  if(children.props){
    console.log(children)
    return  <div className='container1'>
        {children}
    </div>
  }else {
      return   <div className='container2'>
        {children}
    </div>
  }
};

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
