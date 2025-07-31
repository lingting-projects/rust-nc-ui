import { webSettings } from '@/services/web';
import { useCallback, useEffect, useRef, useState } from 'react';

export default () => {
  const stateRef = useRef(false);
  const stateTimerRef = useRef<NodeJS.Timeout>();

  const [open, setOpen] = useState(true);
  const [updater, setUpdater] = useState<Partial<SETTINGS.AppUpdater>>();
  const [loading, setLoading] = useState(false);

  const refreshState = useCallback(() => webSettings.updaterState().then((v) => setUpdater(v)), []);

  const refresh = useCallback(() => {
    setLoading(true);
    webSettings
      .updaterCheck()
      .then((v) => {
        setOpen(v);
        if (v) {
          refreshState().finally(() => setLoading(false));
          return;
        }
        setUpdater({ new: v });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetch = () => {
      new Promise((resolve, reject) => {
        if (!stateRef.current) {
          resolve(false);
          return;
        }
        refreshState().then(resolve).catch(reject);
      }).finally(() => {
        stateTimerRef.current = setTimeout(fetch, 1000);
      });
    };

    fetch();

    return () => {
      stateRef.current = false;
      if (stateTimerRef.current) {
        clearTimeout(stateTimerRef.current);
      }
    };
  }, []);

  return { open, setOpen, updater, loading, setLoading, stateRef, refresh, refreshState };
};
