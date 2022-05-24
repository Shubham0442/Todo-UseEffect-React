import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from "./todo.module.css"


const Todo = () => {

    const [todos, settodos] = useState([]);
    const [newTodo, setNewTodo ] = useState ("")
    const [page, setpage] = useState(1);


const saveInfo =()=>{
    
    fetch("http://localhost:3000/posts",{
     method: "POST",
     headers:{
         "content-type":"application/json"
     },
     body:JSON.stringify({
         value: newTodo,
         isCompleted:false
     }),
    })
    .then((r) => r.json())
    .then((d) =>{
        settodos([...todos,d])
        setNewTodo("")
    });
}

  useEffect(()=>{
      
    fetch(`http://localhost:3000/posts?_page=${page}&_limit=3`)
    .then((r) => r.json())
    .then((d) =>{
        settodos(d)
    });
 

  },[page])

 let handleChange = (val)=>{
    setpage(val)
 }
  

  return (
      
    <div className={styles.container} >

        <h1>Add Todos</h1>

        <div className={styles.div1}>

            <input placeholder='Add Your todo' value = {newTodo} onChange={({target}) =>setNewTodo(target.value)}/>

            <button onClick={saveInfo}>+</button>

            <div className={styles.list}>
                    {
                        todos.map((todo)=>(
                            <div key={todo.id}>{todo.value}</div>
                        ))
                    }
            </div>
            
        </div>
        <div className={styles.div2} >
                <div className={styles.page} onClick={()=>handleChange(1)}>
                    Page-1
                </div>
                <div className={styles.page} onClick={()=>handleChange(2)}>
                    Page-2
                </div>
                <div className={styles.page} onClick={()=>handleChange(3)}>
                    Page-3
                </div>
        </div>
    </div>
  )
}

export default Todo

// {
//     "posts": [
      
//           { "id": 1, "value": "Todo1", "isCompleted": true},
//           { "id": 2, "value": "Todo2", "isCompleted": false},
//           { "id": 3, "value": "Todo3", "isCompleted": false}
      
//     ]
    
//   }