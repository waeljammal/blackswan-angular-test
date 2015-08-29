interface IStorage {
    /**
     * Get a value from the database.
     *
     * @param key Value Key
     * @returns Stored Value
     */
    get(key: string): Object|string;

    /**
     * Remove an entry from the database.
     *
     * @param key The key of the item to remove.
     */
    remove(key: string): void;

    /**
     * Insert/Replace an entry in the database.
     *
     * @param key The key to use.
     * @param data The value to store.
     */
    save(key: string, data: string|Object): void;
}