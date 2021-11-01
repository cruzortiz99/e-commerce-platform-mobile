import React, {useEffect, useState} from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native"
import {delay, map, takeLast, tap} from "rxjs"
import {moveAnimation} from "../../../utils/animation"

export type AppMenuProps = {
  open?: boolean
  title?: string
  direction: "left-right" | "right-left"
  children?: React.ReactNode
  onClose?: () => void
}

function AppSideMenu(props: AppMenuProps): JSX.Element {
  const screen = useWindowDimensions()
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const subscription = moveAnimation(screen.width)(20)()
      .pipe(
        map((moved) =>
          props.direction === "left-right"
            ? props.open
              ? -screen.width + moved
              : -moved
            : props.open
            ? screen.width * 0.1 + (screen.width - moved)
            : screen.width * 0.1 + moved
        )
      )
      .subscribe(setPosition)
    return () => {
      subscription.unsubscribe()
    }
  }, [props.open, screen.width])

  return (
    <View
      style={{
        ...styles.overlay,
        width: screen.width,
        height: screen.height,
        opacity: (props.open && 1) || 0,
        zIndex: (props.open && 10) || -1
      }}
      onTouchEnd={() =>
        moveAnimation(screen.width)(12)()
          .pipe(
            map((moved) =>
              props.direction === "left-right"
                ? -moved
                : screen.width * 0.1 + moved
            ),
            tap(setPosition)
          )
          .pipe(takeLast(1), delay(100))
          .subscribe(() => props.onClose && props.onClose())
      }>
      <View
        style={{
          ...styles.menu,
          ...(props.direction === "left-right"
            ? styles.borderRadiusLeft
            : styles.borderRadiusRight),
          transform: [
            {
              translateX: position
            }
          ]
        }}
        onTouchEnd={(event) => event.stopPropagation()}>
        {props.title && (
          <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
          </View>
        )}
        <ScrollView style={styles.menuBody}>{props.children}</ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#eee",
    width: "90%",
    padding: 20
  },
  borderRadiusLeft: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  borderRadiusRight: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  menuBody: {
    height: "100%"
  },
  overlay: {
    backgroundColor: "#1113",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20
  }
})

export default AppSideMenu
