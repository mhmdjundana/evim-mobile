import { useEffect, useRef, useState } from 'react';
import { useCompanyMapping } from './useGetUserData';
import * as Keychain from "react-native-keychain";

const useListData = ({
  pageSize,
  getList,
  filterInput = [],
  module = ''
}: any) => {
  const {
    currentCompany,
  } = useCompanyMapping();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState<any>(0);
  const lastPage = useRef(0);
  const [rowSelection, setRowSelection] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([])
  const defaultColumnFilters = {
    "id": "company",
    "value": currentCompany?.company_initial ? currentCompany?.company_initial : "STM"
  }
  const [applyFilter, setApplyFilter] = useState(0)
  const [isRenderFilter, setIsRenderFilter] = useState(false);
  // console.log("data", data)
  // console.log("columnFilters", columnFilters)
  // console.log("pageIndex", pageIndex)
  // console.log("lastPage", lastPage.current)
  // console.log("data count", data?.length)

  const fetchData = async () => {
    if (pageIndex === null) {
      setPageIndex(0)
      return []
    }
    if (columnFilters?.length === 0) {
      return []
    }
    setIsLoading(true);
    const cf = [
      ...columnFilters?.map((i: any) => ({ id: i.id, value: i.value })),
      defaultColumnFilters
    ]
    try {
      const res: any = await getList({
        // setData,
        pageIndex: pageIndex ?? 0,
        pageSize,
        setIsLoading,
        columnFilters: cf
      });
      console.log(res?.data?.data, "res")
      if (res?.data?.data?.data?.length > 0) {
        setData(prev => {
          if (pageIndex === 0) {
            return res.data.data.data
          }

          return [...prev, ...res.data.data.data]
        })
        lastPage.current = res.data.data.last_page;
      } else if (res?.data?.data?.data?.length === 0 && res?.data?.data?.current_page === 1) {
        // return []
        setData([])
        lastPage.current = res?.data?.data?.last_page;
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
      ? rowSelection.filter((i: any) => i !== id)
      : [...rowSelection, id];
    setRowSelection(newSelection);
  };

  useEffect(() => {
    retrieveFilterKeychain(module)
      .then((filter) => {
        if (filter?.length > 0) {
          setColumnFilters(filter);
          setPageIndex(null)
        } else {
          setColumnFilters(filterInput);
          setPageIndex(null)
        }
      })
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageIndex]);

  useEffect(() => {
    if (applyFilter === 0) return
    saveFilterKeychain(columnFilters, module)
      .then((status: boolean) => {
        if (status) {
          // console.log("save filter success")
          setPageIndex(null)
        }
      })
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
    setApplyFilter,
    isRenderFilter,
    setIsRenderFilter,
  };
};

const saveFilterKeychain = async (filter: any, module: string) => {
  try {
    await Keychain.setGenericPassword("filter", JSON.stringify(filter), {
      service: `${module}_filter`,
    });
    return true;
  } catch (error) {
    console.error(`Error saving filter for ${module}:`, error);
    return false;
  }
};

const retrieveFilterKeychain = async (module: string) => {
  try {
    const filter: any = await Keychain.getGenericPassword({
      service: `${module}_filter`,
    });
    return filter?.password ? JSON.parse(filter.password) : null;
  } catch (error) {
    console.error(`Error retrieving filter for ${module}:`, error);
    return null;
  }
};

export default useListData;