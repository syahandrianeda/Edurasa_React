/**
 * 
 * @param map 
 * @param key 
 * @param create 
 * @returns Mapper K
 * @example const mapel = getOrCreateMap(
    mapelMap,
    kodeName,
    () => ({
        mapelKode: kodeName,
        mapelName,
        dataCp: new Map(),
        slotMapel: 0,
    })
);

mapel.slotMapel++;
 * 
 */
export default function getOrCreateMap<K, V>(
    map: Map<K, V>,
    key: K,
    create: () => V
): V {
    let value = map.get(key);

    if (value === undefined) {
        value = create();
        map.set(key, value);
    }

    return value;
}
