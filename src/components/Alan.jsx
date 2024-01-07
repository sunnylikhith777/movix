import React, { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  searchMovie,
  selectGenreOrCategory,
} from "../features/currentGenreOrCategory";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils/index";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: "be99f9b27f23166ac674851ccb9f0ae02e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            history.push("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;

            history.push("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();

          history.push("/");
        } else if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
