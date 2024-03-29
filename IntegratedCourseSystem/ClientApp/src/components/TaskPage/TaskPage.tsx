import React, { useEffect, useState } from "react";
import Task, { TaskProps } from "../Task/Task";
import Comments from "../Comments/Comments";
import { Box, Button, Container, Grid, LinearProgress, TextField, ThemeProvider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import light from "../../themes/light";
import { Link, useRouteMatch } from "react-router-dom";
import { MatchParamsId, TaskType, TaskViewMode, UserState } from "../../store/types";
import taskService from "../../services/taskService";
import { useSelector } from "react-redux";

const testingPageWrapperStyle = {
    marginTop: "20px",
    padding: "0 30px",
}
const taskStyle = {
    marginTop: "20px",
}
const commentsStyle = {
    marginTop: "20px",
}
const backButtonWrapperStyle = {
    marginTop: "2vw",
}
const backButtonStyle = {
    // marginTop: "20px",
}


const TaskPage = () =>
{
    const user: UserState = useSelector((state: {user: UserState}) => state.user)
    const match = useRouteMatch<MatchParamsId>()
    const taskId = match
        ? match.params.id
            ? Number(match.params.id)
            : null
        : null

    const [task, setTask] = useState<TaskType>()
    const [commentCount, setCommentCount] = useState<number>(-1)
    const [solutionLink, setSolutionLink] = useState<string>('')
    const [solutionLinkForTask, setSolutionLinkForTask] = useState<string | null>('')

    const handleSolutionLinkChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log(event.target.value)
        setSolutionLink(event.target.value as string)
    }
    const handleLinkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await taskService.patchLink(taskId, solutionLink)
        console.log(response)
        setSolutionLinkForTask(solutionLink)
    }
    useEffect(() =>
    {
        async function fetchData()
        {
            const taskInfo = await taskService.getTaskById(taskId)
            console.log("taskInfo", taskInfo)
            const newTask: TaskType = { ...taskInfo.task, grades: taskInfo.grades, amountOfComments: taskInfo.amountOfComments }
            newTask.deadLine = newTask.deadLine ? new Date(newTask.deadLine) : null
            newTask.done = newTask.done ? new Date(newTask.done) : null
            newTask.posted = new Date(newTask.posted)

            setTask(newTask)
            console.log("new task", newTask)
            setCommentCount(newTask.amountOfComments)
            setSolutionLinkForTask(newTask ? newTask.link : '')
        }
        fetchData()
    }, [])

    let taskProps = {
        name: "task name couldn't be loaded...",
        id: -1,
        taskDescription: "",
        isHandedOver: false,
        author: "Омельчук Л.",
        marks: new Map(),
        deadline: new Date(),
        commentCount: 2,
        taskViewMode: TaskViewMode.taskPage,
        link: solutionLinkForTask
    }

    let commentsProps = {
        taskId: taskId,
        setCommentCount,
        commentCount
    }

    if (task) {
        taskProps = {
            name: task.name ? task.name : "task name couldn't be loaded...",
            id: task.id,
            taskDescription: task.taskDescription,
            isHandedOver: task.done ? true : false,
            author: task.authorName || "Omelchuk L.L.",
            marks: new Map(task.grades.map(grade =>
            {
                return [grade.name, [grade.grades.actualGrade, grade.grades.maxGrade, grade.grades.id]]
            })
            ),
            deadline: task.deadLine || new Date(),
            commentCount: (commentCount >= 0) ? commentCount : -1,
            taskViewMode: TaskViewMode.taskPage,
            link: solutionLinkForTask
        }
    }


    return (
        <>
            {
                task
                    ?
                    <ThemeProvider theme={light}>
                        <Container style={testingPageWrapperStyle} >
                            <Task {...taskProps} style={taskStyle} />
                            {/* refactor? */}
                            {
                                user.role === "student"
                                ?
                                <form onSubmit = {handleLinkSubmit}>
                                    <TextField value = {solutionLink} onChange = {handleSolutionLinkChange} />
                                    <Button type = "submit"> Додати розв'язок </Button>
                                </form>
                                : null
                            }
                            <Comments {...commentsProps} style={commentsStyle} />
                            <Grid container justify="center" style={backButtonWrapperStyle}>
                                <Box color="theme_black.main">
                                    <Link to= {`/group_view/${task.groupId}`} style={{ color: "inherit" }}>
                                        <Button startIcon={<ArrowBackIcon />} color="inherit" style={backButtonStyle}>
                                            Назад до сторінки групи
                                        </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Container>
                    </ThemeProvider>
                    : <LinearProgress />
            }
        </>
    )
}


export default TaskPage