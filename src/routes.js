/**
 * An Array of Routes that can be used without authentication
 * @type {string}
 */
export const publicRoutes = [
    '/',
]

/**
 * An Array of Routes that are used for authentication
 * These routes will redirect authenticated users to /account
 * @type {string}
 */
export const authRoutes = [
    '/sign-in',
    '/sign-up',
]

/**
 * The prefix for API authentication routes,
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = 'api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/account';