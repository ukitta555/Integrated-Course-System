import React from "react"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import { eventNames } from "process";

const DeletableTextField = (props: { id: string, onDelete: () => void, value: string, onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <Grid item id={props.id}>
            <TextField variant="outlined" value = {props.value} onChange = {props.onChange}/>
            <Button startIcon={<CloseIcon/>} onClick={ props.onDelete }/>
        </Grid>
    )


export default DeletableTextField