import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
function getEntriesFromDir(dirPath: string): Record<string, string> {
  return Object.fromEntries(
    fs
      .readdirSync(dirPath)
      .filter((name) => fs.statSync(path.join(dirPath, name)).isDirectory())
      .map((name) => [name, path.join(dirPath, name, `${name}.ts`)])
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
// vite.config.ts

// vite.config.ts

// import { defineConfig } from "vite";
// import path from "path";
// import fs from "fs";

// // --- Hàm helper được nâng cấp để kiểm tra file .html có tồn tại không ---
// function getHtmlEntries(dir: string): Record<string, string> {
//   const componentDirs = fs
//     .readdirSync(dir)
//     .filter((name) => fs.statSync(path.join(dir, name)).isDirectory());

//   const entries: Record<string, string> = {};
//   for (const name of componentDirs) {
//     const htmlFilePath = path.resolve(dir, name, `${name}.html`);

//     // NÂNG CẤP: Chỉ thêm vào danh sách build nếu file .html thực sự tồn tại
//     if (fs.existsSync(htmlFilePath)) {
//       entries[name] = htmlFilePath;
//     }
//   }
//   return entries;
// }

// const componentEntries = getHtmlEntries(
//   path.resolve(__dirname, "src/Components")
// );

// // --- Cấu hình Vite ---
// export default defineConfig({
//   root: "src/Components",
//   build: {
//     // FIX 1: Thêm emptyOutDir để tắt cảnh báo và dọn dẹp thư mục dist
//     emptyOutDir: true,
//     outDir: "../../dist",
//     rollupOptions: {
//       input: componentEntries,
//     },
//   },
// });
