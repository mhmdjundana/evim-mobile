import api from "./axios"

export const approval = async ({ module, data }: any) => {
  try {
    const response = await api.get(`${module}/approval`, data)
    return response.data
  } catch (error) {
    console.error("Error Approval:", error)
  }
}