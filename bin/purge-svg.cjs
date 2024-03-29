#!/usr/bin/env node
/* eslint-disable no-undef */
const yargs = require("yargs");
const PurgeSVG = require("../src/index.cjs");

try {
	yargsBin = yargs
		.usage("$0 --content <content> --svgs <svgs> [option]")
		.option("content", {
			alias: "content",
			description: "glob of content files",
			type: "array",
		})
		.option("svgs", {
			alias: "svgs",
			description: "glob of svgs files",
			type: "array",
		})
		.option("c", {
			alias: "config",
			description: "configuration file",
			type: "string",
		})
		.option("o", {
			alias: "out",
			description: "Filepath directory to write purified svg files to",
			type: "string",
		})
		.option("w", {
			alias: "whitelist",
			description: "List of id's that should not be removed",
			type: "array",
			default: [],
		})
		.demandCommand(0)
		.help()
		.alias("h", "help")
		.version()
		.alias("v", "version");
	argv = yargs.argv;

	if (argv.config) {
		new PurgeSVG(argv.config).purge();
		throw new Error();
	}

	if (typeof argv.svgs === "undefined" || typeof argv.content === "undefined") {
		yargsBin.showHelp("log");
		throw new Error();
	}

	options = {
		content: argv.content,
		svgs: argv.svgs.map((path) => {
			const svgObj = {
				in: path,
			};

			if (typeof argv.out !== "undefined") {
				svgObj.out = argv.out;
			}

			return svgObj;
		}),
		whitelist: { "*": new Set(argv.whitelist) },
	};

	new PurgeSVG(options).purge();
} catch (err) {}
