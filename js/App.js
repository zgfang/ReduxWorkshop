/*
* @flow
*/

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

type Action = 
    { type: 'TOGGLE_TODO', id: number }|
    { type: 'ADD_TODO', name: string } 

const defaultTodos: Array<Todo> = []

const addTodoAction: Action = {
  type: 'ADD_TODO',
  name: '记得买牛奶'
}

function addTodoReducer(todos: Array<Todo>, action: Action): Array<Todo> {
  if (action.type === 'ADD_TODO') {
    return [...todos, {
      id: todos.length,
      name: action.name,
      completed: false
    }]
  }
  return todos;
}

const toggleTodoAction: Action = {
  type: 'TOGGLE_TODO',
  id: 0,
}

function toggleTodoReducer(todos: Array<Todo>, action: Action): Array<Todo> {
  if (action.type === 'TOGGLE_TODO') {
    const actionId = action.id
    return todos.map(todo=>{
      if (todo.id === actionId) {
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
