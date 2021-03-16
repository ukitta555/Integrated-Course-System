import React from "react"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import InputBase from "@material-ui/core/InputBase";
import { eventNames } from "process";

const textFieldStyle = {
    background: "#F5F5F5",
    borderRadius: 50,
    margin: "3% 0",
    color: "inherit",
}

const DeletableTextField = (props: { id: string, onDelete: () => void, value: string, onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <Grid container item alignItems="stretch" justify="center" id={props.id}>
            <InputBase style={textFieldStyle} inputProps={{style: {paddingLeft: "1em"}}} value = {props.value} onChange = {props.onChange} />
            <Button startIcon={<CloseIcon/>} onClick={ props.onDelete }/>
        </Grid>
    )


export default DeletableTextField