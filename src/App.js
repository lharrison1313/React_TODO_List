import styles from './App.module.css';
import React from 'react';
import TodoListItem from './components/TodoListItem'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id_counter: 0,
      todo_data: [],
      completed_data: [],
      list_type: "todo",
      input: ""
    }

  }

  addListItem = (text,type) =>{
    if(type === "todo"){
      let data = this.state.todo_data;
      data.push({text: text, id: this.state.id_counter})
      this.setState({
        todo_data: data,
        id_counter: this.state.id_counter+1,
        input: ""
      })
      
    }
    else if(type === "completed"){
      let data = this.state.completed_data;
      data.push({text: text, id: this.state.id_counter})
      this.setState({
        completed_data: data,
        id_counter: this.state.id_counter+1,
        input: ""
      })
      
    }
    
  }

  removeListItem = (id, type) =>{
    if(type === "todo"){
      this.setState({
        todo_data: this.state.todo_data.filter(item => item.id !== id)
      })
    }
    else if(type === "completed"){
      this.setState({
        completed_data: this.state.completed_data.filter(item => item.id !== id)
      })
    }
  }

  renderList = (type) =>{
      if(type === "todo"){
        return this.state.todo_data.map((item) =>{
         return <TodoListItem text={item.text} id={item.id} checked={false} key={item.id} onChange={this.onCheckChange}/>
        })
      }
      else if(type === "completed"){
        return this.state.completed_data.map((item) =>{
           return <TodoListItem text={item.text} id={item.id} checked={true} key={item.id} onChange={this.onCheckChange}/>
        })
      }
  }

  onCheckChange = (id,text) =>{
    if(this.state.list_type === "todo"){
      this.addListItem(text,"completed");
      this.removeListItem(id,"todo");
    }
    else if(this.state.list_type === "completed"){
      this.addListItem(text,"todo");
      this.removeListItem(id,"completed");
    }
  }

  render(){
    return (
      <div className = {styles.container}>
        <div className = {styles.header}>
          <h1>React To-Do List</h1>
        </div>

        <div className = {styles.todo_container}>

          <div className = {styles.todo}>
            <div className={styles.todo_header}>
              <button className={styles.todo_header_button} onClick={()=> {this.setState({list_type:"todo"})}}> <b>To-Do</b> </button>
              <button className={styles.todo_header_button} onClick={()=> {this.setState({list_type:"completed"})}}> <b>Completed</b> </button>
            </div>

            <div className={styles.todo_list_container}>
              {this.renderList(this.state.list_type)}
            </div>

            <div className={styles.todo_form}>
              <input className={styles.todo_form_input} type="text" value={this.state.input} onChange={(event)=>this.setState({input:event.target.value})}/>
              <button className={styles.todo_form_button} onClick={()=> this.addListItem(this.state.input,this.state.list_type)}>add item</button>
            </div>

          </div>
        </div>

          
      </div>
    );
  }
}

export default App;
