import { Grid } from "@mui/material";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";

export function Layout() {

    return (
        <Grid container sx={{ minHeight: "100vh" }} className="Layout">
            <Grid size={12} border={"1px rgba(141, 135, 135, 0.8) solid"}>
                <Header />
            </Grid>
            <Grid size={{ xs: 12, sm: 3, lg: 2 }} sx={{ height: { xs: "auto", sm: "90vh" } }} border={"1px rgba(141, 135, 135, 0.8) solid"}>
                <Menu />
            </Grid>
            <Grid size={{ xs: 12, sm: 9, lg: 10 }} sx={{ height: { xs: "auto", sm: "90vh" } }} border={"1px rgba(141, 135, 135, 0.8) solid"}>
                <Routing />
            </Grid>
        </Grid>
    );
}
