## HTML Pageframe &hairsp; <a href="https://rapidjs.org" target="_blank"><img src="https://rapidjs.org/assets/img/plugin-badge.svg" alt="rJS Plugin"></a>

Consistent web pages through a wrapping HTML frame.

### Install

``` console
npm i rapidjs-org/plugin--pageframe
```

<sub><code>__rjs.plugin.json</code></sub>
``` json
{
  "package": "@plugins.rapidjs.org/pageframe"
}
```

### Use

Any file in the `/pages` directory is wrapped by the global `_frame.html` markup. The mapping to the public directory happens at root level (i.e., `pages/page.html` → `/page`). For each source page HTML, the contents of the `<head>` tag is appended to the global head. Same holds for the `<main>` tag. If no according tags are in a source page, however, the contents are directly written to the global main.

```
└─ /src …
   └─ /html
      ├─ __rjs.plugin.json
      ├─ _frame.html
      └─ /pages
         ├─ index.html
         └─ /legal
            ├─ contact.html
            └─ terms.html
```

<sub><code>src/html/_frame.html</code></sub>

``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <!-- DYNAMIC -->
    </head>
    <body>
        <header>
            <h1>Example</h1>
        </header>
        
        <main>
            <span>This is static</span>
            <!-- DYNAMIC -->
        </main>
        
        <footer>
            <a href="/legal/contact">Contact</a>
            <a href="/legal/terms">Terms</a>
        </footer>
    </body>
</html>
```

<sub><code>src/html/pages/index.html</code></sub>

``` html
<head>
  <title>Home</title>
  <link rel="stylesheet" href="/css/index.css">
</head>

<main>
  <h2>Home</h2>
</main>
```

<sub>→ <code>/</code></sub> 

``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Home</title>
        <link rel="stylesheet" href="/css/index.css">
    </head>
    <body>
        <header>
            <h1>Example</h1>
        </header>
        <main>
            <span>This is static</span>
            <h2>Home</h2>
        </main>
        <footer>
            <a href="/legal/contact">Contact</a>
            <a href="/legal/terms">Terms</a>
        </footer>
    </body>
</html>
```

<sub><code>src/html/pages/legal/conctact.html</code> → <code>/legal/contact</code></sub> 

``` html
<head>
  <title>Contact – Legal</title>
  <link rel="stylesheet" href="/css/legal.css">
</head>

<h2>Contact</h2>
```

##

<sub>&copy; Thassilo Martin Schiepanski</sub>