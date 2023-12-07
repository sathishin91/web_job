import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { emptyaction, showalert } from './App.Action';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private $action: Actions, private toastr: ToastrService) {}

  _showalert = createEffect(() => {
    return this.$action.pipe(
      ofType(showalert),
      exhaustMap((action) => {
        const toast: ActiveToast<any> = this.Shownackbaralert(
          action.message,
          action.resulttype
        );

        // Use the 'onHidden' event to detect when the toast is dismissed
        return toast.onHidden.pipe(map(() => emptyaction()));
      })
    );
  });

  Shownackbaralert(message: string, resulttype = 'fail'): ActiveToast<any> {
    const _class = resulttype == 'pass' ? 'green-snackbar' : 'red-snackbar';

    // Use 'onHidden' event to detect when the toast is dismissed
    return this.toastr.success(message, '', { toastClass: _class });
  }
}
