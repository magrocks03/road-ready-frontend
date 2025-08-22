import { BehaviorSubject } from 'rxjs';

// This will hold the search criteria, including the date range, globally.
const initialSearchState = {
  criteria: {},
  dateRange: null,
};

const searchSubject = new BehaviorSubject(initialSearchState);

// The public observable that components can subscribe to.
export const searchState$ = searchSubject.asObservable();

// Function to update the global search state.
export const updateSearchState = (newSearchState) => {
  searchSubject.next(newSearchState);
};

// Function to get the current value directly when needed.
export const getCurrentSearchState = () => {
  return searchSubject.getValue();
};
