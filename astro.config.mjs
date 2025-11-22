// @ts-check
import { defineConfig } from 'astro/config';
import htmlBeautifier from "astro-html-beautifier";

// https://astro.build/config
export default defineConfig({
	compressHTML: false,
	trailingSlash: 'never',
	build: {
		inlineStylesheets: 'never',
		format: 'preserve',
		assets: 'assets'
	},
	integrations: import.meta.env.PROD ? [
		htmlBeautifier({ inline: [] })
	] : []
});
