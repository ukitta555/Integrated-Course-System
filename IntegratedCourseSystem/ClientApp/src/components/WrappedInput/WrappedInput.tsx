import React from "react"
import Grid from "@material-ui/core/Grid";
import InputBase, {InputBaseComponentProps} from "@material-ui/core/InputBase";
import {Box, InputLabel} from "@material-ui/core";
import CustomInput from "../CustomInput/CustomInput";

type WrappedInputProps = {
    value: string | number | undefined,
    label?: string,
    name?: string,
    type?: string,
    id?: string,
    bgcolor?: string,
    color?: string,
    inputbgcolor?: string,
    inputcolor?: string,
    inputProps?: InputBaseComponentProps,
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}


const textFieldWrapperStyle = {
    padding: "5px calc(100% / 12)",
    borderRadius: 20,
}
const textFieldStyle = {
    backgroundColor: "inherit",
    borderRadius: "inherit",
    // margin: "3% 0",
    color: "inherit",
}
const textFieldBoxStyle = {
    // padding: "0 calc(100% / 12)",
    borderRadius: 20,
}

const WrappedInput = (props: WrappedInputProps) => (
    // <Box bgcolor={props.bgcolor ?? ""} color={props.color ?? ""} id={props.id ?? ""} style={textFieldWrapperStyle}>
    //     {props.label && <InputLabel>{props.label}</InputLabel>}
    //     <CustomInput bgcolor={props.inputbgcolor ?? ""} color={props.inputcolor ?? ""} id={props.id ?? ""} name={props.name ?? ""} type={props.type ?? "text"} inputProps={props.inputProps ?? {}} value={props.value ?? ""} onChange = {props.onChange} />
    // </Box>
    <Box bgcolor={props.bgcolor ?? ""} color={props.color ?? ""} id={props.id ?? ""} style={textFieldWrapperStyle}>
        {props.label && <InputLabel>{props.label}</InputLabel>}
        <Box bgcolor={props.inputbgcolor ?? ""} color={props.inputcolor ?? ""} style={textFieldBoxStyle}>
            <InputBase name={props.name ?? ""} type={props.type ?? "text"} style={textFieldStyle} inputProps={{...props.inputProps, style: {paddingLeft: "1em"}}} /* inputProps={{style: {paddingLeft: "1em"}}}  */ value = {props.value ?? ""} onChange = {props.onChange} />
        </Box>
    </Box>
    // <Grid container item direction="column" justify="center" alignItems="center" /* alignItems="stretch" */ id={props.id} style={regWrapperStyle}>
    //     <Grid item style={textFieldWrapperStyle}>
    //         <InputLabel>Enter email:</InputLabel>
    //         <InputBase name="email" style={textFieldStyle} inputProps={{...props.inputProps, style: {paddingLeft: "1em"}}} /* inputProps={{style: {paddingLeft: "1em"}}}  */ value = {props.value} onChange = {props.onChange} />
    //     </Grid>
    // </Grid>
)




export default WrappedInput