import {authenticateSuccess} from "../store/auth.actions";
import {AuthResponseData} from "../../services/authService";
import {User} from "../user.model";

export const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000);

  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate,
  );

  localStorage.setItem('userData', JSON.stringify(user));
  return authenticateSuccess({
    payload: {
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate: expirationDate.toString(),
      redirect: true,
    }
  });
};
