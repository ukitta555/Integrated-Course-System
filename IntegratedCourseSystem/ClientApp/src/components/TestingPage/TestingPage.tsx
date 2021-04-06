import React from "react";
import Task, {TaskProps} from "../Task/Task";
import Comments from "../Comments/Comments";
import {Container, ThemeProvider} from "@material-ui/core";
import CoursesView from "../AllCoursesView/CoursesView";
import DroppableGroupBlock from "../DroppableGroupBlock/DroppableGroupBlock";
import light from "../../themes/light";
import DistributionEditingPage from "../DistributionEditingPage/DistributionEditingPage";
import GroupBlock from "../GroupBlock/GroupBlock";
import {ClassSubject} from "../../store/types";

const testingPageWrapperStyle = {
    marginTop: "20px",
}

const testTaskProps: TaskProps = {
    name: "Почати щось робити",
    id: 1,
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

const testDistributionEditingPageProps = {
    course_id: 1337,
    groups: [
        {
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

const testGroupBlockProps = {
    tasks_made: 28,
    tasks_total: 33,
    group: {
        id: 1,
        name: "1",
        classid: 1,
        groupTeches: [
            {
                id: 1,
                groupid: 1,
                techid: 1,
                name: "C#",
            },{
                id: 2,
                groupid: 1,
                techid: 2,
                name: "JS",
            },{
                id: 3,
                groupid: 1,
                techid: 3,
                name: "F#",
            },{
                id: 4,
                groupid: 1,
                techid: 4,
                name: "TS",
            },
        ],
        groupMembers: [
            {
                id: 1,
                name: "Е.",
                surname: "Андращук",
            },{
                id: 2,
                name: "В.",
                surname: "Некряч",
            },{
                id: 3,
                name: "Я.",
                surname: "Приходько",
            },{
                id: 4,
                name: "А.",
                surname: "Клячкін",
            },{
                id: 5,
                name: "К.",
                surname: "Скоробагатько",
            },
        ]
    },
    classSubjects: [
        {
            id: 1,
            name: "ООП"
        },{
            id: 2,
            name: "Методи специфікації"
        },{
            id: 3,
            name: "Методи верифікації"
        },
    ]
}


const TestingPage = () =>
    <ThemeProvider theme={light}>
        <Container style={testingPageWrapperStyle}>
            <GroupBlock {...testGroupBlockProps}/>
        </Container>
    </ThemeProvider>
    

export default TestingPage