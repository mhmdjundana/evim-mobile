import React, { useState } from 'react';
import FilterPage from './FilterPage';

const statusOptions = [ // Define your status options
  { label: 'All', value: '' },
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

const FilterBast = ({ listState = {}, setIsRenderFilter, setApplyFilter }: any) => {
  const { columnFilters, setColumnFilters } = listState
  console.log(columnFilters, 'columnFilters')
  const [status, setStatus] = useState('');

  return (
    <FilterPage
      listState={listState}
      setIsRenderFilter={setIsRenderFilter}
      setApplyFilter={setApplyFilter}
      statusOptions={statusOptions}
    />
  );
};

export default FilterBast;