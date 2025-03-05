import { retrieveUserData } from "@/fetch/auth";
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