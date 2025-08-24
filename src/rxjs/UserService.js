import { BehaviorSubject } from "rxjs";
import { jwtDecode } from 'jwt-decode';

const getInitialUser = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

const userSubject = new BehaviorSubject(getInitialUser());

export const user$ = userSubject.asObservable();

export const userLogin = (token) => {
  sessionStorage.setItem("token", token);
  try {
    const decoded = jwtDecode(token);
    userSubject.next(decoded);
  } catch (error) {
    userSubject.next(null);
  }
};

export const userLogout = () => {
  sessionStorage.removeItem("token");
  userSubject.next(null);
};