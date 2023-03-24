import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";

import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";



import styles from "./nearbyjobs.style";

const Nearbyjobs = () => {
  const router = useRouter();
  const {data, isLoading, errors} = useFetch('search', {query:'React Developer', num_pages:1});
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading?(<ActivityIndicator/>):errors?(<Text>Something went wrong</Text>):(
          data?.map((job)=>(
            <NearbyJobCard
            job={job}
            key={`nearby-job-${job.job_id}`}
            handleNavigation={()=>router.push(`/job-detail/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
