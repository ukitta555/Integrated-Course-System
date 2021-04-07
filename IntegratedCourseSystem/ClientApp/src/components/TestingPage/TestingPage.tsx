import React from "react";
import Task, {TaskProps} from "../Task/Task";
import Comments from "../Comments/Comments";
import {Container, ThemeProvider} from "@material-ui/core";
import CoursesView from "../AllCoursesView/CoursesView";
import DroppableGroupBlock from "../DroppableGroupBlock/DroppableGroupBlock";
import light from "../../themes/light";
import DistributionEditingPage from "../DistributionEditingPage/DistributionEditingPage";
import { TaskViewMode } from "../../store/types";

const testingPageWrapperStyle = {
    marginTop: "20px",
}

const testTaskProps: TaskProps = {
    name: "Почати щось робити",
    id: 1,
    taskDescription: "Починаємо роботу! Чим швидше, тим краще! ....",
    isHandedOver: true,
    author: "Омельчук Л.",
    marks: new Map([["ООП", [2, 2, 2]], ["МСП", [2, 2, 3]]]),
    deadline: new Date(2021, 1, 12, 23, 59, 59),
    commentCount: 2,
    taskViewMode: TaskViewMode.groupPage
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

const testDistributionEditingPageProps = {
    course_id: 1337,
    groups: [{
        id: 1,
        students: [
            "Андращук Е.",
            "Некряч В.",
            "Приходько Я.",
            "Клячкін А.",
            "Скоробагатько К.",
        ],
    },{
        id: 2,
        students: [
            "Андращук Е.",
            "Некряч В.",
        ],
    },{
        id: 3,
        students: [
            "Андращук Е.",
            "Некряч В.",
            "Приходько Я.",
            "Скоробагатько К.",
        ],
    },{
        id: 4,
        students: [

        ],
    },{
        id: 5,
        students: [
            "Андращук Е.",
            "Некряч В.",
            "Приходько Я.",
            "Клячкін А.",
            "Скоробагатько К.",
        ],
    }
    ]
}


const TestingPage = () =>
    <ThemeProvider theme={light}>
        <Container style={testingPageWrapperStyle}>
            <DistributionEditingPage {...testDistributionEditingPageProps}/>
        </Container>
    </ThemeProvider>


export default TestingPage