## Classes

<dl>
<dt><a href="#AbstractEvictionStrategy">AbstractEvictionStrategy</a></dt>
<dd><p>An abstract class that defines eviction strategy interface.</p>
</dd>
<dt><a href="#EvictionStrategyFactory">EvictionStrategyFactory</a></dt>
<dd><p>A factory for creating eviction strategies.</p>
</dd>
<dt><a href="#SizeBasedEvictionStrategy">SizeBasedEvictionStrategy</a></dt>
<dd><p>Size-based eviction strategy.</p>
</dd>
<dt><a href="#Cache">Cache</a></dt>
<dd><p>The main Cache class that supports different eviction strategies.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#STRATEGY_MAP">STRATEGY_MAP</a></dt>
<dd><p>A map to store different eviction strategies.</p>
</dd>
</dl>

<a name="AbstractEvictionStrategy"></a>

## AbstractEvictionStrategy
An abstract class that defines eviction strategy interface.

**Kind**: global class  

* [AbstractEvictionStrategy](#AbstractEvictionStrategy)
    * [new AbstractEvictionStrategy(cache)](#new_AbstractEvictionStrategy_new)
    * [.put(key, value)](#AbstractEvictionStrategy+put)
    * [.get(key)](#AbstractEvictionStrategy+get)
    * [.del(key)](#AbstractEvictionStrategy+del)
    * [.prune()](#AbstractEvictionStrategy+prune)

<a name="new_AbstractEvictionStrategy_new"></a>

### new AbstractEvictionStrategy(cache)

| Param | Type | Description |
| --- | --- | --- |
| cache | [<code>Cache</code>](#Cache) | Cache instance. |

<a name="AbstractEvictionStrategy+put"></a>

### abstractEvictionStrategy.put(key, value)
Put a key-value pair into the cache.

**Kind**: instance method of [<code>AbstractEvictionStrategy</code>](#AbstractEvictionStrategy)  
**Throws**:

- <code>Error</code> Throws an error if the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |
| value | <code>\*</code> | The value. |

<a name="AbstractEvictionStrategy+get"></a>

### abstractEvictionStrategy.get(key)
Get a value by its key from the cache.

**Kind**: instance method of [<code>AbstractEvictionStrategy</code>](#AbstractEvictionStrategy)  
**Throws**:

- <code>Error</code> Throws an error if the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="AbstractEvictionStrategy+del"></a>

### abstractEvictionStrategy.del(key)
Delete a key-value pair from the cache by its key.

**Kind**: instance method of [<code>AbstractEvictionStrategy</code>](#AbstractEvictionStrategy)  
**Throws**:

- <code>Error</code> Throws an error if the method is not implemented.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="AbstractEvictionStrategy+prune"></a>

### abstractEvictionStrategy.prune()
Prune the cache based on the implemented eviction strategy.

**Kind**: instance method of [<code>AbstractEvictionStrategy</code>](#AbstractEvictionStrategy)  
**Throws**:

- <code>Error</code> Throws an error if the method is not implemented.

<a name="EvictionStrategyFactory"></a>

## EvictionStrategyFactory
A factory for creating eviction strategies.

**Kind**: global class  
<a name="EvictionStrategyFactory.createStrategy"></a>

### EvictionStrategyFactory.createStrategy(cache) ⇒ [<code>AbstractEvictionStrategy</code>](#AbstractEvictionStrategy)
Creates a strategy instance based on cache options.

**Kind**: static method of [<code>EvictionStrategyFactory</code>](#EvictionStrategyFactory)  
**Returns**: [<code>AbstractEvictionStrategy</code>](#AbstractEvictionStrategy) - A strategy instance.  
**Throws**:

- <code>Error</code> Throws an error if the strategy is not known.


| Param | Type | Description |
| --- | --- | --- |
| cache | [<code>Cache</code>](#Cache) | Cache instance. |

<a name="SizeBasedEvictionStrategy"></a>

## SizeBasedEvictionStrategy
Size-based eviction strategy.

**Kind**: global class  

* [SizeBasedEvictionStrategy](#SizeBasedEvictionStrategy)
    * [new SizeBasedEvictionStrategy(cache)](#new_SizeBasedEvictionStrategy_new)
    * [.getTotalSize()](#SizeBasedEvictionStrategy+getTotalSize) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.setTotalSize(size)](#SizeBasedEvictionStrategy+setTotalSize) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.calculateSize(key, value)](#SizeBasedEvictionStrategy+calculateSize) ⇒ <code>number</code>
    * [.getKey(key)](#SizeBasedEvictionStrategy+getKey) ⇒ <code>string</code>
    * [.get(key)](#SizeBasedEvictionStrategy+get) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.put(key, value)](#SizeBasedEvictionStrategy+put) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.del(key)](#SizeBasedEvictionStrategy+del) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
    * [.prune()](#SizeBasedEvictionStrategy+prune) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_SizeBasedEvictionStrategy_new"></a>

### new SizeBasedEvictionStrategy(cache)

| Param | Type | Description |
| --- | --- | --- |
| cache | [<code>Cache</code>](#Cache) | Cache instance. |

<a name="SizeBasedEvictionStrategy+getTotalSize"></a>

### sizeBasedEvictionStrategy.getTotalSize() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the total size of the cache.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
**Returns**: <code>Promise.&lt;number&gt;</code> - The total size in bytes.  
<a name="SizeBasedEvictionStrategy+setTotalSize"></a>

### sizeBasedEvictionStrategy.setTotalSize(size) ⇒ <code>Promise.&lt;void&gt;</code>
Sets the total size of the cache.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The new total size in bytes. |

<a name="SizeBasedEvictionStrategy+calculateSize"></a>

### sizeBasedEvictionStrategy.calculateSize(key, value) ⇒ <code>number</code>
Calculates the size of a key-value pair.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
**Returns**: <code>number</code> - The size in bytes.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |
| value | <code>\*</code> | The value. |

<a name="SizeBasedEvictionStrategy+getKey"></a>

### sizeBasedEvictionStrategy.getKey(key) ⇒ <code>string</code>
Gets a namespaced key for storing in the cache.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
**Returns**: <code>string</code> - The namespaced key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="SizeBasedEvictionStrategy+get"></a>

### sizeBasedEvictionStrategy.get(key) ⇒ <code>Promise.&lt;\*&gt;</code>
Retrieves a value from the cache.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - The value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="SizeBasedEvictionStrategy+put"></a>

### sizeBasedEvictionStrategy.put(key, value) ⇒ <code>Promise.&lt;string&gt;</code>
Inserts or updates a key-value pair into the cache.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The namespaced key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |
| value | <code>\*</code> | The value. |

<a name="SizeBasedEvictionStrategy+del"></a>

### sizeBasedEvictionStrategy.del(key) ⇒ <code>Promise.&lt;(string\|null)&gt;</code>
Deletes a key-value pair from the cache.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
**Returns**: <code>Promise.&lt;(string\|null)&gt;</code> - The deleted namespaced key or null.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="SizeBasedEvictionStrategy+prune"></a>

### sizeBasedEvictionStrategy.prune() ⇒ <code>Promise.&lt;void&gt;</code>
Prunes the cache by removing the oldest entries.

**Kind**: instance method of [<code>SizeBasedEvictionStrategy</code>](#SizeBasedEvictionStrategy)  
<a name="Cache"></a>

## Cache
The main Cache class that supports different eviction strategies.

**Kind**: global class  

* [Cache](#Cache)
    * [new Cache(storage, [options])](#new_Cache_new)
    * _instance_
        * [.get(key)](#Cache+get) ⇒ <code>\*</code>
        * [.put(key, value)](#Cache+put) ⇒ <code>\*</code>
        * [.del(key)](#Cache+del) ⇒ <code>\*</code>
        * [.prune()](#Cache+prune) ⇒ <code>void</code>
    * _static_
        * [.strategies](#Cache.strategies) ⇒ <code>Proxy</code>

<a name="new_Cache_new"></a>

### new Cache(storage, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| storage | <code>Object</code> |  | Storage instance. |
| [options] | <code>Object</code> | <code>{}</code> | Cache options. |

<a name="Cache+get"></a>

### cache.get(key) ⇒ <code>\*</code>
Retrieves a value from the cache by its key.

**Kind**: instance method of [<code>Cache</code>](#Cache)  
**Returns**: <code>\*</code> - The value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="Cache+put"></a>

### cache.put(key, value) ⇒ <code>\*</code>
Inserts or updates a key-value pair into the cache.

**Kind**: instance method of [<code>Cache</code>](#Cache)  
**Returns**: <code>\*</code> - The value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |
| value | <code>\*</code> | The value. |

<a name="Cache+del"></a>

### cache.del(key) ⇒ <code>\*</code>
Deletes a key-value pair from the cache by its key.

**Kind**: instance method of [<code>Cache</code>](#Cache)  
**Returns**: <code>\*</code> - The deleted value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key. |

<a name="Cache+prune"></a>

### cache.prune() ⇒ <code>void</code>
Prunes the cache according to the active eviction strategy.

**Kind**: instance method of [<code>Cache</code>](#Cache)  
<a name="Cache.strategies"></a>

### Cache.strategies ⇒ <code>Proxy</code>
Static getter for strategies.

**Kind**: static property of [<code>Cache</code>](#Cache)  
**Returns**: <code>Proxy</code> - A Proxy object for the STRATEGY_MAP.  
<a name="STRATEGY_MAP"></a>

## STRATEGY\_MAP
A map to store different eviction strategies.

**Kind**: global constant  
