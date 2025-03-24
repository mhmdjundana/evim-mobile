import React, { useEffect, useState } from 'react';
import ListUi from './ListUi';
import { Text } from 'react-native';
import useListData from '@/hooks/useListData';
import { getCorporateIntegrityList } from '@/fetch/corporate-integrity';

const filterInputInvoice = [
  {
    label: "Vendor Name",
    placeholder: "Vendor Name",
    name: "vendor_name",
    id: "vendor_name",
    value: "",
  },
  {
    label: "Doc No.",
    placeholder: "Doc No.",
    name: "corporate_integrity_number",
    id: "corporate_integrity_number",
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
    label: "Status",
    placeholder: "Status",
    name: "status_name",
    id: "status_name",
    value: "",
  }
]


const List: React.FC = () => {
  const module: string = 'corporate-integrity'

  const listState = useListData({
    pageSize: 10,
    getList: getCorporateIntegrityList,
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
