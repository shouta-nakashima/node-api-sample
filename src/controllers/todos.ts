import { RequestHandler } from 'express'
import { Todo } from '../models/todos';
import { json } from 'body-parser';

const TODOS: Todo[] = []

export const createTodos: RequestHandler = (req, res, next) => {
  const text = (req.body as {text: string}).text
  const newTodo = new Todo(Math.random().toString(), text)

  TODOS.push(newTodo)

  res.status(200).json({message: 'Todoを追加しました。', createdtodo: newTodo})
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({todos: TODOS})
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id
  const updateText = (req.body as {text: string}).text

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

  if (todoIndex < 0) {
    throw new Error('対象のtodoが見つかりません。')
  }
  TODOS[todoIndex] = new Todo(todoId, updateText)

  res.json({message: 'todoを更新しました。', updateTodo: TODOS[todoIndex]})
}

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id
  

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

  if (todoIndex < 0) {
    throw new Error('対象のtodoが見つかりません。')
  }

  TODOS.splice(todoIndex, 1)

  res.json({message: '削除しました'})
}