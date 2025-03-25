import { Dimensions, FlatList, RefreshControl } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import ListCard from './ListCard';
import TopBarLayout from "@/components/layout/TopBarLayout";
import FilterBast from "../filter/FilterBast";
import { EmptyList } from "../EmptyList";
import { router } from "expo-router";

const { height } = Dimensions.get('window');
const statusOptions = [ // Define your status options
  { label: 'All', value: 'All' },
  { label: 'Draft', value: 'Draft' },
  { label: "Create SES", value: "Create SES" },
  {
    label: "Approve",
    value: "Approve",
  },
  {
    label: "1st Approve",
    value: "1st Approve",
  },
  {
    label: "Review",
    value: "Review",
  },
  {
    label: "2nd Approve",
    value: "2nd Approve",
  },
  { label: "Completed", value: "Completed" },
  { label: "Rejected", value: "Rejected" },
  { label: "Rejected > 30 days", value: "Rejected > 30 days" },
  // Add more status options as needed
];

const BastListUi = ({
  listState,
  // filterState,
  // setFilterState,

}: any) => {
  const {
    data,
    isLoading,
    handleLoadMore,
    rowSelection,
    setRowSelection,
    handleCheck,
    columnFilters,
    setColumnFilters,
    setApplyFilter,
    isRenderFilter,
    setIsRenderFilter,
  } = listState;
  return (
    <TopBarLayout>
      <View style={{
        flex: 1,
        height: height
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
                      router.replace('/bast')
                    }}
                  />
                }
              />
            </>
          )
        }
      </View>
    </TopBarLayout>

  );
};

export default BastListUi;