import React, {useRef, useState} from "react";
import {
    Box,
    Container,
    Divider, Grid, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, ListSubheader,
    Typography
} from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Togglable from "../Togglable/Togglable";
import {ClassSubject, Group} from "../../store/types";

type GroupBlockProps = {
    tasks_made?: number;
    tasks_total?: number;
    group: Group;
    classSubjects: ClassSubject[];
}
type Color =
    | "theme_green.main"
    | "theme_yellow.main"
    | "theme_red.main"
    | "theme_grey.light"

const pickBGColor = (tasks_made: number, tasks_total: number): Color => {
    // if (tasks_total < 3) return "theme_grey.light"
    if (tasks_total < 3) return "theme_green.main"
    else if (tasks_made > tasks_total * (2/3)) return "theme_green.main"
    else if (tasks_made > tasks_total * (1/3)) return "theme_yellow.main"
    else return "theme_red.main"
}

const GroupBlock = ({group, classSubjects, tasks_made = 0, tasks_total = 0}: GroupBlockProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true)
    const ref = useRef()
    const handleGroupDropdown = () => {
        //@ts-expect-error
        ref.current.toggleVisibility()
        setIsDropdownOpen(!isDropdownOpen)
    }

    const groupWrapperStyle = {

    }

    const openIconStyle = {
        transform: 'rotate(180deg)',
    }

    const closedIconStyle = {
        transform: 'rotate(0deg)'
    }

    return (
        <Box bgcolor={pickBGColor(tasks_made, tasks_total)} color="theme_black.main" borderRadius={43}>
            <Box display="flex">
                <IconButton onClick={handleGroupDropdown} disableRipple={true}
                        style={isDropdownOpen ? openIconStyle : closedIconStyle}>
                    <ArrowDropDownIcon fontSize="large"/>
                </IconButton>
                <Typography variant="h3" display="inline">Група {group.id}</Typography>
            </Box>
            {//@ts-expect-error
            }<Togglable ref={ref}>
            <Divider/>
            <div style={groupWrapperStyle}>
                <Container>
                    <List subheader={<ListSubheader><Typography variant="h5">Склад:</Typography></ListSubheader>}>
                        <Grid container justify="space-between">
                            {group.groupMembers.map(groupMember =>
                                <Grid item xs={6}>
                                    <ListItem key={groupMember.id}>
                                        <ListItemIcon style={{minWidth: "2rem",}}><Box color="theme_grey.main"><FiberManualRecordIcon color="inherit"/></Box></ListItemIcon>
                                        <ListItemText primaryTypographyProps={{variant: "h5"}}>
                                            {groupMember.surname} {groupMember.name}
                                        </ListItemText>
                                    </ListItem>
                                </Grid>
                            )
                            }
                        </Grid>
                    </List>
                </Container>
                <Container>
                    <List subheader={<ListSubheader><Typography variant="h5">Технології:</Typography></ListSubheader>}>
                        <Grid container>
                            {group.groupTeches.map(groupTech =>
                                <Grid item xs={6}>
                                    <ListItem key={groupTech.id}>
                                        <ListItemIcon style={{minWidth: "2rem",}}><Box color="theme_grey.main"><FiberManualRecordIcon color="inherit"/></Box></ListItemIcon>
                                        <ListItemText primaryTypographyProps={{variant: "h5"}}>
                                            {groupTech.name}
                                        </ListItemText>
                                    </ListItem>
                                </Grid>
                            )
                            }
                        </Grid>
                    </List>
                </Container>
                <Container>
                    <List subheader={<ListSubheader><Typography variant="h5">Дисципліни:</Typography></ListSubheader>}>
                        <Grid container>
                            {classSubjects.map(classSubj =>
                                <Grid item xs={6}>
                                    <ListItem key={classSubj.id}>
                                        <ListItemIcon style={{minWidth: "2rem",}}><Box color="theme_grey.main"><FiberManualRecordIcon color="inherit"/></Box></ListItemIcon>
                                        <ListItemText primaryTypographyProps={{variant: "h5"}}>
                                            {classSubj.name}
                                        </ListItemText>
                                    </ListItem>
                                </Grid>
                            )
                            }
                        </Grid>
                    </List>
                </Container>
            </div>
        </Togglable>
        </Box>
    )
}

export default GroupBlock