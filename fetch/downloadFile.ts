import api from "./axios";

export const downLoadPdfExcelBase64 = async ({id, filename, module}: any) => {
  try {
    const params = new URLSearchParams();
    params.append('id', id);
    params.append('file', filename);

    const response = await api.get(`${module}/read-file?${params.toString()}`);
    // console.log(response.data?.data, "response file: ", filename);
    // if (response.data?.data) return response.data?.data
    // else return {response}
    return response.data?.data
  } catch (error) {
    console.error(error, "error file: ", filename);
    // return {
    //   catch_error: error
    // }
  }
}