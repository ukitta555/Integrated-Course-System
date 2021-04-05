import React from "react";
import {Box, Container, Grid, ThemeProvider, Typography} from "@material-ui/core";
import DroppableGroupBlock from "../DroppableGroupBlock/DroppableGroupBlock";
import light from "../../themes/light";
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";

const distributionEditingPageWrapperStyle = {
    marginTop: "5%",
}

type DistributionEditingPageProps = {
    course_id: number,
    groups: { id: number, students: string[] }[],
}

const DistributionEditingPage = (props: DistributionEditingPageProps) =>
    <ThemeProvider theme={light}>
        <Container style={distributionEditingPageWrapperStyle}>
            <Grid container spacing={10} direction="column">
                <Grid container direction="row" justify="space-between" item xs>
                    <Grid item xs>
                        <BoxWithImageBG bgimage="document_icon.png"/>
                    </Grid>
                    <Grid item xs={8}>
                        <Box color="theme_black.main" textAlign="center" margin="7em 0 2em 0">
                            <Typography variant="h3">Редагування розподілу груп</Typography>
                            <Typography variant="h4">ID курсу: {props.course_id}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container item xs>
                    <Box bgcolor="theme_green.dark" borderRadius="48px" padding="2%">
                        <Grid container spacing={1}>
                            {
                                props.groups.map((group, i) => (
                                        <Grid item xs={4} key={group.id}>
                                            <DroppableGroupBlock {...group}/>
                                        </Grid>
                                    )
                                )
                            }
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>


export default DistributionEditingPage