declare module '@plaindb/cache' {
  interface CacheOptions {
    maxSizeBytes?: number
    maxSizeItems?: number
    storeValues?: boolean
    strategy?: string | typeof AbstractEvictionStrategy
  }

  interface EntryObject {
    key: string
    size: number
  }

  interface EvictionStrategyMap {
    [key: string]: typeof AbstractEvictionStrategy
  }

  class Cache extends Evented {
    constructor(storage: any, options?: CacheOptions)
    get(key: string): Promise<any>
    put(key: string, value: any): Promise<any>
    del(key: string): Promise<any>
    prune(): Promise<any>
  }

  class Evented {
    // Custom event emitter logic
  }

  class EvictionStrategyFactory {
    static strategyMap: EvictionStrategyMap
    static createStrategy(cache: Cache): AbstractEvictionStrategy
  }

  abstract class AbstractEvictionStrategy {
    constructor(cache: Cache)
    put(key: string, value: any): Promise<void>
    get(key: string): Promise<any>
    del(key: string): Promise<void>
    prune(): Promise<void>
  }

  class SizeBasedEvictionStrategy extends AbstractEvictionStrategy {
    constructor(cache: Cache)
    getTotalSize(): Promise<number>
    setTotalSize(size: number): Promise<void>
    calculateSize(key: string, value: any): number
  }

  class LRUStrategy extends SizeBasedEvictionStrategy {}

  class LFUStrategy extends SizeBasedEvictionStrategy {
    constructor(cache: Cache)
  }

  export = Cache
}
