import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  heading: {
    textAlign: "center",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    margin: theme.spacing(2),
    marginTop: 0,
  },
  textContainer: {
    flex: 1,
  },
}));
