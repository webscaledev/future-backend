import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const SLIDE_IN_LEFT_ANIMATION =
  trigger('slideInLeft', [
      state('in', style({opacity: 1, transform: 'translate3d(0, 0, 0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate3d(-100%, 0, 0)'
        }),
        animate('1s 1000ms ease-in')
      ]),
      transition('* => void', [
        animate('1s 500ms ease-out', style({
          opacity: 0,
          transform: 'translate3d(0, 0, 0)'
        }))
      ])
    ]
  );
