import React from "react";
import InputBase, {InputBaseComponentProps} from "@material-ui/core/InputBase";
import {Box, createStyles, Theme, withStyles} from "@material-ui/core";
import light from "../../themes/light";

type CustomInputProps = {
    value: string | number | undefined,
    name?: string,
    type?: string,
    id?: string,
    bgcolor?: string,
    color?: string,
    inputProps?: InputBaseComponentProps,
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const textFieldStyle = {
    backgroundColor: light.palette.theme_white.main,
    borderRadius: 20,
    // margin: "3% 0",
    color: light.palette.theme_black.main,
}

const CustomInput = withStyles((theme: Theme) =>
        createStyles({
            root: {
                'label + &': {
                    // marginTop: theme.spacing(3),
                },
            },
            input: {
                borderRadius: 20,
                position: 'relative',
                backgroundColor: theme.palette.theme_white.main,
                color: theme.palette.theme_black.main,
                // border: '1px solid #ced4da',
                fontSize: 16,
                padding: '10px 26px 10px 12px',
                // transition: theme.transitions.create(['border-color', 'box-shadow']),
                // Use the system font instead of the default Roboto font.
                // fontFamily: [
                //     '-apple-system',
                //     'BlinkMacSystemFont',
                //     '"Segoe UI"',
                //     'Roboto',
                //     '"Helvetica Neue"',
                //     'Arial',
                //     'sans-serif',
                //     '"Apple Color Emoji"',
                //     '"Segoe UI Emoji"',
                //     '"Segoe UI Symbol"',
                // ].join(','),
                '&:focus': {
                    borderRadius: 20,
                    backgroundColor: theme.palette.theme_white.main,
                    borderColor: '#80bdff',
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                },
            },
        }),
    )(InputBase);

    // (
    //     <InputBase name={props.name ?? ""} type={props.type ?? "text"} style={textFieldStyle} inputProps={{...props.inputProps, style: {paddingLeft: "1em"}}} value = {props.value ?? ""} onChange = {props.onChange}  id={props.id ?? ""}/>
    // )

export default CustomInput