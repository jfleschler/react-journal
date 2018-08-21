query allData {
journals {
name
topics {
id
name
taskGroups {
name
id
tasks {
id
text
complete
}
}
}
}
}

query topicSearch {
topic(id: "72f83267-7a0b-4304-939d-360364b0a519") {
taskGroups {
name
tasks {
text
complete
}
}
}
}

mutation completeTask {
toggleTask(taskId: "4ef2e97d-d688-4e9c-8dd6-43956a25a6db") {
id
text
complete
}
}

mutation createTask {
createTask(taskGroupId: "b68d5f81-9078-4ca4-b695-fedcfd908bba", text: "This is a new task") {
id
text
complete
}
}
