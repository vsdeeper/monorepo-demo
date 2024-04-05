import path from 'path'
import { consola } from 'consola'
import { readFileSync } from 'fs'

export function parsePackage(pkgName) {
  try {
    const pkgPath = path.resolve(process.cwd(), `packages/${pkgName}/package.json`)
    return JSON.parse(readFileSync(pkgPath))
  } catch (error) {
    consola.error(error)
  }
}
