/**
 * A helper service for storing and retrieving data from the browser database.
 */
class StorageService implements IStorage {
    /**
     * Get a value from the database.
     *
     * @param {string} key Value Key
     * @returns {Object|string}
     */
    get(key: string): Object|string {
        let item = localStorage.getItem(key);

        if (item) {
            item = item.replace(/"/g, '');
            return item;
        }

        return item;
    }

    /**
     * Insert/Replace an entry in the database.
     *
     * @param key The key to use.
     * @param data The value to store.
     */
    public save(key: string, data: string|Object): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Remove an entry from the database.
     *
     * @param key The key of the item to remove.
     */
    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Clears all entries in the local storage.
     */
    clearAll() {
        localStorage.clear();
    }
}

export = StorageService;