import { Dimensions, FlatList } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import TopBarLayout from "@/components/layout/TopBarLayout";
import FilterBast from "../filter/FilterBast";
import ListCardInvoice from "./ListCardInvoice";

const { height } = Dimensions.get('window');

const ViewInvoiceList = ({
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
        // backgroundColor: 'yellow',
        height: height
      }}>
        {
          isRenderFilter ? (
            <>
              <FilterBast
                listState={listState}
                setIsRenderFilter={setIsRenderFilter}
                setApplyFilter={setApplyFilter}
              />
            </>
          ) : (
            <>
              <FilterBar
                moduleName="BAST"
                data={data}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                setIsRenderFilter={setIsRenderFilter}
              />
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ListCardInvoice
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

export default ViewInvoiceList;