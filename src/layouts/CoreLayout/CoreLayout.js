import React from 'react'
import Header from '../../components/Header'
/*import './CoreLayout.scss'
import '../../styles/core.scss'*/

export const CoreLayout= ({ children }) => {

    let loct =children.props.location.pathname
    switch ( loct.toLocaleLowerCase()){
        case "/signin":
            return  <div className='container1'>
                {children}
            </div>
          break;
        default:
            return  <div className='container2'>
                {children}
            </div>
    }
};

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

