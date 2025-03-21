import { Dimensions, FlatList, RefreshControl } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import TopBarLayout from "@/components/layout/TopBarLayout";
import FilterBast from "../filter/FilterBast";
import ListCard from "./ListCard";
import { EmptyList } from "../EmptyList";
import { router } from "expo-router";

const { height } = Dimensions.get('window');
const statusOptions = [ // Define your status options
  { label: 'All', value: '' },
  {
    label: "Validate Invoice",
    value: "Validate Invoice",
  },
  {
    label: "Validate Tax",
    value: "Validate Tax",
  },
  {
    label: "Finance Approve",
    value: "Finance Approve",
  },
  {
    label: "Create MIRO",
    value: "Create MIRO",
  },
  {
    label: "Release",
    value: "Release",
  },
  {
    label: "Payment Advice",
    value: "Payment Advice",
  },
  {
    label: "Paid",
    value: "Paid",
  },
  { label: "Completed", value: "Completed" },
  { label: "Rejected", value: "Rejected" },
  { label: "Rejected > 30 days", value: "Rejected > 30 days" },
  // Add more status options as needed
]

const ViewList = ({
  listState,
  // filterState,
  // setFilterState,

}: any) => {
  const {
    data,
    isLoading,
    handleLoadMore,
    handleCheck,
    rowSelection,
    setRowSelection,
    setApplyFilter,
    isRenderFilter,
    setIsRenderFilter,
  } = listState;
  return (
    <TopBarLayout>
      <View style={{
        flex: 1,
        height: height,
        margin: 0,
      }}>
        {
          isRenderFilter ? (
            <>
              <FilterBast
                listState={listState}
                setIsRenderFilter={setIsRenderFilter}
                setApplyFilter={setApplyFilter}
                statusOptions={statusOptions}
              />
            </>
          ) : (
            <>
              <FilterBar
                data={data}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                setIsRenderFilter={setIsRenderFilter}
                statusOptions={statusOptions}
              />
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ListCard
                    key={item.id}
                    data={item}
                    listData={data}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    handleCheck={handleCheck}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<EmptyList />}
                style={{ paddingHorizontal: 10 }}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => {
                      // router.replace('/employee-claim-cc')
                    }}
                  />
                }
                // ListFooterComponent={isLoading ? <View style={{ height: 100 }} /> : null}

              />
            </>
          )
        }
      </View>
    </TopBarLayout>

  );
};

export default ViewList;