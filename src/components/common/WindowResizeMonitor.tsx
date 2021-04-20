import { useLayoutEffect } from 'react';
import { useUIStore } from '../../StoreProvider';

/* Simple resize monitor feeding the UI store */

function WindowResizeMonitor() {
  const { setScreenWidth } = useUIStore();

  useLayoutEffect(() => {
    function updateWidth() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWidth);

    return function listenerCleanup() {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return <></>;
}

export default WindowResizeMonitor;
