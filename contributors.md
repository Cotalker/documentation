# How to contribute — Release V3.0

#### Keep it simple, stupid
https://en.wikipedia.org/wiki/KISS_principle

#### Our audience
We are writing for a technical audience. 
Admin sections may have only general computer-related knowledge,

#### Iterative over perfection
Small and incremental updates are preferred over large great changes. 

#### First version of the documentation will be written in English
Why English? Our first version must be (also) available for the US market. 
It will be then translated into Spanish.

Grammarly is a GREAT tool for writing in English, it checks semantic and syntax.

#### Make changes in branches named _feature/name_ 
Send PRs to: 
Branch: development 
Reviewer: acedward 

Prefer multiple small Pull Requests vs one large one. 
Please run `npm run build` to perform all checks before submitting. 

#### If a term (or meaning) is "created" by Cotalker it must be added to the Glossary
E.g., "Group" must be added to the glossary.

#### Try linking to other sections when knowledge is implied
Users will not read the documentation in order: let's help them navigate.

#### Images over text
Images are easier to understand and faster consumed.

#### Technical documentation
Please add, real-world, working samples. 
To keep them up to date please add the script with the same __id__ in the samples' folder. 
These examples should use the __cotalker-api__ 

#### Keywords: MUST, SHOULD, MAY 
Must be used with precision. 
https://tools.ietf.org/html/rfc2119

#### Follow patterns 
Some files will be the standard for sections and as examples:  
__Api__: /docs/documentation/api/users/users.md  
__Admin__: /docs/documentation/admin/users.md  
You can improve these standards as well!  

#### To-dos
Mark TODOS with caps, so they are easier to find.

#### Markdown is king
Markdown should be used to document, many times [docusaurus 2](https://v2.docusaurus.io/) notations are required.  
Also, React and HTML are valid, but not encouraged. So   
  
#### Caveats
Docusaurus may require some "tricks" because the parser behaves unpredictably, e.g., after an HTML image tag an empty line is required  to correctly parse a link in the next line. Please look at he provided examples.

#### Questions?
Let's make this readme better together.

# What to check when before submitting a change
*  Sections & hierarchy (Avoid using single \#)
*  Grammar & spell checking
*  Completeness & simplicity
*  Consistent with other pages
*  Remove duplicated explanations - Instead, add links
*  Folder path matches sidebar path
*  File name same as id (remove id from file-header)
*  Code examples work
*  UI examples up to date
*  Images exist when UI named
*  All terms added and referenced in the glossary
*  Avoid non-markdown (if possible)
*  Check if images do not overlap texts or menus in smaller screens
*  Images may not show sensitive information
*  Check web-browser console for errors
*  Update the roadmap file

# Language & translations

Every page ships in **English and Spanish together, in the same PR**. English is the source of truth; the Spanish mirror lives under `i18n/es/docusaurus-plugin-content-docs/current/...` at the same relative path.

#### Structural parity is 1:1
The Spanish page MUST mirror the English one heading for heading, in the same order: same sections, same nesting. A reader switching locale should land on the same content. Do NOT translate a page half-way and leave the rest in English.

#### Spanish register: neutral LATAM, tú / impersonal
New or rewritten Spanish content MUST use **neutral Latin-American Spanish** in the **tú / impersonal** register (`escribe`, `valida`, `puedes`) — never voseo (`escribí`, `validá`, `podés`). Prefer plain Spanish over unnecessary anglicisms: use `predeterminado`, not `default`, in prose.

Legacy pages still written in voseo are migrated **only when the page itself is reworked** — don't open a PR just to flip the register. But once you touch a page substantively, bring the whole page to tú so it reads consistently.

#### New pages: generate the stub, then translate in the same PR
When you add a brand-new English page, run `npm run create-translations` (see **Quick Start** below). It copies any un-mirrored English file into `i18n/es/...` and prepends a "not yet translated" warning callout. That stub is a **build safety net only**, not a deliverable — replace it with the real Spanish translation in the same PR. A page whose Spanish side is still the auto-generated stub is not done.

#### The `es` locale is not published yet — parity still applies
The Spanish locale exists under `i18n/es/` but is not currently served (the `i18n` block in `docusaurus.config.js` is commented out). This does NOT relax the parity rule: keep English and Spanish in lockstep so the locale can be switched on at any time without a translation backlog.

# Quick Start

__Install dependencies__  
```
npm ci
```
__Local Development__  
Local server with incremental compilation  
```
npm run start
```  

__Production Build__  
Generates /build folder
```
npm run build
```

## Missing Translation Warning
Compares files in the `i18n` folder with the English version. Files not mirrored in i18n are copied to the corresponding folders, and a warning at the top of each page is added.
```
npm run create-translations
```
_note: `npm install zx` might be required._