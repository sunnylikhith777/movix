import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "90%",
    borderRadius: "10px",
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  genreImage: {
    height: "40px",
    filter: theme.palette.mode === "dark" && "invert(1)",
  },
}));
