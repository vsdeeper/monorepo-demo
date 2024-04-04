import { $ } from 'execa'
import { consola } from 'consola'
import { build } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'

export async function buildOnly(options) {
  try {
    const { pkg } = options
    if (!pkg) throw new Error('Requires pkg parameter, optional value: components | utils | visual-development')
    switch (pkg) {
      case 'components':
      case 'visual-development': {
        await build({
          root: path.resolve(process.cwd(), `./packages/${pkg}`),
          plugins: [vue()],
          build: {
            emptyOutDir: false,
            lib: {
              entry: `index.ts`,
              name: `vswift-${pkg}`,
              fileName: 'index',
            },
            rollupOptions: {
              // 确保外部化处理那些你不想打包进库的依赖
              external: ['vue'],
              output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                  vue: 'Vue',
                },
              },
            },
          },
        })
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
