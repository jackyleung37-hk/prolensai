export interface CameraSettings {
  iso: number;
  aperture: string;
  shutterSpeed: string;
  whiteBalance: string;
  focalLength: string;
  explanation: string;
  tips: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
