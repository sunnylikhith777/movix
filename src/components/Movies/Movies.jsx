import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination, FeaturedCard } from "..";

const Movies = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const numberOfResults = lg ? 17 : 19;

  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  // console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignContent="center" mt="20px">
        <Typography variant="h4">
          No movies available with that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return "An error has occured!";

  return (
    <div>
      <FeaturedCard movie={data.results[0]} />
      <MovieList movies={data} numberOfResults={numberOfResults} shiftOne />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </div>
  );
};

export default Movies;
