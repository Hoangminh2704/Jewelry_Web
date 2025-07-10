import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

function getEntriesFromDir(dirPath: string): Record<string, string> {
  return Object.fromEntries(
    fs
      .readdirSync(dirPath)
      .filter((name: string) =>
        fs.statSync(path.join(dirPath, name)).isDirectory()
      )
      .filter((name: string) => {
        const tsFilePath: string = path.join(dirPath, name, `${name}.ts`);
        return fs.existsSync(tsFilePath);
      })
      .map((name: string): [string, string] => [
        name,
        path.join(dirPath, name, `${name}.ts`),
      ])
  );
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: getEntriesFromDir(path.resolve(__dirname, "src/Components")),
      output: { entryFileNames: "[name]/[name].[format].js" },
    },
  },
});
