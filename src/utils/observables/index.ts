import {useEffect, useRef, useState} from "react"
import {Observable} from "rxjs"

export function useObservable<V, O extends Observable<V>>(
  observable: O,
  defaultValue?: V
): [V | undefined, O] {
  const [value, setValue] = useState<V | undefined>(defaultValue)
  const refObservable = useRef(observable)
  useEffect(() => {
    const subscription = refObservable.current.subscribe(setValue)
    return () => {
      subscription.unsubscribe()
    }
  }, [refObservable])
  return [value, refObservable.current]
}
