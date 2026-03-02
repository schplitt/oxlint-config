import { IGNORE_GLOBS } from '../globs'

/**
 * Returns the full list of ignore patterns (built-in + user-supplied).
 * @param userIgnores - Additional patterns to append to the built-in ignore list.
 */
export function ignorePatterns(userIgnores: string[] = []): string[] {
  return [...IGNORE_GLOBS, ...userIgnores]
}
