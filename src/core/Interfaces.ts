export interface CoreInterface {
  on(event: string, handler: (...args: any[]) => void): void;
  trigger(event: string, ...args: any[]): void;
  isPlaying(): boolean;
  play(): void;
  pause(): void;
}


