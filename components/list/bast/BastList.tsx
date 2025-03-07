import React from 'react';
import { useGetUserData } from '@/hooks/useGetUserData';
import BastListUi from './BastListUi';
import useListData from '@/hooks/useListData';
import { getBastList } from '@/fetch/bast';

const BastList: React.FC = () => {
  const { userData } = useGetUserData();
  const {
    data,
    isLoading,
    handleLoadMore,
    rowSelection,
    setRowSelection,
    handleCheck,
  } = useListData({
    pageSize: 10,
    getList: getBastList
  });

  return (
    <BastListUi
      data={data}
      userData={userData}
      handleLoadMore={handleLoadMore}
      isLoading={isLoading}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
      handleCheck={handleCheck}
    />
  );
};

export default BastList;