




/**
 * Check if given key exists in local storage
 * @param key string key to check
 * @returns boolean, true if exists in local storage else false
 */
export default function local_storage_exists(key : string) {
    for (let i = 0; i < localStorage.length; i++) {
        const loc_key = localStorage.key(i);
        if (loc_key === key) {
            return true
        }
    }
    return false;
}