import {of} from "rxjs";
import {authenticateFail} from "../store/auth.actions";

export const handleError = ( errorRes ) => {

    let errorMessage = 'An unknown error occurred';

    if (!errorRes.error || !errorRes.error.error)
        return of(authenticateFail({payload: errorMessage}));


    switch ( errorRes.error.error.message ) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Invalid credential';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid credential';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
            errorMessage = 'Too many attempts, try later';
            break;
    }


    return of( authenticateFail({ payload: errorMessage }));
}
