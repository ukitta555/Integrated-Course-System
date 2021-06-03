import * as React from "react";
import {Box, Button, Container, Divider, Grid, LinearProgress, ThemeProvider, Typography} from "@material-ui/core"

import light from "../../themes/light";
import {Comment, TeacherInfo} from "../../store/types";
import {useEffect, useState} from "react";
import teacherService from "../../services/teacherService";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";


const dividerStyle = {
    width: "100%",
    margin: "10px 0",
};
const textFieldStyle = {
    background: "#F5F5F5",
    borderRadius: 50,
    margin: "3% 0",
    color: "inherit",
}



const AcceptableTeacherBlock = (props: { id: number, onAccept: (id: number) => void, text: string, onDecline: (id: number) => void }) => (
    <Grid container item alignItems="stretch" justify="center" id={`teacher-${props.id}`}>
        <Typography style={{}}>
            {props.text}
        </Typography>
        <Button startIcon={<CloseIcon/>} onClick={ () => props.onAccept(props.id) }/>
        <Button startIcon={<CloseIcon/>} onClick={ () => props.onDecline(props.id) }/>
    </Grid>
)

const AdminPanel = () => {
    const [teachers, setTeachers] = useState<(TeacherInfo & {id: number} & {user: { email: string }})[]>([])

    const handleDeleteListItem: <T extends { id: number; }>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => (idToRemove: number) => () => void
        = (list, setList) => idToRemove => () => {
        setList(list.filter(item => item.id != idToRemove));
    };

    const onAccept = (id: number) => {
        handleDeleteListItem(teachers, setTeachers)(id)
    }
    const onDecline = (id: number) => {
        handleDeleteListItem(teachers, setTeachers)(id)
    }

    const teachersView = (teachers: (TeacherInfo & {id: number} & {user: { email: string }})[]) => teachers.map((teacher, i) =>
        <Grid container item alignItems="center" style={{}} key={i}>
            <AcceptableTeacherBlock id={teacher.id} text={`${teacher.user.email} ${teacher.name} ${teacher.surname}`} onAccept={onAccept} onDecline={onDecline} />
            <Divider style={dividerStyle}/>
        </Grid>
    )

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