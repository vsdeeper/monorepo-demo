import { $ } from 'execa'
import { createSpinner } from 'nanospinner'
import { consola } from 'consola'
import path from 'path'

export async function release(options) {
  const { pkg } = options
  const { parsePackage } = await import('../utils/index.js')
  const spinner = createSpinner(`version ${parsePackage(pkg).version} releasing...`, { color: 'green' }).start()
  try {
    const start = Date.now()
    if (!pkg) throw new Error('Requires pkg parameter, optional value: components | utils | visual-development')
    const cwd = process.cwd()
    const dir = path.resolve(cwd, `packages/${pkg}`)
    await $`pnpm --dir ${dir} release --registry=https://registry.npmjs.org/`
    const end = Date.now()
    spinner.success({ text: `release done in ${(end - start) / 1000}s` })
    return true
  } catch (error) {
    spinner.error({ text: 'release failed' })
    consola.error(error)
  }
}
