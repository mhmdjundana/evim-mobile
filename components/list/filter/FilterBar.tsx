import React, { useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function FilterBar({ 
  moduleName, 
  data, 
  rowSelection, 
  setRowSelection, 
  setIsRenderFilter,
}: any) {
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const handleSelectAll = () => {
    const newSelection = isSelectedAll ? [] : data.filter((item: any) => item.action?.is_approve || item.action?.is_reject).map((item: any) => item.id);
    setRowSelection(newSelection);
    setIsSelectedAll(!isSelectedAll);
  };

  // const selectedCount = isSelectedAll ? data?.filter((item: any) => item.action?.is_approve || item.action?.is_reject)?.length : rowSelection?.length;
  const selectedCount = rowSelection?.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSelectAll}
        style={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <Text>{isSelectedAll ? "Unselect All" : "Select All"}</Text>
      </TouchableOpacity>

      <Text
        style={{ flex: 1, textAlign: 'center' }}
      >
        {selectedCount} Item{selectedCount !== 1 ? 's' : ''} Selected
      </Text>

      <TouchableOpacity
        onPress={() => {
          setIsRenderFilter(true)
          console.log("setIsRenderFilter")
          // router.push({ pathname: `/filter`, params: { module: 'bast' } })
        }}
        style={[styles.searchButton, { flex: 1, justifyContent: 'flex-end' }]}
      >
        <FontAwesome name="search" size={20} color="gray" />
        {/* <Text>{moduleName}</Text> */}
        <Text>Search</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});