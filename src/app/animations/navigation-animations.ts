import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const slide = animation([
    style({
      height: 0,
      position: 'relative'
    }),
    animate('{{ time }}')
]);

export const fadeInOut = animation([
  style({
    opacity: 0,
  }),
  animate('{{ time }}')
]);

export const tableFadeInOut = animation([
  style({
    opacity: 0
  }),
  animate(500)
])


