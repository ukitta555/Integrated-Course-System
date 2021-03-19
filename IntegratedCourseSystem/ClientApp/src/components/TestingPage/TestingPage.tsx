import React from "react";
import Task, {TaskProps} from "../Task/Task";

const testProps: TaskProps = {
    name: "Почати щось робити",
    text: "Починаємо роботу! Чим швидше, тим краще! ....",
    isHandedOver: true,
    author: "Омельчук Л.",
    marks: new Map([["ООП", [2, 2]], ["МСП", [2, 2]]]),
    deadline: new Date(2021, 1, 12, 23, 59, 59),
    commentCount: 2,
}


const TestingPage = () => <Task {...testProps}/>

export default TestingPage