import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{chunkSizeWarningLimit:650},server:{host:'0.0.0.0',allowedHosts:['terminal.local']}});
