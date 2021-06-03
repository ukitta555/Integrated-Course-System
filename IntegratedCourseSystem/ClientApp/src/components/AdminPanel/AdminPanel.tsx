import * as React from "react";
import {Box, Button, Container, Divider, Grid, LinearProgress, ThemeProvider, Typography} from "@material-ui/core"

import UsersListForAdminPanel, { UsersEdit, UsersCreate, UserIcon } from '../UsersListForAdminPanel';
import light from "../../themes/light";
import {Comment, TeacherInfo} from "../../store/types";
import {useEffect, useState} from "react";
import teacherService from "../../services/teacherService";


const dividerStyle = {
    width: "100%",
    margin: "10px 0",
};

const teachersView = (teachers: TeacherInfo[]) => teachers.map((teacher, i) =>
    <Grid container item alignItems="center" style={{}} key={i}>
        <Typography style={{}}>
            {teacher.name} {teacher.surname}
        </Typography>
        <Divider style={dividerStyle}/>
    </Grid>
)

const AdminPanel = () => {
    const [teachers, setTeachers] = useState<(TeacherInfo & {user: { email: string }})[]>([])
    useEffect(() => {
        async function fetchData() {
            const teachersResponse = await teacherService.getTeachers()
            setTeachers(teachersResponse.map ((teacher : {name: string, surname: string, user: { email: string }}) => (
                {
                    name: teacher.name,
                    surname: teacher.surname,
                    user: teacher.user
                }))
            )
        }
        fetchData()
    })

   return (
       <ThemeProvider theme={light}>
           {teachersView(teachers)}
       </ThemeProvider>
    )
}
export default AdminPanel