import clsx from "clsx";
import { Accessor, createSignal, onMount, Setter } from "solid-js";
import { Portal } from "solid-js/web";
import { setDataFromMdFile } from "./data";
import InfoIcon from "./assets/info_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import lorem_ipsum_md from "./assets/testfiles/lorem_ipsum.md?raw";
import test_md from "./assets/testfiles/test.md?raw";

type MenuProps = {
  rect: Accessor<{ height: number; width: number }>;
  numCols: Accessor<number>;
  setNumCols: Setter<number>;
};

function Menu(props: MenuProps) {
  let fileInput: HTMLInputElement;
  const [showInfo, setShowInfo] = createSignal<boolean>(false);
  const [showMenu, setShowMenu] = createSignal<boolean>(true);

  onMount(() => {
    setDataFromMdFile(test_md);
    fileInput.addEventListener("change", () => {
      if (fileInput.files !== null && fileInput.files.length === 1) {
        const file = fileInput.files[0];
        file.text().then((value) => {
          setDataFromMdFile(value);
        });
      }
    });
  });

  return (
    <Portal>
      <div class="menu fixed top-0 left-0 h-max w-1/4">
        <div
          class={clsx(
            "absolute select-none top-2 left-2 backdrop-blur-lg bg-amber-50 bg-opacity-100 active:bg-opacity-50 drop-shadow-lg rounded-full h-16 w-16 transition-all flex p-2",
            showMenu() ? "opacity-100" : "opacity-0 hover:opacity-100"
          )}
          onPointerEnter={() => setShowInfo(true)}
          onPointerLeave={() => setShowInfo(false)}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <img src={InfoIcon}></img>
        </div>
        <div
          class={clsx(
            "absolute top-2 left-20 backdrop-blur-lg bg-amber-50 bg-opacity-100 transition-all drop-shadow-lg rounded-2xl h-16 p-3 grid place-items-center",
            showInfo() && !showMenu() ? "opacity-100" : "opacity-0 hidden"
          )}
        >
          <p class="text-wrap">
            When printing, set zoom to{" "}
            {Math.round((1400 / props.rect().width) * 100)}
          </p>
        </div>
        <div
          class={clsx(
            "absolute top-2 left-20 backdrop-blur-lg bg-amber-50 bg-opacity-100 transition-all shadow-2xl rounded-2xl p-3 flex flex-col",
            showMenu() ? "opacity-100 h-min" : "opacity-0 hidden"
          )}
        >
          <p>
            When you're done reading the tutorial, click the info icon above to
            toggle this menu. Yes, this menu <em>will</em> be printed if it's
            not hidden.
          </p>
          <br />
          <span>
            <label>Set number of columns: </label>
            <input
              type="number"
              class="border"
              min="1"
              max="6"
              value={props.numCols()}
              onInput={(e) => props.setNumCols(parseInt(e.currentTarget.value))}
            ></input>
          </span>
          <span>
            <label>Your cheatsheet file: </label>
            <input ref={fileInput!} type="file" accept=".md" />
          </span>
          <span>Or select a demo file: </span>
          <span>
            <input
              onChange={(e) =>
                e.currentTarget.checked && setDataFromMdFile(lorem_ipsum_md)
              }
              type="radio"
              name="demo"
              value="lorem_ipsum.md"
            />{" "}
            <label>
              lorem_ipsum.md (
              <a
                class="underline text-blue-600 hover:text-blue-500 active:text-blue-700"
                href={lorem_ipsum_md}
                download="lorem_ipsum.md"
              >
                download
              </a>
              )
            </label>
          </span>
          <span>
            <input
              onChange={(e) =>
                e.currentTarget.checked && setDataFromMdFile(test_md)
              }
              type="radio"
              name="demo"
              checked
              value="test.md"
            />{" "}
            <label>
              test.md (
              <a
                class="underline text-blue-600 hover:text-blue-500 active:text-blue-700"
                href={test_md}
                download="test.md"
              >
                download
              </a>
              )
            </label>
          </span>
          <br />
          <div>
            <p class="text-2xl pb-1">Tutorial(?)</p>
            <p>
              Note: this is a personal project hacked together in an afternoon
              and is not meant to be useable or practical.
            </p>
            <p class="text-lg pt-3 pb-1">
              Step 1: Write your cheatsheet content in a .md file
            </p>
            <p>
              Sections are separated by heading 1 and heading 2 lines.{" "}
              <code>Codeblocks</code> and <code>inline code</code> should work,{" "}
              <em>italics</em>, <strong>bolding</strong>, and <del>strikethrough</del> ought to
              work.
            </p>
            <p class="text-lg pt-3 pb-1">Step 2: Upload that .md file</p>
            <p class="text-lg pt-3 pb-1">
              Step 3: Select your number of columns (1-6) to see what looks nice
            </p>
            <p>
              Fun fact: adjusting the webpage zoom and the window size affects
              the results too!
            </p>
            <p class="text-lg pt-3 pb-1">Step 4: Print this page</p>
            <p>
              Important: Set page size to A4 landscape, margins none, zoom to{" "}
              {Math.round((1400 / props.rect().width) * 100)}, and wish yourself
              good luck cuz I ain't tested this (works on chromium-based
              browsers as far as I know).
            </p>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Menu;
