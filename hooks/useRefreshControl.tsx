import { router } from "expo-router";
import { useState } from "react";
import { RefreshControl } from "react-native";

export const useRefreshControl = ({
  isLoading,
  route = { pathname: "/" }
}: any) => {
  const [loading, setLoading] = useState(false);

  const refreshControl = <RefreshControl
    refreshing={isLoading ? isLoading : loading}
    onRefresh={() => {
      router.replace(route)
    }}
  />
  return {
    refreshControl
  }
}