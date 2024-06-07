const express = require('express')
const router = express.Router()
const pool = require('../db')
const authenticateToken = require('../middleware/auth')

// Route to get all tasks 
router.get('/', authenticateToken, async(req,res)=>{
    const all_tasks = await pool.query('SELECT * FROM task')
    res.json(all_tasks.rows)
})

//Route to add task
router.post('/',authenticateToken, async(req, res)=>{
    const User_id = req.user.id
    const description = req.body.description
    const new_task = await pool.query('INSERT INTO task(user_id,description) VALUES($1,$2) RETURNING *', [User_id,description])
    res.status(200).json(new_task.rows[0])
})

//Router to get a specific task
router.get('/:id',authenticateToken, async(req, res)=>{
    const task_id = req.params.id
    const new_task = await pool.query('SELECT * FROM task WHERE id = $1', [task_id])
    res.status(200).json(new_task.rows[0])
}) 

//Route to update task
router.put('/:id',authenticateToken, async(req, res)=>{
    const task_id = req.params.id
    const description = req.body.description
    const new_task = await pool.query('UPDATE task SET description = ($1) WHERE id = ($2) RETURNING *', [description, task_id])
    res.status(200).json(new_task.rows[0])
})

//Route to delete task 
router.delete('/:id',authenticateToken, async(req, res)=>{
    const task_id = req.params.id
    const delete_task = await pool.query('DELETE FROM task WHERE id = ($1) RETURNING *', [task_id])
    res.status(200).send("task deleted successfully")
})

module.exports = router 