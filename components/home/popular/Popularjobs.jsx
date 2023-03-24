import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";



import styles from "./popularjobs.style";

const Popularjobs = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch('search', {query:'React Developer', num_pages:1});
  const [selectedJob, setSelectedJob] = useState('')

  const handleCardPress = (item) => {
    router.push(`job-detail/${item.job_id}`)
    setSelectedJob(item.job_id)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading?(<ActivityIndicator/>):error?(<Text>Something went wrong</Text>):(
          <FlatList
          data={data}
          renderItem={({ item }) => (
            <PopularJobCard
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />)}
          keyExtractor={(item) => item?.job_id}
          contentContainerStyle={{ columnGap:SIZES.medium }}
          horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
