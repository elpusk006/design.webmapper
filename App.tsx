import React, { useState } from 'react';
import { ConnectionStatus, DeviceType, AppState, KeyMapEntry } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import DeviceTab from './components/DeviceTab';
import CommonTab from './components/CommonTab';
import KeyMapTab from './components/KeyMapTab';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: ConnectionStatus.DISCONNECTED,
    devicePath: '',
    deviceType: DeviceType.MSR_IBUTTON, // Simulation type
    activeTab: 'device',
    logs: ['Welcome to Web Tools 1.0'],
  });

  // Store key configurations for each tab independently
  const [keyMaps, setKeyMaps] = useState<Record<string, KeyMapEntry[]>>({});

  const handleConnect = (type: DeviceType) => {
    // TODO + _ +
    setState((prev) => ({
      ...prev,
      status: ConnectionStatus.CONNECTED,
      devicePath: '\\\\?\\HID#VID_XXXX&PID_XXXX',
      deviceType: type,
      logs: [...prev.logs, `Connected to ${type} device.`, 'Reading configuration...'],
    }));
  };

  const handleDisconnect = () => {
    // TODO + _ +
    setState((prev) => ({
      ...prev,
      status: ConnectionStatus.DISCONNECTED,
      devicePath: '',
      activeTab: 'device', // Reset to default tab on disconnect
      logs: [...prev.logs, 'Device disconnected.'],
    }));
  };

  const handleKeyMapChange = (tabId: string, newKeys: KeyMapEntry[]) => {
    setKeyMaps(prev => ({
      ...prev,
      [tabId]: newKeys
    }));
  };

  const renderContent = () => {
    // If disconnected, only show Device tab (or a welcome screen, but design implies Device tab is always start)
    if (state.activeTab === 'device') {
      return (
        <DeviceTab 
          status={state.status}
          deviceType={state.deviceType}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          logs={state.logs}
          setDeviceType={(type) => setState(prev => ({ ...prev, deviceType: type }))}
        />
      );
    }

    if (state.status === ConnectionStatus.DISCONNECTED) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium">Device Not Connected</h3>
            <p className="text-sm">Please connect a device in the Device tab first.</p>
          </div>
        </div>
      );
    }

    if (state.activeTab === 'common') {
      return <CommonTab deviceType={state.deviceType} />;
    }

    // Key Map Tabs (Dynamic based on sidebar selection)
    // Check if the active tab is one of the key map configuration tabs
    // TODO + _ +
    const isKeyMapTab = state.activeTab.includes('prefix') || 
                        state.activeTab.includes('suffix') || 
                        state.activeTab === 'ibutton-remove-key';

    if (isKeyMapTab) {
      // "i-button remove key" allows 20 keys, others allow 7.
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

    return <div className="p-4">Select a tab from the sidebar.</div>;
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