import {
  getCurrentCompanyKeychain,
  retrieveUserData,
  setCurrentCompanyKeychain
} from "@/fetch/auth";
import { useEffect, useState } from "react";

export const useGetUserData = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // getDataById()
    retrieveUserData().then((res: any) => {
      // console.log(res?.modules, "res user data")
      setUserData(res)
    })
  }, [])

  return { userData, setUserData }
}

export const useCompanyMapping = () => {
  /* 
  [{"company_code": "1492", "company_initial": "STM", "is_default": "1"}]
  */
  const [currentCompany, setCurrentCompany] = useState<any>(null);
  const { userData } = useGetUserData();
  const companies = userData?.data?.mapping
  // console.log(companies, 'companies')

  const changeCompany = async (company: any) => {
    await setCurrentCompanyKeychain(company);
    await getCurrentComp();
  }
  const getCurrentComp = async () => {
    const a = await getCurrentCompanyKeychain();
    setCurrentCompany(a);
  };

  useEffect(() => {
    getCurrentComp();
  }, []);

  return {
    currentCompany,
    changeCompany,
    companies,
  }
}