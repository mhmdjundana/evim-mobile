import { useEffect, useRef, useState } from 'react';

const useListData = ({ pageSize, getList }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const lastPage = useRef(0);
  const [rowSelection, setRowSelection] = useState<any[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res: any = await getList({ setData, pageIndex, pageSize, setIsLoading });
      if (res?.data?.data?.data?.length > 0) {
        setData(prev => (pageIndex === 0 ? res.data.data.data : [...prev, ...res.data.data.data]));
        lastPage.current = res.data.data.last_page;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (pageIndex + 1 <= lastPage.current) {
      setPageIndex(prev => prev + 1);
    }
  };

  const handleCheck = (id: any) => {
    const newSelection = rowSelection.includes(id)
      ? rowSelection.filter((id: any) => id !== id)
      : [...rowSelection, id];
    setRowSelection(newSelection);
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex]);

  return {
    data,
    isLoading,
    handleLoadMore,
    rowSelection,
    setRowSelection,
    handleCheck
  };
};

export default useListData;