import React from 'react'
import Header from '../../components/Header'
/*import './CoreLayout.scss'
'*/
import '../../styles/core.css';
export const CoreLayout= ({ children }) => {

    let loct =children.props.location.pathname;
    switch ( loct.toLocaleLowerCase()){
        case "/signin":
            return  <div className='door-container'>
                {children}
            </div>
          break;
        default:
            return  <div className='container'>
                {children}
            </div>
    }
};

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

