import React, { useState } from 'react';
import FilterPageUi from './FilterPageUi';

const FilterBast = ({
  listState = {},
  setIsRenderFilter,
  setApplyFilter,
  statusOptions
}: any) => {

  return (
    <FilterPageUi
      listState={listState}
      setIsRenderFilter={setIsRenderFilter}
      setApplyFilter={setApplyFilter}
      statusOptions={statusOptions}
    />
  );
};

export default FilterBast;