import { AppState, ConnectionStatus, DeviceType, DeviceConfig } from './types';

/**
 * UI Event Handlers and Logic Controller
 * This file centralizes all logic for buttons, selects, checkboxes, and file operations.
 */

export const createHandlers = (
  state: AppState,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  addLog: (msg: string) => void
) => {
  return {
    /**
     * CONNECTION HANDLERS
     * Logic for establishing and breaking device communication.
     */
    
    // Triggered when 'Connect' button is pressed
    onConnect: (type: DeviceType) => {
      addLog(`Searching for HID devices (Type: ${type})...`);
      // Simulate hardware detection delay
      const fakePath = `\\\\?\\HID#VID_04D9&PID_1400&MI_00#7&${Math.random().toString(16).slice(2, 10)}&0&0000`;
      
      setState(prev => ({
        ...prev,
        status: ConnectionStatus.CONNECTED,
        devicePath: fakePath,
        deviceType: type,
        logs: [...prev.logs, `Device found and connected: ${fakePath}`]
      }));
    },

    // Triggered when 'Disconnect' button is pressed
    onDisconnect: () => {
      addLog('Disconnecting from device...');
      setState(prev => ({
        ...prev,
        status: ConnectionStatus.DISCONNECTED,
        devicePath: '',
        activeTab: 'device', // Reset to device tab on disconnect
        logs: [...prev.logs, 'Device disconnected successfully.']
      }));
    },

    // Triggered when 'Apply Settings' is pressed
    onApply: () => {
      addLog('Writing configuration to device memory...');
      // In a real app, this would send HID reports to the device
      addLog('Apply Success: Configuration updated.');
    },

    /**
     * CONFIGURATION HANDLERS
     * Logic for changing specific device parameters (Combos, Checkboxes, etc.)
     */

    // Generic handler for all DeviceConfig property updates
    updateConfig: (updates: Partial<DeviceConfig>) => {
      setState(prev => {
        const changedKey = Object.keys(updates)[0];
        const newValue = Object.values(updates)[0];
        
        // Log the specific change for user feedback
        const logMsg = `Change Detected: [${changedKey}] set to "${newValue}"`;
        
        return {
          ...prev,
          config: { ...prev.config, ...updates },
          logs: [...prev.logs, logMsg]
        };
      });
    },

    /**
     * FILE & DATA HANDLERS
     * Logic for loading/saving external data
     */

    // Handle Setting File Upload
    onLoadSettings: (fileName: string) => {
      addLog(`Loading settings from file: ${fileName}`);
      // Simulate parsing logic
      addLog('Settings file parsed successfully. UI updated.');
    },

    // Handle Firmware ROM Selection
    onLoadFirmware: (fileName: string) => {
      addLog(`Firmware ROM selected: ${fileName}`);
      addLog('Ready for update. Press "Update" to proceed.');
    },

    // Handle Configuration Download (Export)
    onDownloadSettings: () => {
      addLog('Preparing settings for export...');
      const data = { 
        config: state.config, 
        deviceType: state.deviceType, 
        exportDate: new Date().toISOString() 
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elpusk_backup_${state.deviceType}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      addLog('Settings exported to elpusk_backup.json');
    }
  };
};
