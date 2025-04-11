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
    name: "vendor.vendor_name",
    id: "vendor.vendor_name",
    value: "",
  },
  {
    label: "Doc No.",
    placeholder: "Doc No.",
    name: "referenceNumber",
    id: "referenceNumber",
    value: "",
  },
  {
    label: "Payment Amount",
    placeholder: "Payment Amount",
    name: "payment_amount",
    id: "payment_amount",
    value: "",
  },
  {
    label: "Create Date",
    placeholder: "Create Date",
    name: "created_at",
    id: "created_at",
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
  const module: string = 'special-payment'

  const listState = useListData({
    pageSize: 10,
    getList: getSpecialPaymentList,
    filterInput: filterInputInvoice,
    module,
  });

  return (
    <ListUi
      listState={listState}
    />
  )
}


export default List;
