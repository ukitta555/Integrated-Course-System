import React from "react"
import {Box, BoxProps, Typography} from "@material-ui/core";

const defaultProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    bgcolor: "theme_white.main",
    border: 1,
    borderColor: "theme_black.main",
}

const DraggableBlock = ({children, ...boxProps}: BoxProps) => (
    <Box {...{...defaultProps, ...boxProps}}>
        <Typography variant="h4">{children}</Typography>
    </Box>
)

export default DraggableBlock