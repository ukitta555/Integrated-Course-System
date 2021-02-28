import React, {useState} from "react"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';

const DeletableTextField = (props: { id: string  }) => {
    const [isVisible, setIsVisible] = useState(true);
    if (isVisible) return (
        <Grid item id={props.id}>
            <TextField variant="outlined" />
            <Button startIcon={<CloseIcon/>} onClick={() => setIsVisible(false)}/>
        </Grid>
    )
    else return null
}


export default DeletableTextField