import { Command } from 'commander'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const program = new Command()

program
  .name('vswift')
  .option('-v, --version', 'display version for vswift')
  .action(async options => {
    const { version } = options
    if (version) {
      const pkgPath = fileURLToPath(new URL('../package.json', import.meta.url))
      const pkg = JSON.parse(readFileSync(pkgPath))
      console.log(pkg.version)
    }
  })

program
  .command('type-check')
  .description('type checking')
  .option(
    '-p, --pkg <name>',
    'package name to perform type checking, optional value: components | utils | visual-development',
  )
  .action(async options => {
    const { typeCheck } = await import('./type-check.js')
    return typeCheck(options)
  })

program
  .command('type-emit')
  .description('type emitting')
  .option(
    '-p, --pkg <name>',
    'package name to perform type emitting, optional value: components | utils | visual-development',
  )
  .action(async options => {
    const { typeEmit } = await import('./type-emit.js')
    return typeEmit(options)
  })

program.parse(process.argv)
