import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="home" />
      <Stack.Screen name="bast" options={{ headerShown: false }} />
      {/* <Stack.Screen name="bast" /> */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="sp" />
      <Stack.Screen name="cc" />
      <Stack.Screen name="pcard" />
      <Stack.Screen name="ci" />
      <Stack.Screen name="tnc" />
    </Stack>
  );
}
