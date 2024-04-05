# vswift

快捷开发的 monorepo 框架，主要包含 @vswift/cli, @vswift/components, @vswift/utils, visual-development 通用脚手架、组件、方法及可视化开发组件。

## 打包发布

- 运行 pnpm build <-p | --pkg> <components | visual-development | utils> 命令，打包选择的 package
- 运行 pnpm changeset 命令，填写基本信息
- 运行 pnpm changeset version 命令生成 changelog 信息（CHANGELOG.md）
- 运行 pnpm release <-p | --pkg> <components | visual-development | utils> 命令，发布选择的 package，也可切换到想要发布的 package 目录，运行 pnpm release 命令
