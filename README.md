# purge-svg

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?machine=basicLinux32gb&repo=411963580&ref=main)

![Package version](https://img.shields.io/github/package-json/v/Th3S4mur41/purge-svg)
![GitHub last commit](https://img.shields.io/github/last-commit/Th3S4mur41/purge-svg)
![Release](https://github.com/Th3S4mur41/purge-svg/actions/workflows/on_push.yml/badge.svg?branch=main)

This is a fork of [purge-svg from Media24si](https://github.com/Media24si/purge-svg) that is no longer seems to be actively maintained

## What is purge-svg

If you're using external SVG sprites for your icon system there is a good chance you have a lot of unused icons at the end.

purge-svg will analyze your content and remove all unused icons. This will make your SVG file a lot smaller.

It also enables you to merge more SVG files into one and thereby reducing network requests.

**:bangbang: Warning :bangbang:️**

Be aware that external SVG sprites are not supported in any version of IE. If you need support for IE check out [svg4everybody](https://github.com/jonathantneal/svg4everybody).

**:heart: Gratitude :heart:**

This package was inspired (and some code copied) from [Purgecss](https://github.com/FullHuman/purgecss) and forked from [PurgeSvg](https://github.com/Media24si/purge-svg) which is no longer maintained

## Usage

### CLI

Start by installing the package globally

```bash
npm i -g @th3s4mur41/purge-svg
```

purge-svg is available via a CLI. You can use the CLI by itself or with a configuration file.

To see the available options for the CLI: `purge-svg --help`

```bash
purge-svg --content <content> --svgs <svgs> [option]

Options:
  -c, --config     configuration file                                   [string]
  -o, --out        Filepath directory to write purified svg files to    [string]
  -w, --whitelist  List of id's that should not be removed [array] [default: []]
  -h, --help       Show help                                           [boolean]
  -v, --version    Show version number                                 [boolean]
```

#### Using configuration file

```bash
purge-svg --config /path/to/config.js
```

#### Options

:heavy_check_mark: When not using a configuration file the `--content` and `--svgs` options are required.

- ##### --content

Content that should be analyzed. An array of filenames or glob.

`purge-svg --content index.html /resource/assets/**/*.vue --svgs ...`

- ##### --svgs

SVG files to purge. An array of filenames or glob.

`purge-svg --content index.html --svgs /images/icons.svg /icons/solid.svg`

- ##### --out

Output path for purged SVGs.

The output path can be:

- a directory - the purged files will be placed in this folder with the same filename as the SVG
- a path to a file - all SVGs will be purged and merged into this file
- missing - if this option is missing the purged SVGs will be put beside the original file as `filename.purged.svg`

`purge-svg --content index.html --svgs /icons/*.svg --out /build/purged/icons.svg`

- ##### --whitelist

List of whitelist ids. Id's will be whitelisted for all SVG files.

`purge-svg --content index.html --svgs /icons/*.svg --whitelist rocket heart times`

### JavaScript

Start by installing the package as a development dependency

```bash
npm i --save-dev purge-svg
```

You can use purge-svg in your javascript file. Just require the package, create the new PurgeSvg class, add configuration options and call the purge method.

The constructor accepts a configuration object or a path to the configuration file.

```javascript
const PurgeSvg = require('purge-svg');

new PurgeSvg({
	content: './__tests__/test_examples/clean_svgs/index.html',
	svgs: [
		{
			in: './__tests__/test_examples/clean_svgs/icons.svg',
			out: tempFolder
		}
	],
	whitelist: { '*': ['building'] }
}).purge();
```

### WebPack

:wrench: TODO :hammer:

## Configuration

### Options

- #### content

Content that should be analyzed. The content option is an array of files or [globs](https://github.com/isaacs/node-glob/blob/master/README.md#glob-primer).

```javascript
new PurgeSvg({
    content: ['index.html', `**/*.js`, '**/*.html', '**/*.vue'],
    ...
}
```

- #### SVGs

A list of SVG files that should be purged and their output configuration. The list could be an array of files/globs or an array of objects.

When provided as an array of strings (files/globs) the purged file will be saved in the same folder as the original as `filename.purged.svg`.

```javascript
new PurgeSvg({
    svgs: ['images/icons.svg'], // purged file will be saved in 'images/icons.purged.svg'
    ...
}
```

Providing an array of objects enables more versatility. Some examples of different options:

```javascript
new PurgeSvg({
    svgs: [
        // purged file will be saved in 'build/images/icons.svg'
        {
            in: 'images/icons.svg', // full path
            out: 'build/images' // only folder
        },

        // purged AND MERGED files will be saved in 'build/images/merged.svg'
        {
            in: 'icons/*.svg', // glob
            out: 'build/images/merged.svg' // full path
        }
    ],
    ...
}
```

- #### whitelist

Provides the option to whitelist ids of SVG sprites. The option can be used to whitelist ids for all files or only for specific SVG files.

```javascript
new PurgeSvg({
    whitelist: {
        '*': new Set(['rocket', 'heart', ...]), // whitelist id's for all files
        'solid.svg': new Set(['building', 'times', ...]) // whitelist id's only for a specific file
    },
    ...
}
```

### Configuration file

The configuration file is a simple JavaScript file containing options:

```javascript
module.exports = {
	content: ['index.html'],
	svgs: [
		{
			in: 'images/*.svg'
		}
	],
	whitelist: {
		'*': new Set(['rocket', 'building'])
	}
};
```
