// build your `Task` model here
const db = require('../../data/dbConfig');

async function getTasks() {
    const tasks = await db('tasks as t')
        .join('projects as p',' t.project_id', 'p.project_id')
        .select('t.*', 'p.project_name', 'p.project_description') 
    const results = [];
    for (let i = 0; i < tasks.length; i++) {
        let resp = {
            task_id: tasks[i].project_id,
            task_description: tasks[i].task_description,
            task_notes: tasks[i].task_notes,
            task_completed: tasks[i].task_completed === 0 ? false : true,
            project_name: tasks[i].project_name,
            project_description: tasks[i].project_description
        }
        results.push(resp);
    }
    return results;
}

async function createTask(task) {
    const [id] = await db('tasks').insert(task);
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .where('task_id', id)
        .select('t.*')
        .first()
}

module.exports = {
    getTasks,
    createTask
}