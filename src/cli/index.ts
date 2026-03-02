#!/usr/bin/env node
import process from 'node:process'

import { defineCommand, runMain } from 'citty'
import consola from 'consola'
import { addDevDependency } from 'nypm'

import pkgJson from '../../package.json' with { type: 'json' }
import {
  addScriptsToPackageJson,
  createOrOverwriteOxlintConfigFile,
  createOxfmtConfig,
  findClosestPackageJsonDir,
  oxfmtConfigExists,
  setupVSCodeSettings,
} from './utils'

const main = defineCommand({
  meta: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
  },
  args: {},
  run: async () => {
    const projectDir = await findClosestPackageJsonDir()
    if (!projectDir) {
      consola.error(
        'Could not find a package.json in this or any parent directory. Please run this command inside a project.',
      )
      return
    }

    consola.start('Setting up @schplitt/oxlint-config…')

    await addDevDependency(['oxlint@latest', 'oxfmt@latest', `${pkgJson.name}@latest`], {
      cwd: projectDir,
      silent: true,
    })

    createOrOverwriteOxlintConfigFile(projectDir)
    addScriptsToPackageJson(projectDir)

    // oxfmt config
    if (oxfmtConfigExists(projectDir)) {
      const overwrite = await consola.prompt('An .oxfmtrc.json already exists. Overwrite it?', {
        type: 'confirm',
        cancel: 'reject',
      })
      if (overwrite) createOxfmtConfig(projectDir, true)
    } else {
      createOxfmtConfig(projectDir, false)
    }

    const wantsVSCode = await consola.prompt(
      'Do you want to set up VS Code settings for oxlint + oxfmt?',
      { type: 'confirm', cancel: 'reject' },
    )

    if (wantsVSCode) setupVSCodeSettings(projectDir)

    consola.success('oxlint-config has been successfully set up!')
  },
})

runMain(main).catch((error) => {
  console.error(error)
  process.exit(1)
})
