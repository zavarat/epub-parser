# @ridi/epub-parser

> Common EPUB2 data parser for Ridibooks services written in ES6

[![npm version](https://badge.fury.io/js/%40ridi%2Fepub-parser.svg)](https://badge.fury.io/js/%40ridi%2Fepub-parser)
[![Build Status](https://travis-ci.org/ridi/epub-parser.svg?branch=master)](https://travis-ci.org/ridi/epub-parser)
[![codecov](https://codecov.io/gh/ridi/epub-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/ridi/epub-parser)

## Features

- Detailed parsing for EPUB2
- Supports package validation, decompression and style extraction with various parsing options
- Extract files within EPUB with various reading options

## TODO

- [ ] Add encryption and decryption function
- [ ] Add `readOptions.spine.serializedAnchor` option
- [ ] Add `readOptions.spine.truncate` and `readOption.spine.truncateMaxLength` options
- [ ] Add `readOptions.spine.minify` and `readOptions.css.minify` options
- [ ] Add `readOptions.removeExternalRefs` option
- [ ] Support for EPUB3
- [ ] Support for CLI
- [ ] Support for other [OCF](http://www.idpf.org/doc_library/epub/OCF_2.0.1_draft.doc) spec (manifest.xml, metadata.xml, signatures.xml, encryption.xml, etc)

## Install

```bash
npm install @ridi/epub-parser
```

## Usage

```js
import { EpubParser } from '@ridi/epub-parser';
// or const { EpubParser } = require('@ridi/epub-parser');

const parser = new EpubParser('./foo/bar.epub' or './unzippedPath');
parser.parse().then((book) => {
  parser.readItems(book.spines).then((results) => {
    ...
  });
  ...
});
```

## API

### parse(parseOptions)

Returns `Promise<Book>` with:

- [Book](#book): Instance with metadata, spine list, table of contents, etc.

Or throw exception.

#### [parseOptions](#parseOptions): `?object`

---

### readItem(item, readOptions)

Returns `string` or `Buffer` in `Promise` with:

- [SpineItem](#spineItem), [CssItem](#cssItem), [InlineCssItem](#inlineCssItem), [NcxItem](#ncxItem), [SvgItem](#svgItem):

  - `string`

- Other items:

  - `Buffer`

or throw exception.

#### item: `Item` (see: [Item Types](#itemTypes))

#### [readOptions](#readOptions): `?object`

---

### readItems(items, readOptions)

Returns `string[]` or `Buffer[]` in `Promise` with:

- [SpineItem](#spineItem), [CssItem](#cssItem), [InlineCssItem](#inlineCssItem), [NcxItem](#ncxItem), [SvgItem](#svgItem):

  - `string[]`

- Other items:

  - `Buffer[]`

or throw exception.

#### items: `Item[]` (see: [Item Types](#itemTypes))

#### [readOptions](#readOptions): `?object`

## Model

<a id="book"></a>

### [Book](./src/model/Book.js)

- titles: *string[]*
- creators: *[Author](#author)[]*
- subjects: *string[]*
- description: *?string*
- publisher: *?string*
- contributors: *[Author](#author)[]*
- dates: *[DateTime](#dateTime)[]*
- type: *?string*
- format: *?string*
- identifiers: *[Identifier](#identifier)[]*
- source: *?string*
- language: *?string*
- relation: *?string*
- rights: *?string*
- version: *[Version](#version)*
- metas: *[Meta](#meta)[]*
- items: *[Item](#item)[]*
- ncx: *[NcxItem](#ncxItem)*
- spines: *[SpintItem](#spineItem)[]*
- fonts: *[FontItem](#fontItem)[]*
- cover: *?[ImageItem](#imageItem)*
- images: *[ImageItem](#imageItem)[]*
- styles: *[CssItem](#cssItem)[]*
- guides: *[Guide](#Guide)[]*
- deadItems: *[DeadItem](#deadItem)[]*

<a id="author"></a>

### [Author](./src/model/Author.js)

- name: *?string*
- role: *string* (**Default: Author.Roles.UNDEFINED**)

<a id="dateTime"></a>

### [DateTime](./src/model/DateTime.js)

- value: *?string*
- event: *string* (**Default: DateTime.Events.UNDEFINED**)

<a id="identifier"></a>

### [Identifier](./src/model/Identifier.js)

- value: *?string*
- scheme: *string* (**Default: Identifier.Schemes.UNDEFINED**)

<a id="meta"></a>

### [Meta](./src/model/Meta.js)

- name: *?string*
- content: *?string*

<a id="guide"></a>

### [Guide](./src/model/Guide.js)

- title: *?string*
- type: *string* (**Default: Guide.Types.UNDEFINED**)
- href: *?string*
- item: *?[Item](#item)*

<a id="itemTypes"></a>

### Item Types

<a id="item"></a>

#### [Item](./src/model/Item.js)

- id: *?id*
- href: *?string*
- mediaType: *?string*
- size: *?number*
- isFileExists: *boolean* (**size !== undefined**)

<a id="ncxItem"></a>

#### [NcxItem](./src/model/NcxItem.js) (extend [Item](#item))

- navPoints: *[NavPoint](#navPoint)[]*

<a id="spineItem"></a>

#### [SpineItem](./src/model/SpineItem.js) (extend [Item](#item))

- spineIndex: *number* (**Default: -1**)
- isLinear: *boolean* (**Default: true**)
- styles: *?[CssItem](#cssItem)[]*

<a id="cssItem"></a>

#### [CssItem](./src/model/CssItem.js) (extend [Item](#item))
- namespace: *string*

<a id="inlineCssItem"></a>

#### [InlineCssItem](./src/model/InlineCssItem.js) (extend [CssItem](#cssItem))
- text: *string* (**Default: ''**)

<a id="imageItem"></a>

#### [ImageItem](./src/model/ImageItem.js) (extend [Item](#item))
- isCover: *boolean* (**Default: false**)

<a id="svgItem"></a>

#### [SvgItem](./src/model/SvgItem.js) (extend [ImageItem](#imageItem))

<a id="fontItem"></a>

#### [FontItem](./src/model/FontItem.js) (extend [Item](#item))

<a id="deadItem"></a>

#### [DeadItem](./src/model/DeadItem.js) (extend [Item](#item))
- reason: *string* (**Default: DeadItem.Reason.UNDEFINED**)

<a id="navPoint"></a>

### [NavPoint](./src/model/NavPoint.js)

- id: *?string*
- label: *?string*
- src: *?string*
- anchor: *?string*
- depth: *number* (**Default: 0**)
- children: *NavPoint[]*
- spine: *?[SpineItem](#spineItem)*

<a id="version"></a>

### [Version](./src/model/Version.js)

- major: *number*
- minor: *number*
- patch: *number*
- isValid: *boolean* (**Only 2.x.x is valid because current epub-parser only supports EPUB2.**)
- toString(): *string*

<a id="parseOptions"></a>

## Parse Options

* [validatePackage](#validatePackage)
* [validateXml](#validateXml)
* [allowNcxFileMissing](#allowNcxFileMissing)
* [unzipPath](#unzipPath)
* [overwrite](#overwrite)
* [ignoreLinear](#ignoreLinear)
* [useStyleNamespace](#useStyleNamespace)
* [styleNamespacePrefix](#styleNamespacePrefix)

---

<a id="validatePackage"></a>

### validatePackage: *`boolean`*

If true, validation package specifications in [IDPF listed](http://www.idpf.org/doc_library/epub/OCF_2.0.1_draft.doc) below.
- Zip header should not corrupt.
- `mimetype` file must be first file in archive.
- `mimetype` file should not compressed.
- `mimetype` file should only contain string `application/epub+zip`.
- Should not use extra field feature of ZIP format for mimetype file.

**Default:** `false`

---

<a id="validateXml"></a>

### validateXml: *`boolean`*

If true, stop parsing when XML parsing errors occur.

**Default:** `false`

---

<a id="allowNcxFileMissing"></a>

### allowNcxFileMissing: *`boolean`*

If false, stop parsing when NCX file not exists.

**Default:** `true`

---

<a id="unzipPath"></a>

### unzipPath: *`?string`*

If specified, uncompress to that path.
> Only if input is EPUB file.

**Default:** `undefined`

---

<a id="overwrite"></a>

### overwrite: *`boolean`*

If true, overwrite to [unzipPath](#unzipPath) when uncompress.

**Default:** `true`

---

<a id="ignoreLinear"></a>

### ignoreLinear: *`boolean`*

If true, ignore `spineIndex` difference caused by `isLinear` property of [SpineItem](#spineItem).

```js
// e.g. If left is false, right is true.
[{ spineIndex: 0, isLinear: true, ... },       [{ spineIndex: 0, isLinear: true, ... },
{ spineIndex: 1, isLinear: true, ... },        { spineIndex: 1, isLinear: true, ... },
{ spineIndex: -1, isLinear: false, ... },      { spineIndex: 2, isLinear: false, ... },
{ spineIndex: 2, isLinear: true, ... }]        { spineIndex: 3, isLinear: true, ... }]
```

**Default:** `true`

---

<a id="useStyleNamespace"></a>

### useStyleNamespace: *`boolean`*

If true, One namespace is given per CSS file or inline style, and styles used for spine is described.

Otherwise it [CssItem](#cssItem)`.namespace`, [SpineItem](#spineItem)`.styles` is `undefined`.

In any list, [InlineCssItem](#inlineCssItem) is always positioned after [CssItem](#CssItem). ([Book](#book)`.styles`, [Book](#book)`.items`, [SpineItem](#spineItem)`.styles`, ...)

**Default:** `false`

---

<a id="styleNamespacePrefix"></a>

### styleNamespacePrefix: *`string`*

Prepend given string to namespace for identification.

**Default:** `'ridi_style'`

---

<a id="readOptions"></a>

## Read Options

* [basePath](#basePath)
* [spine.extractBody](#spine_extractBody)
* [spine.useCssOptions](#spine_useCssOptions)
* [css.removeAtrules](#css_removeAtrules)
* [css.removeTags](#css_removeTags)
* [css.removeIds](#css_removeIds)
* [css.removeClasses](#css_removeClasses)

---

<a id="basePath"></a>

### basePath: *`?string`*

If specified, change base path of paths used by spine and css.

HTML: [SpineItem](#spineItem)

```html
...
  <!-- Before -->
  <div>
    <img src="../Images/cover.jpg">
  </div>
  <!-- After -->
  <div>
    <img src="{basePath}/OEBPS/Images/cover.jpg">
  </div>
...
```

CSS: [CssItem](#cssItem), [InlineCssItem](#inlineCssItem)

```css
/* Before */
@font-face {
  font-family: NotoSansRegular;
  src: url("../Fonts/NotoSans-Regular.ttf");
}
/* After */
@font-face {
  font-family: NotoSansRegular;
  src: url("{basePath}/OEBPS/Fonts/NotoSans-Regular.ttf");
}
```

**Default:** `undefined`

---

<a id="spine_extractBody"></a>

### spine.extractBody: *`boolean`*

If true, extract body. Otherwise it returns a full string.
If specify a function instead of true, use function to transform body.

false:

```js
'<!doctype><html>\n<head>\n</head>\n<body style="background-color: #000000;">\n  <p>Extract style</p>\n  <img src=\"../Images/api-map.jpg\"/>\n</body>\n</html>'
```

true:

```js
'<body style="background-color: #000000;">\n  <p>Extract style</p>\n  <img src=\"../Images/api-map.jpg\"/>\n</body>'
```

function:

```js
readOptions.spine.extractBody = (innerHTML, attrs) => {
  const string = attrs.map((attr) => {
    return ` ${attr.key}=\"${attr.value}\"`;
  }).join(' ');
  return `<article ${string}>${innerHTML}</article>`;
};
```
```js
'<article style="background-color: #000000;">\n  <p>Extract style</p>\n  <img src=\"../Images/api-map.jpg\"/>\n</article>'
```

**Default:** `false`

---

<a id="spine_useCssOptions"></a>

### spine.useCssOptions: *`boolean`*

If true, applies readOptions.css to inline styles and style attributes.

**Default:** `false`

---

<a id="css_removeAtrules"></a>

### css.removeAtrules: *`string[]`*

Remove at-rules.

**Default:** `[]`

---

<a id="css_removeTags"></a>

### css.removeTags: *`string[]`*

Remove selector that point to specified tags.

**Default:** `[]`

---

<a id="css_removeIds"></a>

### css.removeIds: *`string[]`*

Remove selector that point to specified ids.

**Default:** `[]`

---

<a id="css_removeClasses"></a>

### css.removeClasses: *`string[]`*

Remove selector that point to specified classes.

**Default:** `[]`

---
