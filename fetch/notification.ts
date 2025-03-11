import { getCurrentCompanyKeychain } from "./auth"
import api from "./axios"

export const menuNotification = async () => {
  try {
    const c = await getCurrentCompanyKeychain()
    const company = c.company_initial
    const columnFilters = [
      {
        "id": "company",
        "value": company
      }
    ]
    const response = await api.post('notification/all-module', {
      columnFilters
    })
    return response
  } catch (error) {
    console.error("Error fetching menu notification:", error)
  }
}