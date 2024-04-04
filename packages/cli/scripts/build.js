import { $ } from 'execa'
import { consola } from 'consola'
import { createSpinner } from 'nanospinner'
import { build } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'

export async function buildTask(options) {
  try {
    const { pkg } = options
    if (!pkg) throw new Error('Requires pkg parameter, optional value: components | utils | visual-development')
    switch (pkg) {
      case 'components':
      case 'visual-development': {
        const { typeEmit } = await import('./type-emit.js')
        if (!(await typeEmit(options))) return
        const { buildOnly } = await import('./build-only.js')
        await buildOnly(options)
        break
      }
      case 'utils': {
        await $`tsc --project tsconfig.${pkg}.json`
        break
      }
    }
    return true
  } catch (error) {
    consola.error(error)
  }
}
