/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react"
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  useWindowDimensions
} from "react-native"
import {Colors} from "react-native/Libraries/NewAppScreen"
import AppMenu from "./components/molecules/AppMenu"

const App = () => {
  const isDarkMode = useColorScheme() === "dark"
  // const [open] = useObservable<boolean, Observable<boolean>>(
  //   interval(5000).pipe(map((event) => event % 2 === 0))
  // )
  const screen = useWindowDimensions()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppMenu open={true} width={screen.width * 0.9} direction="left-right" />
    </SafeAreaView>
  )
}

export default App
