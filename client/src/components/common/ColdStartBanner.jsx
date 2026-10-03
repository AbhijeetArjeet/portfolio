import React, { useState, useEffect } from 'react';
import { subscribeToColdStart } from '../../services/api';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

export default function ColdStartBanner() {
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    return subscribeToColdStart((status) => {
      setIsWakingUp(status);
      if (status) {
        setDismissed(false);
      }
    });
  }, []);

  if (!isWakingUp || dismissed) {
    return null;
  }

  return (
    <div className="cold-start-banner" role="alert">
      <div className="banner-content">
        <div className="spinner"></div>
        <div>
          <strong>Backend is waking up:</strong> Our Render cloud instance is spinning up from cold sleep. Please wait ~30 seconds; your requests are automatically being buffered and retried.
        </div>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        style={{
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center'
        }}
        title="Dismiss notice"
      >
        <X size={18} />
      </button>
    </div>
  );
}
