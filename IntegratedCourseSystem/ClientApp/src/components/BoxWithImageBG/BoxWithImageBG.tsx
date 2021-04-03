import {Box} from "@material-ui/core";
import React, {CSSProperties} from "react";


type BoxWithImageBGProps = {
    bgimage: string,
    bgcolor?: string,
    style?: CSSProperties,

}

const BoxWithImageBG = (props: BoxWithImageBGProps) => {
    const papersIconStyle = {
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(img/${props.bgimage})`,
        borderRadius: "1.2vw",
        backgroundSize: "contain",
        backgroundPosition: "center",
    }
    return (<Box bgcolor={props.bgcolor ?? ""} style={{...papersIconStyle, ...props.style ?? {}}} children={false} />)
}

export default BoxWithImageBG