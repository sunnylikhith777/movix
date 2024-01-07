import React from "react";
import { Button, Typography } from "@mui/material";
import useStyles from "./styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button
        className={classes.buttons}
        variant="contained"
        color="primary"
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Typography className={classes.pages} variant="h4">
        {currentPage}
      </Typography>
      <Button
        className={classes.buttons}
        variant="contained"
        color="primary"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
