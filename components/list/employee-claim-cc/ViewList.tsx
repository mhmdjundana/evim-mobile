import { Dimensions, FlatList, RefreshControl } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import TopBarLayout from "@/components/layout/TopBarLayout";
import FilterBast from "../filter/FilterBast";
import ListCard from "./ListCard";
import { EmptyList } from "../EmptyList";
import { RelativePathString, router } from "expo-router";

const { height } = Dimensions.get('window');
const statusOptions = [
  { label: 'All', value: '' },
  {
    label: "1st Approve",
    value: "1st Approve",
  },
  {
    label: "Validate Settlement",
    value: "Validate Settlement",
  },
  { label: "Rejected", value: "Rejected" },
  { label: "Completed", value: "Completed" },
]

const ViewList = ({
  listState,
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
    module,
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
                      router.replace(`/${module}` as RelativePathString)
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