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

export const fader = trigger('fader', [
  transition('* <=> void', [
    style({
      opacity: 0,
    }),
    animate('600ms ease')
  ])
])

export const tableFadeInOut = animation([
  style({
    opacity: 0
  }),
  animate(500)
])

export const anim =

    trigger('animRoutes', [

        transition( '* <=> *', [
          style({ position: 'relative', minHeight: '120vh' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              width: '100%',
              opacity: 1
            })
          ]),
            query(':enter',
                [
                    style({
                      opacity: 0,
                    })
                ],
                { optional: true }
            ),

            query(':leave',
                [
                    style({ opacity: 1 }),
                    animate('0.2s', style({ opacity: 0 }))
                ],
                { optional: true }
            ),

            query(':enter',
                [
                    style({ opacity: 0 }),
                    animate('0.2s', style({ opacity: 1 }))
                ],
                { optional: true }
            )

        ])
      ])
