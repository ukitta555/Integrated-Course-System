import React, { useEffect, useState } from "react";
import Task, { TaskProps } from "../Task/Task";
import Comments from "../Comments/Comments";
import { Box, Button, Container, Grid, ThemeProvider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import light from "../../themes/light";
import { Link, useRouteMatch } from "react-router-dom";
import { MatchParamsId, TaskType } from "../../store/types";
import taskService from "../../services/taskService";

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


const testCommentsProps = {
    comments: [
        { author: "Скоробагатько Карина", text: "А можна не робити?" },
        { author: "Омельчук Людмила", text: "Треба!" },
    ]
}
const TaskPage = () =>
{
    const match = useRouteMatch<MatchParamsId>()
    const taskId = match
        ? match.params.id
            ? Number(match.params.id)
            : null
        : null

    const [task, setTask] = useState<TaskType>()



    useEffect(() =>
    {
        async function fetchData()
        {
            const taskInfo = await taskService.getTaskById(taskId)
            const newTask: TaskType = { ...taskInfo.task, grades: taskInfo.grades }
            newTask.deadLine = newTask.deadLine ? new Date(newTask.deadLine) : null
            newTask.done = newTask.done ? new Date(newTask.done) : null
            newTask.posted = new Date(newTask.posted)

            setTask(newTask)
            console.log(newTask)
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
        commentCount: 2
    }

    if (task) {
        taskProps = {
            name: task.name ? task.name : "task name couldn't be loaded...",
            id: task.id,
            taskDescription: task.taskDescription,
            isHandedOver: task.done ? true : false,
            author: "Омельчук Л.",
            marks: new Map(task.grades.map(grade =>
            {
                return [grade.name, [grade.grades.actualGrade, grade.grades.maxGrade]]
            })
            ),
            deadline: task.deadLine || new Date(),
            commentCount: 2
        }
    }


    return (
        <>
            {
                task
                    ?
                    <ThemeProvider theme={light}>
                        < Container style={testingPageWrapperStyle} >
                            <Task {...taskProps} style={taskStyle} />
                            <Comments {...testCommentsProps} style={commentsStyle} />
                            <Grid container justify="center" style={backButtonWrapperStyle}>
                                <Box color="theme_black.main">
                                    <Link to='/register' style={{ color: "inherit" }}>
                                        <Button startIcon={<ArrowBackIcon />} color="inherit" style={backButtonStyle}>
                                            Назад до сторінки групи
                            </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Container >
                    </ThemeProvider >
                    : null
            }
        </>
    )
}


export default TaskPage