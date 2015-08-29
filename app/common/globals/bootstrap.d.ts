// Type definitions for bootstrap

interface IBootstrap {
    /**
     * Adds a new dependency to the bootstrap list.
     * @param dependency
     */
    add(dependency:string);

    /**
     * Starts the bootstrap process.
     */
    start();
}