const plannerForm = document.getElementById('planner-form')
const taskInput = document.getElementById('task-input')
const taskList = document.getElementById('task-list')
const taskCount = document.getElementById('task-count')
const emptyState = document.getElementById('empty-state')

const tasks = []

function updateTaskSummary() {
    const remainingTasks = tasks.filter(task => !task.completed).length
    taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} remaining`
    emptyState.hidden = tasks.length > 0
}

function renderTasks() {
    taskList.replaceChildren()

    tasks.forEach(task => {
        const item = document.createElement('li')
        item.className = `planner__item${task.completed ? ' is-complete' : ''}`

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'planner__checkbox'
        checkbox.checked = task.completed
        checkbox.setAttribute('aria-label', `Mark ${task.title} as complete`)
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked
            renderTasks()
        })

        const title = document.createElement('span')
        title.className = 'planner__task-title'
        title.textContent = task.title

        const deleteButton = document.createElement('button')
        deleteButton.type = 'button'
        deleteButton.className = 'planner__delete'
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', () => {
            const taskIndex = tasks.indexOf(task)
            tasks.splice(taskIndex, 1)
            renderTasks()
        })

        item.append(checkbox, title, deleteButton)
        taskList.appendChild(item)
    })

    updateTaskSummary()
}

plannerForm.addEventListener('submit', event => {
    event.preventDefault()
    const title = taskInput.value.trim()

    if (!title) {
        return
    }

    tasks.push({ title, completed: false })
    taskInput.value = ''
    renderTasks()
    taskInput.focus()
})

renderTasks()
