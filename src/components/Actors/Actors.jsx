import React, { useState } from "react";
import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import { Movie as MovieIcon, ArrowBack } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";

import {
  useGetActorsDetailsQuery,
  useGetActorFilmographyQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import { MovieList, Pagination } from "..";

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movieByActor, isFetching: movieByActorFilmography } =
    useGetActorFilmographyQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color="primary"
        >
          Go back
        </Button>
      </Box>
    );
  }

  // console.log(data);
  // console.log(movieByActor);

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body2" align="justify" paragraph>
            {data?.biography || `No biography yet...`}
          </Typography>
          <Box display="flex" justifyContent="space-around" marginTop="30px">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
              endIcon={<MovieIcon />}
            >
              IMDB
            </Button>
            <Button
              onClick={() => history.goBack()}
              startIcon={<ArrowBack />}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box width="100%" marginTop="3rem">
        <Typography variant="h2" align="center" gutterBottom>
          Filmography
        </Typography>
        {movieByActor ? (
          <MovieList movies={movieByActor} numberOfResults={12} />
        ) : (
          <Box display="flex" justifyContent="center" align="center">
            <Typography variant="title1">
              No movies related to this actor!
            </Typography>
          </Box>
        )}
      </Box>
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={movieByActor?.total_pages}
      />
    </Grid>
  );
};

export default Actors;
