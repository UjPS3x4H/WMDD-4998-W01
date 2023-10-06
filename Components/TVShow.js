import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Item from "./Item";
import { API_KEY } from "@env";

function TVShow() {
  const [tvData, setTVData] = useState([]);
  const [selectedApi, setSelectedApi] = useState("airingtoday");

  const handleApiChange = (value) => {
    setSelectedApi(value);
  };

  const fetchTVData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    let apiUrl = "";

    if (selectedApi === "airingtoday") {
      apiUrl = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`;
    } else if (selectedApi === "ontheair") {
      apiUrl = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1`;
    } else if (selectedApi === "popular") {
      apiUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;
    } else if (selectedApi === "toprated") {
      apiUrl = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`;
    }

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setTVData(data.results);
        //console.log(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTVData();
  }, [selectedApi]);

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => handleApiChange(value)}
        items={[
          { label: "Airing Today", value: "airingtoday" },
          { label: "On the Air", value: "ontheair" },
          { label: "Popular", value: "popular" },
          { label: "Top Rated", value: "toprated" },
        ]}
        style={pickerSelectStyles}
        value={selectedApi}
        placeholder={{ label: "", value: null }}
      />

      <FlatList
        data={tvData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item type="tv" item={item} />}
      />
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default TVShow;
