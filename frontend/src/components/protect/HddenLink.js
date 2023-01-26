import { useSelector } from 'react-redux';

export const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};
