import {animate, animation, AnimationReferenceMetadata, group, keyframes, query, style} from "@angular/animations";

// TODO https://github.com/vugar005/ngx-router-animations

export const sharedStyles = {
  position: 'fixed',
  overflow: 'hidden',
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d',
  //  transform: 'translate3d(0,0,0)'
};

/** Slide */
export const routeSlideAnimation: AnimationReferenceMetadata = animation([
  query(':enter, :leave', style(sharedStyles)
    , {optional: true}),
  group([
    query(':enter', [
      style({opacity: '0'}),
      animate('{{enterTiming}}s {{enterDelay}}s ease-out', keyframes([
        style({opacity: '0.5', transform: 'translateZ(-200px) translateX(200%)', offset: 0}),
        style({opacity: '0.5', transform: 'translateZ(-200px)', offset: 0.75}),
        style({opacity: '1', transform: 'translateZ(0) translateX(0)', offset: 1}),
      ]))
    ], {optional: true}),
    query(':leave', [
      animate('{{leaveTiming}}s {{leaveDelay}}s ease-out', keyframes([
        style({opacity: '1', offset: 0}),
        style({opacity: '0.5', transform: 'translateZ(-200px)', offset: 0.25}),
        style({opacity: '0.5', transform: 'translateZ(-200px) translateX(-200%)', offset: 0.75}),
        style({opacity: '0', transform: 'translateZ(-200px) translateX(-200%)', offset: 1}),
      ]))
    ], {optional: true}),
  ])
], {params: {enterTiming: '0.5', leaveTiming: '0.5', enterDelay: '0', leaveDelay: '0'}});
