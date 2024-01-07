import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "./styles";

import { useGetListQuery } from "../../services/TMDB";
import { selectUser } from "../../features/auth";
import { RatedCards } from "..";

const Profile = () => {
  const classes = useStyles();
  const { user } = useSelector(selectUser);
  const history = useHistory();

  const { data: favoriteMovies, refetch: refetchFavoriteMovies } =
    useGetListQuery({
      listName: "favorite/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  const { data: watchlistMovies, refetch: refetchWatchlistMovies } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavoriteMovies();
    refetchWatchlistMovies();
  }, []);

  const logOut = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 345, marginBottom: "30px" }}>
        <CardActionArea>
          <h2 className={classes.heading}>
            <pre>My Profile</pre>
          </h2>
          <div className={classes.profileContainer}>
            {user?.avatar?.tmdb?.avatar_path && (
              <img
                style={{ width: 100, height: 100 }}
                src={`https://tmdb.org/t/p/w780${user.avatar.tmdb.avatar_path}`}
                alt="Profile-picture"
                className={classes.image}
              />
            )}
            <div className={classes.textContainer}>
              <CardContent>
                <Typography variant="h6">{user.username}</Typography>
                <Typography variant="body1">ID: {user.id}</Typography>
              </CardContent>
            </div>
          </div>
        </CardActionArea>
        <Box display="flex" justifyContent="center">
          <Button color="inherit" onClick={logOut}>
            logout &nbsp; <ExitToApp />
          </Button>
        </Box>
      </Card>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5" gutterBottom>
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
