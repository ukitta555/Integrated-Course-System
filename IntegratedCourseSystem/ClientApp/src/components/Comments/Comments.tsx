import React, {useState, useEffect} from "react";

import {useSelector} from "react-redux"


import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Box, Button, Container, Divider, Grid, InputBase, ThemeProvider} from "@material-ui/core";
import light from "../../themes/light";
import { UserState, Comment } from "../../store/types";
import commentService from "../../services/commentService";


export type CommentsProps = {
    taskId: number | null,
    style?: React.CSSProperties,
}

const taskWrapperStyle = {
    padding: "7px 21px",
    borderRadius: 27.5,
}
const dividerStyle = {
    width: "100%",
    margin: "10px 0",
};
const addCommentInputStyle = {
    borderRadius: 27.5,
    width: "100%",
}
const inputWrapperStyle = {
    width: "100%",
    paddingRight: "1em",
}
const addCommentButtonWrapperStyle = {
    marginTop: "0.5vw",
    borderRadius: 27.5,
}
const addCommentButtonStyle = {
    borderRadius: 27.5,
}

const commentsView = (comments: Comment[]) => comments.map((comment, i) =>
        <Grid container item alignItems="center" style={{}} key={i}>
            <Typography style={{}}>
                {comment.author} пише:
                <br/>
                {comment.text}
            </Typography>
            <Divider style={dividerStyle}/>
        </Grid>
)
const customUseField: (type: string) => [{ onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; type: string; value: string }, React.Dispatch<React.SetStateAction<string>>]
    = type => {
    const [value, setValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return [{
        type,
        value,
        onChange
    }, setValue]
}

const Comments = (props: CommentsProps) => {
    const user = useSelector((state: {user: UserState}) => state.user)

    const [comments, setComments] = useState<Comment[]>([])
    const [comment, setComment] = customUseField('text');

    useEffect(() => {
        async function fetchData() {
            const commentsResponse = await commentService.getCommentsByTask(props.taskId)
            setComments(commentsResponse.map ((comment : {name: string, surname: string, text: string, id: number}) : Comment => (
                {
                    author: `${comment.surname} ${comment.name}`,
                    text: comment.text,
                    commentId: comment.id
                }))
            )
        }
        fetchData()
    })

    const onAddComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const commentToAdd = {
            taskId: props.taskId,
            text: comment.value,
            userId: user.id
        }
        const commentResponse = await commentService.addComment(commentToAdd)
        console.log('response after post to comments: ', commentResponse)
        setComments([...comments, {author: `${user.surname} ${user.name}`, text: comment.value, commentId: commentResponse.id}])
        setComment("")

    }

    const commentProps = {
        required: true,
        ...comment
    }

    return (
        <ThemeProvider theme={light}>
            <Box bgcolor="theme_yellow.main" color="theme_black.main" style={{...taskWrapperStyle, ...props.style}}>
                <Grid container direction="column" /* justify="space-between" */ alignItems="center" style={{}}>
                    <Grid container item alignItems="center" justify="center" style={{}}>
                        <Typography variant="h4" style={{}}>
                            Коментарі
                        </Typography>
                    </Grid>
                    <Divider style={dividerStyle}/>
                    {commentsView(comments)}
                    <Box bgcolor="theme_white.light" color="theme_black.main" style={addCommentInputStyle}>
                        <InputBase placeholder="Ваш коментар" style={inputWrapperStyle}
                                   inputProps={{...commentProps, style: {paddingLeft: "1em"}}}/>
                    </Box>
                    <Box bgcolor="theme_grey.main" color="theme_white.main" style={addCommentButtonWrapperStyle}>
                        <Button color="inherit" onClick={onAddComment} style={addCommentButtonStyle}>Додати коментар</Button>
                    </Box>

                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default Comments