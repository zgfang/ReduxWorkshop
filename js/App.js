import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

type Todo = {
  id: number,
  name: string,
  completed: boolean,
}

const defaultTodos: Array<Todo> = []

const addTodoAction = {
  type: 'ADD_TODO',
  name: '记得买牛奶'
}

function addTodoReducer(todos: Array<Todo>, action): Array<Todo> {
  if (action.type === 'ADD_TODO') {
    return [...todos, {
      id: todos.length,
      name: action.name,
      completed: false
    }]
  }
  return todos;
}

const toggleTodoAction = {
  type: 'TOGGLE_TODO',
  id: 0,
}

function toggleTodoReducer(todos, action) {
  if (action.type === 'TOGGLE_TODO') {
    return todos.map(todo=>{
      if (todo.id === action.id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
  }
  return todos
}

function merge(reducers) {
  return (state, action) => {
    return reducers.reduce( (loopState, reducer) => {
      return reducer(loopState, action)
    }, state)
  }
}

const totalReducer = merge([addTodoReducer, toggleTodoReducer])


let result = totalReducer(defaultTodos, addTodoAction)
result = totalReducer(result, addTodoAction)
result = totalReducer(result, toggleTodoAction)



class CPICLife extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(result)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CPICLife
