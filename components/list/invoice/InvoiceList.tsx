import React, { useEffect, useState } from 'react';
import { getInvoiceList } from '@/fetch/invoice';
import { useGetUserData } from '@/hooks/useGetUserData';
import InvoiceListUi from './invoiceListUi';
import { Text } from 'react-native';

const InvoiceList: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10000);
  const [pageIndex, setPageIndex] = React.useState(0);

  const { userData } = useGetUserData();
  // console.log(userData, "userData")

  const handleLoadMore = () => {
    console.log("handleLoadMore")
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  }

  useEffect(() => {
    getInvoiceList({ setData, pageIndex, pageSize })
  }, [])

  return (
    <>
      <InvoiceListUi
        data={data}
        userData={userData}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
      {/* <Text>Invoice List</Text> */}
    </>
  )
}


export default InvoiceList;
