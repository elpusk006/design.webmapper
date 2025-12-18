import { AppState, ConnectionStatus, DeviceType, DeviceConfig } from './types';

/**
 * GLOBAL SYSTEM HOOKS
 * Exposing entry points for external integration.
 */
(window as any).cf2_initialize = () => {
  // Empty body for user implementation
};

/**
 * UI EVENT HANDLERS & LOGIC CONTROLLER
 * This function orchestrates the business logic for the configuration tool.
 */
export const createHandlers = (
  state: AppState,
  setState: React.Dispatch<React.SetStateAction<AppState>>,
  addLog: (msg: string) => void
) => {
  /**
   * Internal helper to perform state updates and logging for config changes.
   */
  const updateSetting = (key: keyof DeviceConfig, value: any, label?: string) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, [key]: value },
      logs: [...prev.logs, `Update: ${label || key} set to ${value}`]
    }));
  };

  return {
    /**
     * INITIALIZATION & SYSTEM
     */
    initializeSystem: () => {
      if (typeof (window as any).cf2_initialize === 'function') {
        (window as any).cf2_initialize();
      }
      addLog('System components initialized.');
    },

    /**
     * CONNECTION HANDLERS
     */
    onConnect: (type: DeviceType) => {
      addLog(`Searching for HID devices (Type: ${type})...`);
      const fakePath = `\\\\?\\HID#VID_04D9&PID_1400&MI_00#7&${Math.random().toString(16).slice(2, 10)}&0&0000`;
      setState(prev => ({
        ...prev,
        status: ConnectionStatus.CONNECTED,
        devicePath: fakePath,
        deviceType: type,
        logs: [...prev.logs, `Device found and connected: ${fakePath}`]
      }));
    },

    onDisconnect: () => {
      addLog('Disconnecting from device...');
      setState(prev => ({
        ...prev,
        status: ConnectionStatus.DISCONNECTED,
        devicePath: '',
        activeTab: 'device',
        logs: [...prev.logs, 'Device disconnected safely.']
      }));
    },

    onApply: () => {
      addLog('Writing configuration to device memory...');
      addLog('Apply Success: Configuration updated.');
    },

    /**
     * CONFIGURATION HANDLERS (Split by Element/Setting)
     */
    config: {
      // System Settings
      onInterfaceChange: (val: string) => updateSetting('interface', val, 'Interface Mode'),
      onBuzzerChange: (val: boolean) => updateSetting('buzzer', val, 'Buzzer State'),
      onLanguageChange: (val: string) => updateSetting('language', val, 'Keyboard Language'),

      // i-Button Specific
      onIButtonModeChange: (val: string) => updateSetting('ibuttonMode', val, 'i-Button Mode'),
      onIButtonRangeStartChange: (val: number) => updateSetting('ibuttonRangeStart', val, 'i-Button Range Start'),
      onIButtonRangeEndChange: (val: number) => updateSetting('ibuttonRangeEnd', val, 'i-Button Range End'),

      // MSR Specific
      onMsrDirectionChange: (val: string) => updateSetting('msrDirection', val, 'MSR Direction'),
      onMsrTrackOrderChange: (val: string) => updateSetting('msrTrackOrder', val, 'MSR Track Order'),
      onMsrResetIntervalChange: (val: string) => updateSetting('msrResetInterval', val, 'MSR Reset Interval'),
      onMsrISO1Toggle: (val: boolean) => updateSetting('msrEnableISO1', val, 'ISO Track 1'),
      onMsrISO2Toggle: (val: boolean) => updateSetting('msrEnableISO2', val, 'ISO Track 2'),
      onMsrISO3Toggle: (val: boolean) => updateSetting('msrEnableISO3', val, 'ISO Track 3'),
      onMsrGlobalSendConditionChange: (val: string) => updateSetting('msrGlobalSendCondition', val, 'Global Sending Condition'),
      onMsrSuccessIndConditionChange: (val: string) => updateSetting('msrSuccessIndCondition', val, 'Success Indication Condition'),
    },

    /**
     * FILE & DATA HANDLERS
     */
    onLoadSettings: (fileName: string) => {
      addLog(`Loading settings from file: ${fileName}`);
      addLog('Settings file parsed successfully.');
    },

    onLoadFirmware: (fileName: string) => {
      addLog(`Firmware ROM selected: ${fileName}`);
      addLog('Ready for update.');
    },

    onDownloadSettings: () => {
      addLog('Preparing settings for export...');
      const data = { config: state.config, deviceType: state.deviceType, timestamp: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elpusk_backup_${state.deviceType}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addLog('Settings exported successfully.');
    }
  };
};
