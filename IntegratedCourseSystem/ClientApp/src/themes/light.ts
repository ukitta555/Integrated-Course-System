import { createMuiTheme } from '@material-ui/core/styles';

declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
        theme_green: Palette['primary'];
        theme_grey: Palette['primary'];
        theme_white: Palette['primary'];
        theme_yellow: Palette['primary'];
        theme_red: Palette['primary'];
        theme_black: Palette['primary'];
    }
    interface PaletteOptions {
        theme_green: PaletteOptions['primary'];
        theme_grey: PaletteOptions['primary'];
        theme_white: PaletteOptions['primary'];
        theme_yellow: PaletteOptions['primary'];
        theme_red: PaletteOptions['primary'];
        theme_black: PaletteOptions['primary'];
    }
}

const theme = createMuiTheme({
    palette: {
        theme_green: {
            // light: '#0066ff',
            main: "#cae6d8",
            dark: "#a5cacc",
            contrastText: "#606675"
        },
        theme_grey: {
            light: "#E5E5E5",
            main: "#97ACC4",
            contrastText: "#F5F5F5"
        },
        theme_white: {
            light: "#FFFFFF",
            main: "#F5F5F5",
            contrastText: "#606675"
        },
        theme_yellow: {
            main: "#F5ECAB",
        },
        theme_red: {
            main: "#EBA99E",
        },
        theme_black: {
            main: "#606675",
        },
    },
});

export default theme;
