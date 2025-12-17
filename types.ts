export enum ConnectionStatus {
  DISCONNECTED = 'not connect',
  CONNECTED = 'connected',
}

export enum DeviceType {
  IBUTTON = 'i-button',
  MSR = 'msr',
  MSR_IBUTTON = 'msr+i-button',
}

export interface KeyMapEntry {
  id: number;
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  keyValue: string;
}

export interface AppState {
  status: ConnectionStatus;
  devicePath: string;
  deviceType: DeviceType;
  activeTab: string;
  logs: string[];
}

export const KEYBOARD_LAYOUT = [
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Bksp'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];