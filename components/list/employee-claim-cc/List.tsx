import React from 'react';
import { useGetUserData } from '@/hooks/useGetUserData';
import ListUi from './ListUi';
import useListData from '@/hooks/useListData';
import { getCcList } from '@/fetch/employee-claim-cc';

const filterInput = [
  {
    label: "Employee Name",
    placeholder: "Employee Name",
    name: "employee_name",
    id: "employee_name",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "Document No.",
    placeholder: "Document No.",
    name: "employee_claim_number",
    id: "employee_claim_number",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "Company To Pay",
    placeholder: "Company To Pay",
    name: "company_to_pay",
    id: "company_to_pay",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "Status",
    placeholder: "Status",
    name: "status_name",
    id: "status_name",
    value: "",
    style: { marginBottom: 10 },
  }
]


const List: React.FC = () => {
  const { userData } = useGetUserData();
  // console.log(userData, "userData")

  const listState = useListData({
    pageSize: 10,
    getList: getCcList,
    filterInput: filterInput,
    module: 'employee-claim-cc',
  });

  return (
    <ListUi
      listState={listState}
      userData={userData}
    />
  )
}


export default List;
