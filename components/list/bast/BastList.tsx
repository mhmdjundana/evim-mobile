import React, { useState } from 'react';
import { useCompanyMapping, useGetUserData } from '@/hooks/useGetUserData';
import BastListUi from './BastListUi';
import useListData from '@/hooks/useListData';
import { getBastList } from '@/fetch/bast';

const filterInputBast = [
  {
    label: "Vendor Name",
    placeholder: "Vendor Name",
    name: "suplier_name",
    id: "suplier_name",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "BAST No.",
    placeholder: "BAST No.",
    name: "bast_no",
    id: "bast_no",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "PO No.",
    placeholder: "PO No.",
    name: "po_no",
    id: "po_no",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "DPP",
    placeholder: "DPP",
    name: "grand_total",
    id: "grand_total",
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

const BastList: React.FC = () => {
  const { userData } = useGetUserData();
  // console.log(userData?.data?.mapping, 'userdata mapping')
  const listState = useListData({
    pageSize: 10,
    getList: getBastList,
    filterInput: filterInputBast,
    module: 'bast',
  });

  return (
    <BastListUi
      userData={userData}
      listState={listState}
    />
  );
};

export default BastList;