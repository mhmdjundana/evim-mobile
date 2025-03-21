import { relogin } from "./auth";
import api from "./axios"

export const getSpecialPaymentList = async ({ 
  pageIndex, 
  pageSize,
  setIsLoading, 
  columnFilters = [],
}: any) => {
  console.log("getSpecialPaymentList start")
  setIsLoading(true)
  let count: any = 1
  const getData = async () => {
    try {
      const response = await api.post("special-payment/data-list", {
        columnFilters,
        "sorting": [],
        "pagination": { pageIndex, pageSize },
        "all_department": false
      })
      return response
    } catch (error) {
      console.error("Error fetching bast list:", error)
      if (count > 0) {
        await relogin()
        count -= 1
        getData()
      }
    } finally {
      setIsLoading(false)
    }
  }
  console.log("getSpecialPaymentList end")
  return await getData()
}

export const getSpecialPaymentById = async ({ id, setData, company = "STM" }: any) => {
  const ids = id || 367
  try {
    const params = new URLSearchParams();
    params.append('company', `${company}`);
    const response = await api.get(`special-payment/show-list/${ids}` + "?" + params.toString());

    console.log(response.data.data, "data special-payment by id")
    setData(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}