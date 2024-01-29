import './todoCard.css'
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
function TodoCard(props) {
    const {cardid,title,body,delid,display,updateId,toBeUpdate} = props;

    return (
        <div className="col-lg-3 col-10 mx-5 my-3 p-5 todo-card">
            <div>
                <h4>{title}</h4>
                <br>
                </br>
                <p className='todo-card-p'>
                    {body.split("", 80)}.....
                </p>
            </div>
            <div className='d-flex justify-content-around'>

                <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1' onClick={()=>{
                    display("block");
                    toBeUpdate(updateId);}}>
                    <GrUpdate className='card-icons' /> Update
                </div>
                <div className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1' onClick={()=>delid(cardid)}>
                    <MdDeleteForever className='card-icons del' /> Delete
                </div>
            </div>
        </div>
    );
}

export default TodoCard;