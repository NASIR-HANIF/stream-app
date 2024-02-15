import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector,useDispatch  } from 'react-redux';
import { Icon } from "../page";

const Dialog = ({title="",children})=>{
    const dispatch = useDispatch()
    const DialogReducer = useSelector(response => response.DialogReducer)
    const design =(
        <>
            <SweetAlert 
            title={title}
            show={DialogReducer.open}
            onConfirm={()=>{}}
            >
             <Icon  
             onClick={()=>dispatch({
                type : "CLOSE_DIALOG"
             })}
             className="absolute top-3 right-3" 
             style={{cursor : "pointer"}}
             >close</Icon>
             {children}
            </SweetAlert>
        </>
    );
    return design
}

export default Dialog