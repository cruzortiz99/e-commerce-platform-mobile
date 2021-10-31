import React from "react"
import {ScrollView, StyleSheet, Text, View} from "react-native"

export type AppMenuProps = {
  open?: boolean
  direction: "left-right" | "right-left" | "vertical"
} & (
  | {direction: "left-right" | "right-left"; width: number}
  | {direction: "vertical"; height: number}
)

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#ddd"
  },
  overlay: {
    backgroundColor: "#2223"
  }
})

function AppMenu(props: AppMenuProps): JSX.Element {
  return (
    <View
      style={{
        ...styles.overlay,
        ...(props.direction === "vertical"
          ? {width: "100%", height: props.open ? "100%" : 0}
          : {width: props.open ? "100%" : 0, height: "100%"})
      }}>
      <ScrollView
        style={{
          ...styles.menu
        }}>
        <Text>Menu de la app</Text>
      </ScrollView>
    </View>
  )
}

export default AppMenu
