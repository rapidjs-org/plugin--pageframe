import prettify from "html-prettify";


function findInsertIndex(html, tagName) {
    return Math.max(0, html.search(new RegExp(`</${tagName}(\\s[^>]*)?>`, "i")));
}

function matchTag(html, tagName) {
    return (
        html.match(
            new RegExp(`(?:<${tagName}(?:\\s[^>]*)?>)(((?!<\/${tagName}(?:\\s[^>]*)?>)(?:\\s|.))*)(?:<\/${tagName}(?:\\s[^>]*)?>)`, "i")
        ) ?? []
    )[1];
}

function injectHtml(targetHtml, injectionHtml, index) {
    return [
        targetHtml.slice(0, index),
        injectionHtml ?? "",
        targetHtml.slice(index)
    ].join("");
}


export default async function(rJS, filesystem) {
    const frameHtml = filesystem.get("_frame.html").contents;
    
    const files = [];
    filesystem
    .get("pages/")
    .traverse((file) => {
        const headHtml = matchTag(file.contents, "head");
        const mainHtml = matchTag(file.contents, "main")
                    ?? (headHtml
                        ? file.contents.split(/<\/head(\s[^>]*)?>/i)[2]
                        : file.contents
                    );
        
        let html = frameHtml;
        html = injectHtml(html, headHtml, findInsertIndex(html, "head"));
        html = injectHtml(html, mainHtml, findInsertIndex(html, "main"));
        files.push(
            new rJS.File(
                file.relativePath.replace(/^\.?\/?pages\//, ""),
                prettify(html)
            )
        );
    }, true);
    
    return files;
}