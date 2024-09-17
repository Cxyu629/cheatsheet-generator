import { createSignal } from "solid-js";
import showdown from "showdown";
import DOMPurify from "isomorphic-dompurify";
import katex from "katex";

type SectionData = {
  title: string;
  content: string;
};

let [data, setData] = createSignal<SectionData[]>([]);

function parseDom(dom: HTMLElement) {
  let children = [...dom.childNodes.values()].filter(
    (child) => child.nodeType === 1
  );
  let sectioned_doms = [];
  children = children.slice(
    children.findIndex(
      (child) => child.nodeName === "H1" || child.nodeName === "H2"
    )
  );
  let n = 0;
  while (children.length !== 0 && n < 100) {
    let nextHeaderIndex = children
      .slice(1)
      .findIndex((child) => child.nodeName === "H1" || child.nodeName === "H2");
    let sectioned_dom = children.splice(
      0,
      nextHeaderIndex > 0 ? nextHeaderIndex + 1 : children.length
    );
    sectioned_doms.push({
      title: (sectioned_dom[0] as HTMLElement).innerHTML,
      content: sectioned_dom
        .slice(1)
        .map((node) => (node as HTMLElement).outerHTML)
        .reduce((acc, e) => acc + e),
    });
    n++;
  }
  return sectioned_doms;
}

function setDataFromMdFile(fileContents: string) {
  showdown.setOption("strikethrough", true);
  showdown.setOption("tables", true);
  const converter = new showdown.Converter();

  const html = DOMPurify.sanitize(converter.makeHtml(fileContents));
  const htmlDOM = new DOMParser().parseFromString(html, "text/html").body;

  let latexBlock;
  while ((latexBlock = htmlDOM.querySelector("pre>code.latex")) !== null) {
    let text;
    if ((text = latexBlock.textContent) !== null) {
      katex.render(text, latexBlock.parentElement!, { displayMode: true });
    }
  }

  htmlDOM.querySelectorAll("code").forEach((element) => {
    if (
      element.innerText.length > 2 &&
      element.innerText.startsWith("$") &&
      element.innerText.endsWith("$")
    ) {
      katex.render(element.innerText.slice(1, -1), element);
    }
  });

  setData([...parseDom(htmlDOM)]);
}

import mockData from "./assets/testfiles/lorem_ipsum.md?raw";

setDataFromMdFile(mockData);

export { data, setDataFromMdFile };
