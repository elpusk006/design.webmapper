import React, { useState, useEffect } from 'react';
import { ConnectionStatus, DeviceType, AppState, KeyMapEntry, DEFAULT_CONFIG, DeviceConfig } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import DeviceTab from './components/DeviceTab';
import CommonTab from './components/CommonTab';
import KeyMapTab from './components/KeyMapTab';

// Define the global initialization function with an empty body as requested
(window as any).cf2_initialize = () => {
  // Empty body for user implementation
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: ConnectionStatus.DISCONNECTED,
    devicePath: '',
    deviceType: DeviceType.MSR_IBUTTON,
    activeTab: 'device',
    logs: ['Welcome to Web Tools 1.0'],
    config: { ...DEFAULT_CONFIG },
  });

  const [keyMaps, setKeyMaps] = useState<Record<string, KeyMapEntry[]>>({});

  // Call the initialization function on startup
  useEffect(() => {
    if (typeof (window as any).cf2_initialize === 'function') {
      (window as any).cf2_initialize();
    }
  }, []);

  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, message]
    }));
  };

  const handleConnect = (type: DeviceType) => {
    const fakePath = `\\\\?\\HID#VID_04D9&PID_1400&MI_00#7&${Math.random().toString(16).slice(2, 10)}&0&0000`;
    setState((prev) => ({
      ...prev,
      status: ConnectionStatus.CONNECTED,
      devicePath: fakePath,
      deviceType: type,
      logs: [...prev.logs, `Searching for HID devices...`, `Device found: ${type}`, `Connected to ${fakePath}`],
    }));
  };

  const handleDisconnect = () => {
    setState((prev) => ({
      ...prev,
      status: ConnectionStatus.DISCONNECTED,
      devicePath: '',
      activeTab: 'device',
      logs: [...prev.logs, 'User requested disconnect.', 'Device disconnected safely.'],
    }));
  };

  const updateConfig = (updates: Partial<DeviceConfig>) => {
    setState(prev => {
      // Find what changed for logging
      const changedKey = Object.keys(updates)[0];
      const newValue = Object.values(updates)[0];
      
      return {
        ...prev,
        config: { ...prev.config, ...updates },
        logs: [...prev.logs, `Setting changed: ${changedKey} -> ${newValue}`]
      };
    });
  };

  const handleKeyMapChange = (tabId: string, newKeys: KeyMapEntry[]) => {
    setKeyMaps(prev => ({
      ...prev,
      [tabId]: newKeys
    }));
    addLog(`Key map updated for ${tabId.replace(/-/g, ' ')} (${newKeys.length} keys)`);
  };

  const renderContent = () => {
    if (state.activeTab === 'device') {
      return (
        <DeviceTab 
          status={state.status}
          deviceType={state.deviceType}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          logs={state.logs}
          setDeviceType={(type) => setState(prev => ({ ...prev, deviceType: type }))}
          onApply={() => addLog("Settings applied to device successfully.")}
        />
      );
    }

    if (state.status === ConnectionStatus.DISCONNECTED) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg max-w-sm">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Device Not Connected</h3>
            <p className="text-sm">Please go to the <strong>Device</strong> tab and connect your reader to start configuration.</p>
          </div>
        </div>
      );
    }

    if (state.activeTab === 'common') {
      return <CommonTab deviceType={state.deviceType} config={state.config} onConfigChange={updateConfig} />;
    }

    const isKeyMapTab = state.activeTab.includes('prefix') || 
                        state.activeTab.includes('suffix') || 
                        state.activeTab === 'ibutton-remove-key';

    if (isKeyMapTab) {
      const maxKeys = state.activeTab === 'ibutton-remove-key' ? 20 : 7;
      const currentKeys = keyMaps[state.activeTab] || [];

      return (
        <KeyMapTab 
          title={state.activeTab} 
          maxKeys={maxKeys} 
          keys={currentKeys}
          onKeysChange={(keys) => handleKeyMapChange(state.activeTab, keys)}
        />
      );
    }

    return <div className="p-4">Select a tab from the sidebar to begin.</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
      <Header status={state.status} devicePath={state.devicePath} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeTab={state.activeTab} 
          onTabChange={(tab) => setState(prev => ({ ...prev, activeTab: tab }))}
          deviceType={state.deviceType}
          isConnected={state.status === ConnectionStatus.CONNECTED}
        />
        
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="bg-white border border-gray-300 shadow-sm min-h-[600px] h-full rounded flex flex-col">
            {renderContent()}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;
