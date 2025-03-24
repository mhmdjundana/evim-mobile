import React from 'react';
import ListUi from './ListUi';
import useListData from '@/hooks/useListData';
import { getPcardList } from '@/fetch/pcard';

const filterInput = [
  {
    label: "Employee Name",
    placeholder: "Employee Name",
    name: "employee_name",
    id: "employee_name",
    value: "",
  },
  {
    label: "Document No.",
    placeholder: "Document No.",
    name: "p_card_number",
    id: "p_card_number",
    value: "",
  },
  {
    label: "Company To Pay",
    placeholder: "Company To Pay",
    name: "company_to_pay",
    id: "company_to_pay",
    value: "",
  },
  {
    label: "Status",
    placeholder: "Status",
    name: "status_name",
    id: "status_name",
    value: "",
  }
]


const List: React.FC = () => {
  const module = 'pcard'
  const listState = useListData({
    pageSize: 10,
    getList: getPcardList,
    filterInput: filterInput,
    module,
  });

  return (
    <ListUi
      listState={listState}
    />
  )
}


export default List;
