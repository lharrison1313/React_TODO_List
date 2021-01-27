import React from "react"
import styles from "./TodoListItem.module.css"

function TodoListItem(props){
    return(
        <div>
            <input type="checkbox" id={props.id} className={styles.check} defaultChecked={props.checked} onChange={() => props.onChange(props.id,props.text)}/>
            <label htmlFor={props.id} className={styles.text}> <b>{props.text}</b></label>
        </div>
    )
}



export default TodoListItem