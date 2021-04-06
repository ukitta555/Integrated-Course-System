import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Class, Role, UserState } from "../../store/types";
import studentGroupsService from "../../services/studentGroupsService";
import { useSelector } from "react-redux";

const courseWrapperStyle = {
    // border: "4px double black"
}
const upperPartBoxStyle = {
    borderRadius: "54px 54px 0px 0px",
    padding: "1rem 0.5rem 0 0.5rem",
}
const lowerPartBoxStyle = {
    borderRadius: "0px 0px 54px 54px",
    padding: "3rem 0 2rem 0",
}
const registrationButtonBoxStyle = {
    borderRadius: 55,
}
const registrationButtonStyle = {
    width: "100%",
    borderRadius: 55,
}
type CourseProps = Class & {
    role: Role | null;
    onSplitButtonClick?: (event: any, courseId: number) => Promise<void>
}

const Course = (props: CourseProps) =>
{
    const user: UserState = useSelector((state: { user: UserState }) => state.user)
    const [groupIdStudent, setGroupIdStudent] = useState<number>(-1)
    useEffect(() =>
    {
        async function fetchData()
        {
            if (user.role === "student")
            {
                const groupId = await studentGroupsService.getGroupByStudent(user.id, props.id)
                setGroupIdStudent(groupId)
            }
        }
        fetchData()
    })

    return (
        <Container key={props.id} style={courseWrapperStyle}>
            <Grid container spacing={3} justify="center" alignItems="center" direction="column">
                <Grid item xs>
                    <Box bgcolor="theme_green.dark" color="theme_white.main" textAlign="center" style={upperPartBoxStyle}>
                        {props.areGroupsDefined
                            ? user.role === "teacher"
                                ?
                                (
                                    <Link to={`/course_view/${props.id}`}>
                                        <Box color="theme_white.main">
                                            <Typography variant="h3">{props.name}</Typography>
                                        </Box>
                                    </Link>
                                )
                                :
                                (
                                    <Link to={`/group_view/${groupIdStudent}`}>
                                        <Box color="theme_white.main">
                                            <Typography variant="h3">{props.name}</Typography>
                                        </Box>
                                    </Link>
                                )
                            : <Typography variant="h3">{props.name}</Typography>
                        }
                        <Typography variant="h3">Id: {props.id}</Typography>
                    </Box>
                    <Box bgcolor="theme_green.main" color="theme_black.main" textAlign="center" style={lowerPartBoxStyle}>
                        <Typography variant="h3">Кількість учнів: {props.studentsRegistered}</Typography>
                        <Typography variant="h3">Max: {props.maxCapacity}</Typography>
                    </Box>
                </Grid>
                {
                    props.role === 'teacher'
                        ?
                        <>
                            <Grid item xs={6}>
                                <Box bgcolor="theme_green.dark" color="theme_white.main" textAlign="center" style={registrationButtonBoxStyle}>
                                    {/*<Link to = '/register' style={{color: "inherit"}}>*/}
                                    <Button color="inherit" style={registrationButtonStyle} onClick={(event: any) => props.onSplitButtonClick ? props.onSplitButtonClick(event, props.id) : null}>
                                        <Typography variant="h5">{props.areGroupsDefined ? "Змінити розподіл" : "Запустити розподіл"}</Typography>
                                    </Button>
                                    {/*</Link>*/}
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box bgcolor="theme_grey.main" color="theme_white.main" textAlign="center" style={registrationButtonBoxStyle}>
                                    {/*<Link to = '/register' style={{color: "inherit"}}>*/}
                                    <Button color="inherit" style={registrationButtonStyle} onClick={(event: any) => props.onSplitButtonClick ? props.onSplitButtonClick(event, props.id) : null}>
                                        <Typography variant="h5">Редагувати курс</Typography>
                                    </Button>
                                    {/*</Link>*/}
                                </Box>
                            </Grid>
                        </>
                        : null
                }
            </Grid>
        </Container>
    )
}
export default Course