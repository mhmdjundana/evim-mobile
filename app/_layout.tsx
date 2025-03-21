import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="home" />
      <Stack.Screen name="bast" options={{ headerShown: false }} />
      {/* <Stack.Screen name="bast" /> */}
      <Stack.Screen name="invoice" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="special-payment" options={{ headerShown: false }} />
      <Stack.Screen name="employee-claim-cc" options={{ headerShown: false }} />
      <Stack.Screen name="pcard" options={{ headerShown: false }} />
      <Stack.Screen name="corporate-integrity" options={{ headerShown: false }} />
      <Stack.Screen name="tnc" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ headerShown: false }} />
    </Stack>
  );
}
