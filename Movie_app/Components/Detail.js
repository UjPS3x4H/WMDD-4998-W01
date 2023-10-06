import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const Detail = (props) => {
  const route = useRoute();
  const { ID, type } = route.params;
  //console.log("Got type as " + type);
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (type === "movie") {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2VlZjM3ZDU0ZWNjMmZjMjIxMWE3OGUzODFiYzhlOSIsInN1YiI6IjYzOGFlMTlhOGE4NGQyMDBjOWM5MzkyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7wN7YcJsI7CH6c0w--UxzOFXEPEahFvWB7W1L9B59Q4", // Replace with your API key
        },
      };

      fetch(`https://api.themoviedb.org/3/movie/${ID}?language=en-US`, options)
        .then((response) => response.json())
        .then((data) => setItemDetails(data))
        .catch((error) => console.error(error));
    } else if (type === "tv") {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2VlZjM3ZDU0ZWNjMmZjMjIxMWE3OGUzODFiYzhlOSIsInN1YiI6IjYzOGFlMTlhOGE4NGQyMDBjOWM5MzkyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7wN7YcJsI7CH6c0w--UxzOFXEPEahFvWB7W1L9B59Q4", // Replace with your API key
        },
      };
      fetch(`https://api.themoviedb.org/3/tv/${ID}?language=en-US`, options)
        .then((response) => response.json())
        .then((data) => {
          setItemDetails(data);
          //console.log("Image URL:", `https://image.tmdb.org/t/p/w200${data.poster_path}`);
        })
        .catch((error) => console.error(error));
    }
  }, [ID, type]);

  useEffect(() => {
    if (itemDetails) {
      const screenTitle =
        type === "movie"
          ? itemDetails.original_title
          : itemDetails.original_name;

      props.navigation.setOptions({
        title: screenTitle,
        headerBackTitle: "Back to List",
      });
    }
  }, [itemDetails, type, props.navigation]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        {type === "movie" ? "Movie Details" : "TV Show Details"}
      </Text> */}
      {itemDetails && (
        <View>
          <Text style={styles.title}>
            {type === "movie"
              ? itemDetails.original_title
              : itemDetails.original_name}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${itemDetails.poster_path}`,
              }}
              style={styles.posterImage}
            />
          </View>
          <Text style={styles.overview}>{itemDetails.overview}</Text>
          <View style={styles.emptyLine} />
          <View style={styles.detailsRow}>
            <Text style={styles.popularity}>
              Popularity: {itemDetails.popularity}
            </Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.releaseDate}>
              Release Date:{" "}
              {type === "movie"
                ? itemDetails.release_date
                : itemDetails.first_air_date}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  imageContainer: {
    alignItems: "center",
  },
  posterImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
    marginTop: 40,
    marginBottom: 15,
  },
  overview: {
    fontSize: 15,
    marginVertical: 12,
  },
  emptyLine: {
    height: 20,
  },
  popularity: {
    fontSize: 16,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  popularity: {
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 5,
  },
  releaseDate: {
    fontSize: 14,
  },
});

export default Detail;
