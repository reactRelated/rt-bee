import React from 'react'

export const Signin = (props) => (
    <div style={{ margin: '0 auto' }} >
        <h2>登录</h2>
        <form >
            <div >
                <span >用户名：</span>
                <input type="text"  placeholder='用户名'/>
            </div>
            <div >
                <span >密码：</span>
                <input type="text" placeholder='密码' />
            </div>
        </form>
        <button onClick={props.actions.signinSubmit}>
            提交
        </button>

        <button onClick={props.actions.signinPostSubmit}>
            提交
        </button>
    </div>
)



export default Signin

