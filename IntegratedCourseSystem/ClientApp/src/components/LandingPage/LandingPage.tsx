import React from "react";
import {Box, Container, Grid, ThemeProvider, Typography} from "@material-ui/core";
import BoxWithImageBG from "../BoxWithImageBG/BoxWithImageBG";
import light from "../../themes/light";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const contentItemBoxStyle = {
    borderRadius: 47,
    padding: "2% 4.5%",
}
const imageWrapperStyle = {
    marginLeft: "12.5%",
}

const imageBoxStyle = {
    borderRadius: 132,
    boxSizing: "border-box" as "border-box",
}
const registrationButtonBoxStyle = {
    borderRadius: 21,
}
const registrationButtonStyle = {
    width: "100%",
    borderRadius: 21,
}

const LandingPage = () => (
    <ThemeProvider theme={light}>
        <Container style={{marginBottom: "36px"}}>
            <Grid container direction="column" spacing={3}>
                <Grid container item xs style={{paddingLeft: "72px",}}>
                    <Grid container item xs direction="column" style={{marginTop: "72px",}}>
                        <Grid item xs>
                            <Box color="theme_black.main">
                                <Typography variant="h3">Безкоштовний інструмент для інтегрованих курсів</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <Box color="theme_grey.main">
                                <Typography variant="h5" component="p">
                                    Все, що вам потрібно для того, щоб зробити роботу в групі цікавою та веселою як для вчителів, так і для учнів!
                                </Typography>
                                <Typography variant="h5" component="p">
                                    Автоматичне формування груп, швидке додавання завдань, інтуітивний інтерфейс - все  для зручної роботи!
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <BoxWithImageBG bgimage="smiling_girl.png"/>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Box bgcolor="theme_green.dark" style={contentItemBoxStyle}>
                        <Grid container direction="column" item xs>
                            <Grid item xs>
                                <Box color="theme_white.main">
                                    <Typography variant="h4" align="center">Фокусуйтесь на тому, що дійсно важливо</Typography>
                                </Box>
                            </Grid>
                            <Grid container item xs>
                                <Grid container direction="column" item xs={9}>
                                    <Grid item xs>
                                        <Box color="theme_white.main" fontStyle="italic">
                                            <Typography variant="h5" component="p" style={{marginTop: "7%",}}>
                                                “Мені дуже сподобалося працювати з системою T-Collab! Система розподілу поставила мене у команду  з людьми,які розідляють мої інтереси, і
                                            </Typography>
                                            <Typography variant="h5" component="p" style={{marginBottom: "14%",}}>
                                                я знайшов купу нових друзів! Також хочу відмітити, що працювати з системою було дуже просто: я не пропустив жодного дедлайну!”
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Container maxWidth="xs">
                                            <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonBoxStyle}>
                                                <Link to = '/register' style={{color: "inherit"}}>
                                                    <Button color="inherit" style={registrationButtonStyle}>
                                                        <Typography>Реєстрація</Typography>
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Container>
                                    </Grid>
                                </Grid>
                                <Grid container direction="column" alignItems="stretch" item xs>
                                    <Grid item xs={9} style={imageWrapperStyle}>
                                        <BoxWithImageBG bgimage="maestro.png" style={imageBoxStyle}/>
                                    </Grid>
                                    <Grid item xs>
                                        <Box color="theme_white.main" fontStyle="italic">
                                            <Typography variant="h5" component="p" align="center">
                                                Едуард А.,
                                            </Typography>
                                            <Typography variant="h5" component="p" align="center">
                                                студент 4 курсу
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*<Grid container item xs>*/}
                            {/*    <Grid item xs={9}>*/}
                            {/*        <Box color="theme_white.main">*/}
                            {/*            <Typography variant="h5" component="p" style={{marginTop: "7%",}}>*/}
                            {/*                “Мені дуже сподобалося працювати з системою T-Collab! Система розподілу поставила мене у команду  з людьми,які розідляють мої інтереси, і*/}
                            {/*            </Typography>*/}
                            {/*            <Typography variant="h5" component="p" style={{marginBottom: "7%",}}>*/}
                            {/*                я знайшов купу нових друзів! Також хочу відмітити, що працювати з системою було дуже просто: я не пропустив жодного дедлайну!”*/}
                            {/*            </Typography>*/}
                            {/*        </Box>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid container direction="column" item xs>*/}
                            {/*        <Grid item xs>*/}
                            {/*            <BoxWithImageBG bgimage="maestro.png" style={imageBoxStyle}/>*/}
                            {/*        </Grid>*/}
                            {/*        <Grid item xs>*/}
                            {/*            <Box color="theme_white.main">*/}
                            {/*                <Typography variant="h5" component="p" align="center">*/}
                            {/*                    Едуард А.,*/}
                            {/*                    студент 4 курсу*/}
                            {/*                </Typography>*/}
                            {/*            </Box>*/}
                            {/*        </Grid>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs>*/}
                            {/*    <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonBoxStyle}>*/}
                            {/*        <Button color="inherit" style={registrationButtonStyle}>*/}
                            {/*            <Typography>Реєстрація</Typography>*/}
                            {/*        </Button>*/}
                            {/*    </Box>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box bgcolor="theme_green.main" style={contentItemBoxStyle}>
                        <Grid container direction="column" item xs>
                            <Grid item xs>
                                <Box color="theme_black.main">
                                    <Typography variant="h4" align="center">Автоматизуйте робочий процесс</Typography>
                                </Box>
                            </Grid>
                            <Grid container item xs>
                                <Grid container direction="column" item xs={7}>
                                    <Grid item xs>
                                        <Box color="theme_black.main" fontStyle="italic">
                                            <Typography variant="h5" component="p" style={{margin: "7% 0 14%",}}>
                                                “Алгоритм групування - неймовірний. Якщо щось йде не так або студент хоче бути у іншій групі - я можу це вручну виправити. Додавання нових завдань та їх оцінювання зроблені на ура - інтерфейс дуже зрозумілий. Я вже порекомендував цю систему своїм колегам.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Container maxWidth="xs">
                                            <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonBoxStyle}>
                                                <Link to = '/register' style={{color: "inherit"}}>
                                                    <Button color="inherit" style={registrationButtonStyle}>
                                                        <Typography>Реєстрація</Typography>
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Container>
                                    </Grid>
                                </Grid>
                                <Grid container direction="column" alignItems="stretch" item xs>
                                    <Grid item xs={9} style={imageWrapperStyle}>
                                        <BoxWithImageBG bgimage="yaroslav.png" style={{...imageBoxStyle, ...{margin: "0 20%"}}}/>
                                    </Grid>
                                    <Grid item xs>
                                        <Box color="theme_black.main" fontStyle="italic">
                                            <Typography variant="h5" component="p" align="center">
                                                Ярослав П., доц. кафедри
                                            </Typography>
                                            <Typography variant="h5" component="p" align="center">
                                                ТТП факультету кібернетики
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*<Grid container item xs>*/}
                            {/*    <Grid item xs>*/}
                            {/*        <Box color="theme_black.main" fontStyle="italic">*/}
                            {/*            <Typography>*/}
                            {/*                “Алгоритм групування - неймовірний. Якщо щось йде не так або студент хоче бути у іншій групі - я можу це вручну виправити. Додавання нових завдань та їх оцінювання зроблені на ура - інтерфейс дуже зрозумілий. Я вже порекомендував цю систему своїм колегам.*/}
                            {/*            </Typography>*/}
                            {/*        </Box>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid container direction="column" item xs>*/}
                            {/*        <Grid item xs>*/}
                            {/*            <BoxWithImageBG bgimage="yaroslav.png" style={imageBoxStyle}/>*/}
                            {/*        </Grid>*/}
                            {/*        <Grid item xs>*/}
                            {/*            <Box color="theme_black.main" fontStyle="italic">*/}
                            {/*                <Typography>*/}
                            {/*                    Ярослав П., доц. кафедри*/}
                            {/*                    ТТП факультету кібернетики*/}
                            {/*                </Typography>*/}
                            {/*            </Box>*/}
                            {/*        </Grid>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs>*/}
                            {/*    <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonBoxStyle}>*/}
                            {/*        <Button color="inherit" style={registrationButtonStyle}>*/}
                            {/*            <Typography>Реєстрація</Typography>*/}
                            {/*        </Button>*/}
                            {/*    </Box>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Box>
                </Grid>
                <Grid container alignItems="center" justify="center" spacing={4} item xs style={{padding: "16px 16px 16px 72px"}}>
                    <Grid item xs={7}>
                        <Box color="theme_black.main">
                            <Typography variant="h3">Групові проекти - це круто. Ми зробили їх ще крутіше.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box bgcolor="theme_grey.main" color="theme_white.main" style={registrationButtonBoxStyle}>
                            <Link to = '/register' style={{color: "inherit"}}>
                                <Button color="inherit" style={registrationButtonStyle}>
                                    <Typography>Спробувати</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box bgcolor="theme_green.main" color="theme_black.main" style={registrationButtonBoxStyle}>
                            <Link to = '/register' style={{color: "inherit"}}>
                                <Button color="inherit" style={registrationButtonStyle}>
                                    <Typography>Дізнатися більше</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>
)

export default LandingPage