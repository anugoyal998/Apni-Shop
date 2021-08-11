import {Typography} from '@material-ui/core'


const style = {
    one: {
        fontSize: "2rem"
    },
    two: {
        fontSize: "1.2rem",
        opacity: ".7",
    }
}
const EmptyPaymentHistory = ()=> {
    return(
        <div className="d-flex flex-column align-items-center">
            <Typography style={style.one}>You haven't buy anything</Typography>
            <Typography style={style.two}>Start shopping on Apni Shop now!</Typography>
        </div>
    )
}

export default EmptyPaymentHistory;