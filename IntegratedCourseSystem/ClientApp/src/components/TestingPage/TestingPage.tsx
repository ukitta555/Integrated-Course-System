import React from "react";
import Task, {TaskProps} from "../Task/Task";
import Comments from "../Comments/Comments";
import {Container, ThemeProvider} from "@material-ui/core";
import CoursesView from "../AllCoursesView/CoursesView";
import DroppableGroupBlock from "../DroppableGroupBlock/DroppableGroupBlock";
import light from "../../themes/light";

const testingPageWrapperStyle = {
    marginTop: "20px",
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

const testGroupProps = {
    id: 1,
    students: [
        "Андращук Е.",
        "Некряч В.",
        "Приходько Я.",
        "Клячкін А.",
        "Скоробагатько К.",
    ]
}


const TestingPage = () =>
    <ThemeProvider theme={light}>
        <Container style={testingPageWrapperStyle}>
            <DroppableGroupBlock {...testGroupProps}/>
        </Container>
    </ThemeProvider>
    

export default TestingPage