import React from "react"
import {Box, Grid, Typography} from "@material-ui/core";
import DraggableBlock from "../DraggableBlock/DraggableBlock";

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
                <DraggableBlock bgcolor="theme_grey.main" border={1} {...firstGridProps}>
                    Група {props.id}
                </DraggableBlock>
            </Grid>
            {
                props.students.map((student, i) => (
                    <Grid item xs key={i}>
                        <DraggableBlock border={1} borderTop={0} { ...(i == props.students.length - 1 ? lastGridProps : gridProps) }>
                            {student}
                        </DraggableBlock>
                    </Grid>
                ))
            }
        </Grid>
    </Box>
)

export default DroppableGroupBlock