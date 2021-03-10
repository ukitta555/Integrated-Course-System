import React from "react"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import InputBase from "@material-ui/core/InputBase";
import { eventNames } from "process";

const textFieldStyles = {
    background: "#F5F5F5",
    borderRadius: "50px",
    margin: "3% 0",
}

const DeletableTextField = (props: { id: string, onDelete: () => void, value: string, onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <Grid container item alignItems="stretch" justify="center" id={props.id}>
            <InputBase style={textFieldStyles} inputProps={{style: {paddingLeft: "1em"}}} value = {props.value} onChange = {props.onChange} />
            <Button startIcon={<CloseIcon/>} onClick={ props.onDelete }/>
        </Grid>
    )


export default DeletableTextField