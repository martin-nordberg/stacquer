import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
})



// export default defineConfig({
//     resolve: {
//         alias: {
//             "$shared": path.resolve(__dirname, "../llignette-shared/src"),
//         },
//     },
//     plugins: [solidPlugin()],
//     server: {
//         port: 3000,
//     },
//     build: {
//         target: 'esnext',
//     },
// });
