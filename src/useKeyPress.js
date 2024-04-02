import { useEffect } from 'react';

export const useKeyPress = (pressedKey, action) => {
  useEffect(() => {
    const callback = (e) => {
      if (e.key.toLowerCase() === pressedKey.toLowerCase()) action();
    };

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [pressedKey, action]);
};
