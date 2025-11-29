'use client';

import { useEffect, useRef } from 'react';

const COMM_KEY = "SHARED_SECRET_123"; // ✅ shared token

export function ClientScriptHandler() {
  const isListenerActive = useRef(false);
  const readySignalSent = useRef(false);

  useEffect(() => {
    if (isListenerActive.current) return;
    isListenerActive.current = true;

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;

      // ✅ Token validation instead of origin validation
      if (!data?.token || data.token !== COMM_KEY) return;

      if (data.type === 'INJECT_SCRIPT' && data.script) {
        try {
          new Function(data.script)();
        } catch (err) {
          console.error("Script exec failed:", err);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    const sendReady = () => {
      if (readySignalSent.current) return;
      if (window.parent !== window) {
        window.parent.postMessage(
          { type: 'IFRAME_READY', token: COMM_KEY },
          '*' // ✅ no origin restriction
        );
        readySignalSent.current = true;
      }
    };

    sendReady();
    setTimeout(sendReady, 100);
    setTimeout(sendReady, 500);

    return () => {
      window.removeEventListener('message', handleMessage);
      isListenerActive.current = false;
    };
  }, []);

  return null;
};