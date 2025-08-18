import { BehaviorSubject } from "rxjs";

// Create a BehaviorSubject. It stores the latest value and emits it to new subscribers.
// We initialize it with the username from session storage, or null if it doesn't exist.
const userSubject = new BehaviorSubject(sessionStorage.getItem("username"));

// This is the public observable that components will subscribe to.
export const user$ = userSubject.asObservable();

// This function is called when a user successfully logs in.
export const userLogin = (username, token) => {
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("token", token);
  userSubject.next(username); // Push the new username to all subscribers
};

// This function is called when a user logs out.
export const userLogout = () => {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("token");
  userSubject.next(null); // Push null to all subscribers
};