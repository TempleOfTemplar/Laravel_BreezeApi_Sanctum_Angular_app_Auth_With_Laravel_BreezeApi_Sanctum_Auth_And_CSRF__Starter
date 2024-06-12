import {FormControl, FormGroup} from "@angular/forms";

// export type Form<T> = {
//   [P in keyof T]: T[P] extends 'object' ? FormGroup<Form<T[P]>> : FormControl<T[P]>;
// };

export type ControlsFrom<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsFrom<T[K]>>
    : FormControl<T[K]>;
};
