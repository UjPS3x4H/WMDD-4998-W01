import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Item = ({ type, item }) => {
  const navigation = useNavigation();

  //console.log("Type:", type);

  const handleSeeMorePress = () => {
    console.log(item.id);

    console.log("Nav to " + type);
    let targetType = type;
    if (type === "movie") {
      navigation.navigate("Detail", { ID: item.id, type: "movie" });
    } else if (type === "tv") {
      navigation.navigate("Detail", { ID: item.id, type: "tv" });
    } else if (type === "person") {
      navigation.navigate("Detail", { ID: item.id, type: "person" });
    }

    // navigation.navigate("MovieDetailStack");
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w200/${item.poster_path}`,
          }}
          style={styles.posterImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>
            {type === "movie" ? item.original_title : item.original_name}
          </Text>
          <Text style={styles.itemInfo}>Popularity: {item.popularity}</Text>
          <Text style={styles.itemInfo}>
            Release Date:
            {type === "movie" ? item.release_date : item.first_air_date}
          </Text>
          <TouchableOpacity onPress={handleSeeMorePress}>
            <Button
              title="More Details"
              //Implementation 1
              // onPress={() => onSeeMorePress(item)}
              onPress={handleSeeMorePress}
              buttonStyle={styles.seeMoreButton}
              titleStyle={styles.seeMoreButtonText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  posterImage: {
    width: 100,
    height: 120,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 0,
    paddingTop: 0,
    marginEnd: 0,
    paddingBottom: 0,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemInfo: {
    fontSize: 16,
    marginVertical: 2,
  },
  seeMoreButton: {
    backgroundColor: "#52b4d0",
    marginTop: 0,
    width: 220,
    height: 42,
  },
  seeMoreButtonText: {
    color: "white",
    fontSize: 15,
  },
});

export default Item;
