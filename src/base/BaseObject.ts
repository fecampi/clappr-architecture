type Callback = (...args: any[]) => void;

class BaseObject {
  private events: Map<string, { id: number; callback: Callback }[]>;
  private eventIdCounter: number;

  constructor() {
    this.events = new Map();
    this.eventIdCounter = 0;
  }

  on(event: string, callback: Callback): number {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    const eventId = ++this.eventIdCounter;
    this.events.get(event)!.push({ id: eventId, callback });
    return eventId;
  }

  once(event: string, callback: Callback): number {
    const eventId = this.on(event, (...args: any[]) => {
      callback(...args);
      this.off(eventId);
    });
    return eventId;
  }

  off(eventId: number): void {
    for (const [event, handlers] of this.events.entries()) {
      const filtered = handlers.filter((e) => e.id !== eventId);
      if (filtered.length !== handlers.length) {
        this.events.set(event, filtered);
      }
    }
  }

  trigger(event: string, ...args: any[]): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(({ callback }) => callback(...args));
    }
  }

  listenTo(object: BaseObject, event: string, callback: Callback): number {
    return object.on(event, callback);
  }

  stopListening(eventId: number): void {
    this.off(eventId);
  }
}

export default BaseObject;
