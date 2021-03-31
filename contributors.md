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

# Roadmap

https://docs.google.com/spreadsheets/d/18UU7wzw8iuxriBWZaeLa_2I7P-KgCMYMWwNsYyDiowk/edit?usp=sharing

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
