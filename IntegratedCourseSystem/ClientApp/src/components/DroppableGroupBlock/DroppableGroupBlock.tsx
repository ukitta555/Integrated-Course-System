import React from "react"
import {Box, Grid, Typography} from "@material-ui/core";

type DroppableGroupBlockProps = {
    id: number,
    students: string[],
}


const gridProps = {
    style: {

    }
}
const firstGridProps = {
    style: {
        borderRadius: "20px 20px 0px 0px",
        ...gridProps.style,
    }
}
const lastGridProps = {
    style: {
        borderRadius: "0px 0px 20px 20px",
        ...gridProps.style,
    }
}
const DroppableGroupBlock = (props: DroppableGroupBlockProps) => (
    <Box color="theme_black.main" textAlign="center">
        <Grid container direction="column">
            <Grid item xs>
                <Box bgcolor="theme_grey.main" display="flex" alignItems="center" justifyContent="center" height="100%" border={1} {...firstGridProps}>
                    <Typography variant="h4">Група {props.id}</Typography>
                </Box>
            </Grid>
            {
                props.students.map((student, i) => (
                    <Grid item xs key={i}>
                        <Box bgcolor="theme_white.main" display="flex" alignItems="center" justifyContent="center" height="100%" border={1} borderTop={0} borderColor="theme_black.main" { ...(i == props.students.length - 1 ? lastGridProps : gridProps) }>
                            <Typography variant="h4">{student}</Typography>
                        </Box>
                    </Grid>
                ))
            }
        </Grid>
    </Box>
)

export default DroppableGroupBlock