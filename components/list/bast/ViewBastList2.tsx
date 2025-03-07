import { FlatList } from "react-native";
import React from "react";
import { View } from "react-native";
import FilterBar from "../filter/FilterBar";
import ListCard from './ListCard';

const BastListUi = ({
  data,
  rowSelection,
  setRowSelection,
  handleLoadMore,
  handleCheck,
}: any) => {
  return (
    <>
      <FilterBar moduleName="BAST" data={data} rowSelection={rowSelection} setRowSelection={setRowSelection} />
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
  );
};

export default BastListUi;