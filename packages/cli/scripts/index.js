import { Command } from 'commander'

const program = new Command()

program
  .command('type-check')
  .description('type checking')
  .option('-p, --pkg <name>', 'Package name to perform type checking, optional value: components | utils | visual-development')
  .action(async (options) => {
    const { typeCheck } = await import('./type-check.js')
    return typeCheck(options)
  })

program.parse(process.argv)
