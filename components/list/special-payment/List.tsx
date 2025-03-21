import React, { useEffect, useState } from 'react';
import { useGetUserData } from '@/hooks/useGetUserData';
import ListUi from './ListUi';
import { Text } from 'react-native';
import useListData from '@/hooks/useListData';
import { getSpecialPaymentList } from '@/fetch/special-payment';

const filterInputInvoice = [
  {
    label: "Vendor Name",
    placeholder: "Vendor Name",
    name: "suplier_name",
    id: "suplier_name",
    value: "",
    style: { marginBottom: 10 },
  },
  {
    label: "Invoice No.",
    placeholder: "Invoice No.",
    name: "invoice_number",
    id: "invoice_number",
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


const List: React.FC = () => {
  const { userData } = useGetUserData();
  // console.log(userData, "userData")

  const listState = useListData({
    pageSize: 10,
    getList: getSpecialPaymentList,
    filterInput: filterInputInvoice,
    module: 'special-payment',
  });

  return (
    <ListUi
      listState={listState}
      userData={userData}
    />
  )
}


export default List;
