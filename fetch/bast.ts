import { relogin } from "./auth";
import api from "./axios"

export const getBastList = async ({ setData, pageIndex, pageSize, setIsLoading }: any) => {
  console.log("getBastList start")
  let count: any = 1
  const getData = async () => {
    try {
      setIsLoading(true)
      const response = await api.post("bast/data-list", {
        "columnFilters": [{ "id": "company", "value": "STM" }],
        "sorting": [],
        "pagination": { pageIndex, pageSize },
        "all_department": false
      })
      // console.log("bast list response status", response.status)
      // console.log("response", response.config)
      // setData(response.data?.data?.data)
      // console.log("response", response)
      return response
    } catch (error) {
      // console.error("error", error?.status)
      // console.error("error", error?.message)
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
  console.log("getBastList end")
  return await getData()
}

export const getBastById = async ({ id, setData, isGetDepartmentData, isGetUomData, isGetWbsData, isGetGlData, isGetCostCenterData, company = "STM" }: any) => {
  const ids = id || 367
  try {
    const params = new URLSearchParams();
    params.append('company', `${company}`);
    params.append('departmentData', `${isGetDepartmentData ? "true" : "false"}`);
    params.append('uomData', `${isGetUomData ? "true" : "false"}`);
    params.append('wbsData', `${isGetWbsData ? "true" : "false"}`);
    params.append('costCenterData', `${isGetCostCenterData ? "true" : "false"}`);
    params.append('glData', `${isGetGlData ? "true" : "false"}`);
    const response = await api.get(`bast/show-list/${ids}` + "?" + params.toString());

    // console.log(response.data.data, "data")
    setData(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}