import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    margin: "30px 2px",
  },
  pages: {
    margin: "0 10px !important",
    color: theme.palette.text.primary,
  },
}));
