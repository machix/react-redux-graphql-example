let dbTodoList = {
  todos: [
    { id: 0, text: 'Todo 0', completed: false },
    { id: 1, text: 'Todo 1', completed: false }
  ]
}

export const CONSTANTS = {
  'ADD_TODO': 'ADD_TODO',
  'TOGGLE_TODO': 'TOGGLE_TODO',
  'ASYNC_ACTION': 'ASYNC_ACTION',
  'RECEIVE_TODOS': 'RECEIVE_TODOS'
}

const todoID = () => {
  return Date.now()
}

const asyncGetTodos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dbTodoList)
    }, 2000)
  })
}

const asyncAddTodo = (text) => {
  let id = todoID()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dbTodoList.todos = [
        ...dbTodoList.todos, {
          id: id,
          text: text,
          completed: false
        }
      ]
      resolve(id)
    }, 2000)
  })
}

const asyncToogleTodo = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dbTodoList.todos = dbTodoList.todos.map(todo => {
        if (todo.id !== id) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      })
      resolve(id)
    }, 2000)
  })
}

const asyncAction = () => {
  return {
    type: CONSTANTS['ASYNC_ACTION']
  }
}

export const receiveTodos = () => {
  return (dispatch) => {
    dispatch(asyncAction())
    return asyncGetTodos()
      .then(todoList => dispatch({
        type: CONSTANTS['RECEIVE_TODOS'],
        todos: todoList.todos
      }))
  }
}

export const addTodo = (text) => {
  return (dispatch) => {
    dispatch(asyncAction())
    return asyncAddTodo(text)
      .then(id => {
        dispatch({
          type: CONSTANTS['ADD_TODO'],
          text: text,
          id: id
        })
      })
  }
}

export const toggleTodo = (id) => {
  return (dispatch) => {
    dispatch(asyncAction())
    return asyncToogleTodo(id)
      .then(id => {
        dispatch({
          type: CONSTANTS['TOGGLE_TODO'],
          id
        })
      })
  }
}
