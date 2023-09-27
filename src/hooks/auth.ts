import {getWithExpiry} from "../helpers/authSession";

export const useAuth = () => {
  return getWithExpiry('auth');
}