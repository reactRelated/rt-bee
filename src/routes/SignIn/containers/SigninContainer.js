import { bindActionCreators } from 'redux'
import { connect, } from 'react-redux'
import {actions} from '../modules/signin'
import Signin from '../components/Signin'

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
