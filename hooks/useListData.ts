import { useEffect, useRef, useState } from 'react';
import { useCompanyMapping } from './useGetUserData';
const useListData = ({ pageSize, getList, filterInput = [] }: any) => {
  const {
    currentCompany,
  } = useCompanyMapping();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState<any>(0);
  const lastPage = useRef(0);
  const [rowSelection, setRowSelection] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>(filterInput)
  const defaultColumnFilters = { "id": "company", "value": currentCompany?.company_initial ? currentCompany?.company_initial : "STM" }
  const [applyFilter, setApplyFilter] = useState(0)

  const fetchData = async () => {
    setIsLoading(true);
    const cf = [
      ...columnFilters?.map((i: any) => ({ id: i.id, value: i.value })),
      defaultColumnFilters
    ]
    try {
      const res: any = await getList({
        setData,
        pageIndex: pageIndex ?? 0,
        pageSize,
        setIsLoading,
        columnFilters: cf
      });
      if (res?.data?.data?.data?.length > 0) {
        setData(prev => {
          if (pageIndex === null) {
            setPageIndex(0)
            return res.data.data.data
          }
          if (pageIndex === 0) {
            return res.data.data.data
          }

          return [...prev, ...res.data.data.data]
        })
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
      setPageIndex((prev: any) => prev + 1);
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
  useEffect(() => {
    setPageIndex(null)
  }, [applyFilter]);

  return {
    data,
    isLoading,
    handleLoadMore,
    rowSelection,
    setRowSelection,
    handleCheck,
    columnFilters,
    setColumnFilters,
    defaultColumnFilters,
    setApplyFilter
  };
};

export default useListData;