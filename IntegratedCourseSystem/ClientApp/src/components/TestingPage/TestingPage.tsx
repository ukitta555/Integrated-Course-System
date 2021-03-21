import React from "react";
import Task, {TaskProps} from "../Task/Task";
import Comments from "../Comments/Comments";
import {Container} from "@material-ui/core";

const testingPageWrapperStyle = {
    marginTop: "20px",
}

const testTaskProps: TaskProps = {
    name: "Почати щось робити",
    text: "Починаємо роботу! Чим швидше, тим краще! ....",
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


const TestingPage = () =>
    <Container style={testingPageWrapperStyle}>
        <Task {...testTaskProps}/>
        <Comments {...testCommentsProps}/>
    </Container>

export default TestingPage