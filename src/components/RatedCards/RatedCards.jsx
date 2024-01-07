import React from "react";
import { Box, Typography } from "@mui/material";

import { Movie } from "..";

const RatedCards = ({ data, title }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap">
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
