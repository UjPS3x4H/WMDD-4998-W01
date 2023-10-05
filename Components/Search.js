import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Item from "./Item";
import Icon from "react-native-vector-icons/FontAwesome";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("multi");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedSearchType, setSelectedSearchType] = useState(searchType);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSearch = () => {
    const apiKey =
      "";
    const baseUrl = "https://api.themoviedb.org/3";

    if (selectedSearchType === "movie") {
      searchEndpoint = "search/movie";
    } else if (selectedSearchType === "tv") {
      searchEndpoint = "search/tv";
    } else {
      //console.log("Seraching Multi");
      searchEndpoint = "search/multi";
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const apiUrl = `${baseUrl}/${searchEndpoint}?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data.results);
        // console.log("Media Types of Results:");
        // data.results.forEach((result) => {
        //   console.log(result.media_type);
        // });
        setSearchType(selectedSearchType);
        setSearchInitiated(true);
        //console.log(searchType);
        //console.log(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Search Movie/TV Show Name<Text style={{ color: "red" }}>*</Text>
      </Text>
      <View style={styles.centeredContainer}>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Keyword"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <Text style={styles.label}>
        Choose Search Type<Text style={{ color: "red" }}>*</Text>
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedSearchType(value)}
            items={[
              { label: "Multi", value: "multi" },
              { label: "Movie", value: "movie" },
              { label: "TV", value: "tv" },
            ]}
            style={pickerSelectStyles}
            value={selectedSearchType}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon
              name="search"
              size={20}
              color="white"
              style={styles.searchIcon}
            />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.note}>Please select a search type.</Text>
      {searchInitiated ? (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            let itemType;
            if (searchType === "movie") {
              itemType = "movie";
            } else if (searchType === "tv") {
              itemType = "tv";
            } else if (searchType === "multi") {
              itemType = item.media_type === "movie" ? "movie" : "tv";
            }
            return <Item type={itemType} item={item} />;
          }}
          contentContainerStyle={{ paddingBottom: 180 }}
        />
      ) : (
        <Text style={styles.initSearchLabel}>Please initiate a search</Text>
      )}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#b8b4ab",
    borderRadius: 2,
    color: "black",
    paddingRight: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginLeft: 5,
    marginRight: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 18,

    marginBottom: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    backgroundColor: "#e6e6e6",
    borderRadius: 4,
    marginLeft: "5%",
    paddingLeft: 10,
    borderWidth: 1,
    height: 40,
    width: "90%",
  },

  input: {
    fontSize: 16,

    flex: 1,
    padding: 0,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: "row",
    width: "90%",
    marginLeft: "3%",
    marginBottom: 5,
  },
  pickerContainer: {
    flex: 0.6,
    height: 40,
    marginRight: 10,
  },
  buttonContainer: {
    flex: 0.4,
  },
  searchButton: {
    backgroundColor: "#52b4d0",
    height: 40,
    width: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginLeft: 20,
    paddingBottom: 0,
    paddingTop: 0,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  searchButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  searchIcon: {
    marginRight: 10,
  },
  note: {
    fontSize: 10,
    marginTop: 0,
    marginBottom: 30,
    marginLeft: "5%",
  },
  initSearchLabel: {
    fontSize: 26,
    textAlign: "center",
    marginTop: "30%",
    paddingBottom: "80%",
  },
});

export default Search;
