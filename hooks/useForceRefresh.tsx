import { useState } from "react";

export const useForceRefresh = () => {
  const [refreshing, setRefreshing] = useState(1);
  return () => setRefreshing(refreshing + 1);
}