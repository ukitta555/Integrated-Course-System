import React from "react"
import {DropTarget, useDrag, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import {Box, BoxProps, Typography} from "@material-ui/core";

type DropResult = {
    name: string
}

const ItemTypes = {
    BOX: 'box',
}


const defaultProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "0.5em 0",
    bgcolor: "theme_white.main",
    border: 1,
    borderColor: "theme_black.main",
}

const DraggableBlock = ({children, ...boxProps}: BoxProps) => {
    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: ItemTypes.BOX,
    //     item: { name },
    //     end: (item, monitor) => {
    //         const dropResult = monitor.getDropResult<DropResult>()
    //         if (item && dropResult) {
    //             alert(`You dropped ${item.name} into ${dropResult.name}!`)
    //         }
    //     },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging(),
    //         handlerId: monitor.getHandlerId(),
    //     }),
    // }))
    //
    // const opacity = isDragging ? 0.4 : 1

    return (
        <Box {...{...defaultProps, ...boxProps}}>
            <Typography variant="h4">{children}</Typography>
        </Box>
    )
}

export default
//     DropTarget(
//     (props: BoxProps) => props.accepts,
//     {
//         drop(props: BoxProps, monitor: DropTargetMonitor) {
//             props.onDrop(monitor.getItem())
//         },
//     },
//     (connect, monitor) => ({
//         connectDropTarget: connect.dropTarget(),
//         isOver: monitor.isOver(),
//         canDrop: monitor.canDrop(),
//     }),
// )
    (DraggableBlock)