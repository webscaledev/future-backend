import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const SLIDE_IN_DOWN_WITH_DELAY_ANIMATION = trigger(
  "slideInDownWithDelay",
  [
    state("in", style({ opacity: 1, transform: "translate3d(0, 0, 0)" })),
    transition("void => *", [
      style({
        opacity: 0,
        transform: "translate3d(0, -2000px, 0)"
      }),
      animate("3s ease-in")
    ])
  ]
);
