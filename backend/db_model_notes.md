# Ideas for Data Modeling

User {
  userId
  userName
  tasksCompleted
  dailyTasks
  longTermGoals
}

To-Do Item {
  taskId
  ownerId
  type
  priority
  parentTask
  childTasks
  taskName
  taskDetails
  completed
  dateCreated
  dateDue
  dateCompleted
  orderNumber
  timeEstimated
}