import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";

import useFetch from "../../hooks/useFetch";

const tabs = ['About','Qualifications','Responsibilities'];


const jobDetail = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0])

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch, setRefreshing]);

  const displayTabContent =  ()=>{
    switch(activeTab){
      case "About":
        return <JobAbout info={data[0].job_description ?? "No data provided"} />
      case "Qualifications":
        return <Specifics title="Qualification" points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />
      default:
        return <JobAbout info={data[0].job_description ?? "No data provided"} />
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              handlePress={() => router.back()}
              dimension="60%"
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitleAlign: "center",
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          { isLoading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding:SIZES.medium, paddingBottom:100 }}>
                <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
                />

                <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                />
                {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"} />
      </>
    </SafeAreaView>
  );
};

export default jobDetail;
