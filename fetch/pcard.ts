import { relogin } from "./auth";
import api from "./axios"

export const getPcardList = async ({ 
  setData, 
  pageIndex, 
  pageSize,
  setIsLoading, 
  columnFilters = [],
}: any) => {
  console.log("getPcardList start")
  setIsLoading(true)
  let count: any = 1
  const getData = async () => {
    try {
      const response = await api.post("pcard/data-list", {
        columnFilters,
        "sorting": [],
        "pagination": { pageIndex, pageSize },
        "all_department": false
      })
      return response
    } catch (error) {
      console.error("Error fetching pcard list:", error)
      if (count > 0) {
        await relogin()
        count -= 1
        getData()
      }
    } finally {
      setIsLoading(false)
    }
  }
  console.log("getPcardList end")
  return await getData()
}

export const getPcardById = async ({ id, setData, company = "STM" }: any) => {
  const ids = id || 367
  try {
    const params = new URLSearchParams();
    params.append('company', `${company}`);
    const response = await api.get(`pcard/show-list/${ids}` + "?" + params.toString());

    console.log(response.data.data, "data pcard by id")
    setData(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}