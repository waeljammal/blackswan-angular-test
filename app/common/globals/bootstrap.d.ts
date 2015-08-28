// Type definitions for bootstrap

/// <reference path="../../../typings/_custom.d.ts" />

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