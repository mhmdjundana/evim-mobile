import { relogin } from "./auth";
import api from "./axios"

export const getCorporateIntegrityList = async ({ 
  setData, 
  pageIndex, 
  pageSize,
  setIsLoading, 
  columnFilters = [],
}: any) => {
  console.log("getCorporateIntegrityList start")
  setIsLoading(true)
  let count: any = 1
  const getData = async () => {
    try {
      const response = await api.post("corporate-integrity/data-list", {
        columnFilters,
        "sorting": [],
        "pagination": { pageIndex, pageSize },
        "all_department": false
      })
      return response
    } catch (error) {
      console.error("Error fetching corporate-integrity list:", error)
      if (count > 0) {
        await relogin()
        count -= 1
        getData()
      }
    } finally {
      setIsLoading(false)
    }
  }
  console.log("getInvoiceList end")
  return await getData()
}

export const getCorporateIntegrityById = async ({ id, setData, company = "STM" }: any) => {
  const ids = id || 367
  try {
    const params = new URLSearchParams();
    params.append('company', `${company}`);
    const response = await api.get(`corporate-integrity/show-list/${ids}` + "?" + params.toString());

    console.log(response.data.data, "data corporate-integrity by id")
    setData(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}