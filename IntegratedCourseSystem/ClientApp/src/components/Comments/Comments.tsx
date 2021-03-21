import React, {useState} from "react";

// import {Link}
//     from 'react-router-dom'
// import {useSelector} from 'react-redux'

import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Box, Button, Container, Divider, Grid, InputBase, ThemeProvider} from "@material-ui/core";
import light from "../../themes/light";
import useField from "../../hooks/useField";

type Comment = {
    author: string,
    text: string,
}

export type CommentsProps = {
    comments: Comment[],
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
    const [comments, setComments] = useState([
        {author: "Скоробагатько Карина", text: "А можна не робити?"},
        {author: "Омельчук Людмила", text: "Треба!"},
    ])
    const [comment, setComment] = customUseField('text');
    const commentProps = {
        // pattern: EMAIL_VALIDATOR,
        required: true,
        // autoComplete: "username",
        ...comment
    }
    const onAddComment = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setComments([...comments, {author: "Андращук Едуард", text: comment.value}])
        setComment("")
        // dispatch (registerUser(email.value, password.value))

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