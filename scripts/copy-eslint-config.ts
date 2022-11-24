import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';

export function copyEslintConfig() {
  const targetFolder = 'dist/eslint-config-ng';
  rmSync(targetFolder, { recursive: true });
  mkdirSync(targetFolder);

  const srcFolder = 'projects/eslint-config-ng';
  for (const file of readdirSync(srcFolder)) {
    copyFileSync(join(srcFolder, file), join(targetFolder, file));
  }
}
