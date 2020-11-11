import { Router } from 'express'
import {createTodos, getTodos, updateTodo, deleteTodo} from '../controllers/todos'

const router = Router()

router.post('/', createTodos)

router.get('/', getTodos)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router