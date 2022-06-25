import {animate, style, transition, trigger} from '@angular/animations';

export const inOutAnimation = trigger(
    'inOutAnimation',
    [
        transition(
            ':enter',
            [
                style({ right: '-100vw', opacity: 0 }),
                animate('.3s ease-out',
                    style({ right: '0', opacity: 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ right: '0', opacity: 1 }),
                animate('.3s ease-in',
                    style({ right: '-100vw', opacity: 0 }))
            ]
        )
    ]
)
