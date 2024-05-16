import StocksScreen from "./screens/StocksScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderBookScreen from "./screens/OrderBookScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    light: require("./assets/fonts/light.otf"),
    regular: require("./assets/fonts/regular.otf"),
    medium: require("./assets/fonts/medium.otf"),
    semibold: require("./assets/fonts/semibold.otf"),
    bold: require("./assets/fonts/bold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StatusBar />
        <View
          style={{ flex: 1, backgroundColor: "white" }}
          onLayout={onLayoutRootView}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="STOCKS"
            >
              <Stack.Screen name="STOCKS" component={StocksScreen} />
              <Stack.Screen
                name="ORDER_BOOK"
                component={OrderBookScreen}
                options={{ animation: "fade" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
