import { Dimensions, FlatList } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "./filter/FilterBar";
import ListCard from './ListCard';
import TopBarLayout from "@/components/layout/TopBarLayout";

const { height } = Dimensions.get('window');

const ListUi = ({
  listState,
  filterComponent,
  moduleName = "BAST",
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
        // backgroundColor: 'yellow',
        height: height
      }}>
        {
          isRenderFilter ? (
            <>
              {filterComponent}
            </>
          ) : (
            <>
              <FilterBar
                moduleName={moduleName}
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
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    handleCheck={handleCheck}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
              />
            </>
          )
        }
      </View>
    </TopBarLayout>

  );
};

export default ListUi;