import React from "react";
import Task, {TaskProps} from "../Task/Task";
import Comments from "../Comments/Comments";
import {Box, Button, Container, Grid, ThemeProvider} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import light from "../../themes/light";
import {Link} from "react-router-dom";

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
const testTaskProps: TaskProps = {
    name: "Почати щось робити",
    taskDescription: "Починаємо роботу! Чим швидше, тим краще! ....",
    isHandedOver: true,
    author: "Омельчук Л.",
    marks: new Map([["ООП", [2, 2]], ["МСП", [2, 2]]]),
    deadline: new Date(2021, 1, 12, 23, 59, 59),
    commentCount: 2,
}

const testCommentsProps = {
    comments: [
        {author: "Скоробагатько Карина", text: "А можна не робити?"},
        {author: "Омельчук Людмила", text: "Треба!"},
    ]
}
const TaskPage = () =>
    <ThemeProvider theme={light}>
    <Container style={testingPageWrapperStyle}>
        <Task {...testTaskProps} style={taskStyle}/>
        <Comments {...testCommentsProps} style={commentsStyle}/>
        <Grid container justify="center" style={backButtonWrapperStyle}>
            <Box color="theme_black.main">
                <Link to = '/register' style={{color: "inherit"}}>
                    <Button startIcon={<ArrowBackIcon/>} color="inherit" style={backButtonStyle}>
                        Назад до сторінки групи
                    </Button>
                </Link>
            </Box>
        </Grid>
    </Container>
    </ThemeProvider>

export default TaskPage