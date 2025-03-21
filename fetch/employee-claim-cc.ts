import { relogin } from "./auth";
import api from "./axios"

export const getCcList = async ({ 
  setData, 
  pageIndex, 
  pageSize,
  setIsLoading, 
  columnFilters = [],
}: any) => {
  console.log("getCcList start")
  setIsLoading(true)
  let count: any = 1
  const getData = async () => {
    try {
      const response = await api.post("employee-claim-cc/data-list", {
        columnFilters,
        "sorting": [],
        "pagination": { pageIndex, pageSize },
        "all_department": false
      })
      return response
    } catch (error) {
      console.error("Error fetching cc list:", error)
      if (count > 0) {
        await relogin()
        count -= 1
        getData()
      }
    } finally {
      setIsLoading(false)
    }
  }
  console.log("getCcList end")
  return await getData()
}

export const getCcById = async ({ id, setData, company = "STM" }: any) => {
  const ids = id || 367
  try {
    const params = new URLSearchParams();
    params.append('company', `${company}`);
    const response = await api.get(`employee-claim-cc/show-list/${ids}` + "?" + params.toString());

    console.log(response.data.data, "data employee-claim-cc by id")
    setData(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}