import { $ } from 'execa'
import { createSpinner } from 'nanospinner'
import { consola } from 'consola'
import path from 'path'
import { readFileSync, writeFileSync } from 'fs'

export async function release(options) {
  const { pkg } = options
  const { parsePackage } = await import('../utils/index.js')
  const spinner = createSpinner(`version ${parsePackage(pkg).version} releasing...`, { color: 'green' }).start()
  const toPkg = toPackageJson(pkg)
  try {
    const start = Date.now()
    if (!pkg) throw new Error('Requires pkg parameter, optional value: components | utils | visual-development')
    const cwd = process.cwd()
    const dir = path.resolve(cwd, `packages/${pkg}`)
    await $`pnpm --dir ${dir} release --registry=https://registry.npmjs.org/`
    const end = Date.now()
    spinner.success({ text: `release done in ${(end - start) / 1000}s` })
  } catch (error) {
    spinner.error({ text: 'release failed' })
    consola.error(error)
  }
  toPkg.revert()
}

function toPackageJson(pkgName) {
  try {
    const pkgPath = path.resolve(process.cwd(), `packages/${pkgName}/package.json`)
    const storePackage = readFileSync(pkgPath)
    const parsePackage = JSON.parse(readFileSync(pkgPath))
    parsePackage.main = 'dist/index.umd.cjs'
    parsePackage.module = 'dist/index.js'
    parsePackage.types = 'dist/types/index.d.ts'
    writeFileSync(pkgPath, JSON.stringify(parsePackage, null, 2))
    return {
      revert: () => {
        writeFileSync(pkgPath, storePackage)
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}
