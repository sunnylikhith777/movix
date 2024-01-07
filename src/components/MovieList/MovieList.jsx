import React from "react";
import { Grid } from "@mui/material";

import useStyles from "./styles";
import { Movie } from "..";

const MovieList = ({ movies, numberOfResults, shiftOne }) => {
  const classes = useStyles();
  const startFrom = shiftOne ? 1 : 0;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(startFrom, numberOfResults).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
