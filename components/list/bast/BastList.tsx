import React, { useEffect, useState } from 'react';
import { getBastList } from '@/fetch/bast';
import { useGetUserData } from '@/hooks/useGetUserData';
import BastListUi from './BastListUi';
import { retriveAccessToken } from '@/fetch/auth';

const BastList: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageIndex, setPageIndex] = React.useState(1);

  const { userData } = useGetUserData();
  // console.log(userData, "userData")

  const handleLoadMore = () => {
    console.log("handleLoadMore")
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  }
  // (async () => {
  //   const cred = await retriveAccessToken()
  //   console.log('================================================')
  //   console.log(cred, 'credential')
  // })()

  useEffect(() => {
    getBastList({ setData, pageIndex, pageSize })
  }, [])

  return (
    <BastListUi
      data={data}
      userData={userData}
      handleLoadMore={handleLoadMore}
      isLoading={isLoading}
    />
  )
}


export default BastList;
