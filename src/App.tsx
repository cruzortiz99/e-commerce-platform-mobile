/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from "react"
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View
} from "react-native"
import {Colors} from "react-native/Libraries/NewAppScreen"
import AppSideMenu from "./components/molecules/AppMenu"

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "100%"
  }
})

const App = () => {
  const isDarkMode = useColorScheme() === "dark"
  const [openLeft, _setOpenLeft] = useState(true)
  const [openRight, _setOpenRight] = useState(false)

  const setOpenLeft = (value: boolean) => {
    value && _setOpenRight(false)
    _setOpenLeft(value)
  }
  const setOpenRight = (value: boolean) => {
    value && _setOpenLeft(false)
    _setOpenRight(value)
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <AppSideMenu
        title="Menu"
        direction="left-right"
        open={openLeft}
        onClose={() => setOpenLeft(false)}
      />
      <AppSideMenu
        direction="right-left"
        title="Tools"
        open={openRight}
        onClose={() => setOpenRight(false)}
      />
      <ScrollView style={styles.main}>
        <View>
          <Button title="Left" onPress={() => setOpenLeft(true)} />
        </View>
        <View>
          <Button
            title="Right"
            onPress={() => setOpenRight(true)}
            color="#0a0"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
