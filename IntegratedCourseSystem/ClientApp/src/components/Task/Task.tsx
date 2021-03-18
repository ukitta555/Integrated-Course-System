import React from 'react'
// import {Link}
//     from 'react-router-dom'
// import {useSelector} from 'react-redux'

import Typography from '@material-ui/core/Typography';

import {Box, Divider, Grid, ThemeProvider} from "@material-ui/core";
import light from "../../themes/light";

// type Color =
//     | { name: "green"; palette_name: "theme_green.main" }
//     | { name: "yellow"; palette_name: "theme_yellow.main" }
//     | { name: "red"; palette_name: "theme_red.main" }
//     | { name: "grey"; palette_name: "theme_grey.main" }

// const pickBGColor = (props: TaskProps): Color => {
//     const isMarked = Array.from(props.marks.values(), ([mark, _]) => mark !== 0).some(el => el)
//     if (isMarked) return { name: "green", palette_name: "theme_green.main" }
//     else if (props.isHandedOver) return { name: "yellow", palette_name: "theme_yellow.main" }
//     else if (props.deadline < new Date()) return { name: "red", palette_name: "theme_red.main" }
//     else return { name: "grey", palette_name: "theme_grey.main" }
// }

type Color =
    | "theme_green.main"
    | "theme_yellow.main"
    | "theme_red.main"
    | "theme_grey.light"

export type TaskProps = {
    name: string;
    text: string;
    isHandedOver: boolean;
    author: string;
    marks: Map<string, [number, number]>;
    deadline: Date;
    commentCount: number;
}

const pickBGColor = (props: TaskProps): Color => {
    const isMarked = Array.from(props.marks.values(), ([mark, _]) => mark !== 0).some(el => el)
    if (isMarked) return "theme_green.main"
    else if (props.isHandedOver) return "theme_yellow.main"
    else if (props.deadline < new Date()) return "theme_red.main"
    else return "theme_grey.light"
}
const parseMarks = (marks: Map<string, [number, number]>) => {
    const marks_array = Array.from(marks.entries())
    return marks_array.map(([subject, [mark, max_mark]]) => (
        <Grid container item alignItems="center" style={{}}>
            <Typography style={{}}>
                {subject}: {mark} / {max_mark}
            </Typography>
        </Grid>

    ))
}

const taskWrapperStyle = {
    padding: "7px 21px",
    borderRadius: 28,
}

const dividerStyle = {
    width: "100%",
};
const Task = (props: TaskProps) => (
        <ThemeProvider theme={light}>
            <Box bgcolor={pickBGColor(props)} style={taskWrapperStyle}>
                        <Grid container direction="column" /* justify="space-between" */ alignItems="center" style={{}}>
                            <Grid container item alignItems="center" style={{}}>
                                <Typography variant="h6" style={{}}>
                                    Завдання: {props.name}
                                </Typography>
                            </Grid>
                            <Grid container item alignItems="center" style={{}}>
                                <Typography style={{}}>
                                    Автор: {props.author}
                                </Typography>
                            </Grid>
                            <Divider style={dividerStyle}/>
                            <Grid container item alignItems="center" style={{}}>
                                <Typography variant="h6" style={{}}>
                                    Оцінки:
                                </Typography>
                            </Grid>
                            {parseMarks(props.marks)}
                            <Divider style={dividerStyle}/>
                            <Grid container item alignItems="center" style={{}}>
                                <Typography style={{}}>
                                    {props.text}
                                </Typography>
                            </Grid>
                            <Grid container item direction="row" justify="space-between" alignItems="center" style={{}}>
                                <Typography style={{}}>
                                     Дедлайн: {props.deadline.toDateString()}
                                </Typography>
                                <Typography style={{}}>
                                    Коментарів: {props.commentCount}
                                </Typography>
                            </Grid>
                        </Grid>
            </Box>
        </ThemeProvider>
    )

export default Task