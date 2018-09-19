import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes
} from "@angular/animations";

export const LIST_ANIMATION = trigger("listAnimation", [
  trigger("flyInOut", [
    state("in", style({ transform: "translateX(0)" })),
    transition("void => *", [
      animate(
        300,
        keyframes([
          style({ opacity: 0, transform: "translateX(-100%)", offset: 0 }),
          style({ opacity: 1, transform: "translateX(15px)", offset: 0.3 }),
          style({ opacity: 1, transform: "translateX(0)", offset: 1.0 })
        ])
      )
    ]),
    transition("* => void", [
      animate(
        300,
        keyframes([
          style({ opacity: 1, transform: "translateX(0)", offset: 0 }),
          style({ opacity: 1, transform: "translateX(-15px)", offset: 0.7 }),
          style({ opacity: 0, transform: "translateX(100%)", offset: 1.0 })
        ])
      )
    ])
  ])
]);
