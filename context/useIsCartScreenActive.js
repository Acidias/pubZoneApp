import { useNavigationState } from '@react-navigation/native';

export const useIsCartScreenActive = () => {
  const isCartScreenActive = (state) => {
    return state.routes.some(route => {
      // Check if the current route is 'Cart'
      if (route.name === 'Cart') return true;
      // Recursively check nested navigators
      if (route.state) return isCartScreenActive(route.state);
      return false;
    });
  };

  const navigationState = useNavigationState(state => state);
  return isCartScreenActive(navigationState);
};
