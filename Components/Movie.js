import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Item from "./Item";

const Movie = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectedApi, setSelectedApi] = useState("upcoming");

  const handleApiChange = (value) => {
    setSelectedApi(value);
  };

  const fetchMovieData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer ",
      },
    };

    let apiUrl = "";

    if (selectedApi === "upcoming") {
      apiUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
    } else if (selectedApi === "nowplaying") {
      apiUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
    } else if (selectedApi === "popular") {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
    } else if (selectedApi === "toprated") {
      apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1s`;
    }

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data.results);
        //console.log(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovieData();
  }, [selectedApi]);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => handleApiChange(value)}
        items={[
          { label: "Upcoming", value: "upcoming" },
          { label: "Now Playing", value: "nowplaying" },
          { label: "Popular", value: "popular" },
          { label: "Top Rated", value: "toprated" },
        ]}
        style={pickerSelectStyles}
        value={selectedApi}
        placeholder={{ label: "", value: null }}
        itemStyle={pickerItemStyle}
      />

      <FlatList
        data={movieData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item type="movie" item={item} />}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    marginVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#b8b4ab",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
  inputAndroid: {
    fontSize: 16,
    marginVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#b8b4ab",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
  },
  iconContainer: {
    top: "auto",
    right: 12,
    bottom: "auto",
  },
});

const pickerItemStyle = {
  inputIOS: {
    color: "black",
    backgroundColor: "white",
  },
  inputAndroid: {
    color: "black",
    backgroundColor: "white",
  },
  placeholderColor: "black",
  iconContainer: {
    top: 20,
    right: 12,
  },

  inputIOSContainer: {
    backgroundColor: "green",
  },
  inputAndroidContainer: {
    backgroundColor: "green",
  },
  placeholder: {
    color: "white",
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  posterImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  movieInfo: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default Movie;
