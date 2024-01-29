import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectBook } from "../store/reducers/books.reducer";
import { map, take } from "rxjs";

export function BookGuard(): CanActivateFn {
    return () => {
        const router = inject(Router);
        return inject(Store).select(selectBook).pipe(
            take(1),
            map((book) => {
                if (book) {
                    return true;
                }

                return router.createUrlTree(['']);
            })
        )
    }
}