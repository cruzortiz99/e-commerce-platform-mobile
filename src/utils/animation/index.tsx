import {interval, map, Observable, take} from "rxjs"

export function moveAnimation(
  distance: number
): (duration: number) => () => Observable<number> {
  return (duration) => () =>
    interval(1).pipe(
      take(duration + 1),
      map((timePassed) => (timePassed * distance) / duration)
    )
}
