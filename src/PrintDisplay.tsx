import { Accessor, createEffect, createSignal, Index } from "solid-js";
import SectionCard from "./components/SectionCard";
import { createStore, unwrap } from "solid-js/store";
import clsx from "clsx";
import { data } from "./data";
import TitleCard from "./components/TitleCard";

type PrintDisplayProps = {
  numCols: Accessor<number>;
  rect: Accessor<{ height: number; width: number }>;
};

function PrintDisplay(props: PrintDisplayProps) {
  const [flip, setFlip] = createSignal<boolean>(false);
  const [breaks, setBreaks] = createSignal<number[]>([0]);

  const [refs, setRefs] = createStore<HTMLDivElement[]>(
    Array(data().length).fill(undefined)
  );

  const recalculate = () => {
    let temp_breaks = [0];
    const maxWidth = () => props.rect().width;
    let xs = unwrap(refs).map(
      (val) => val.offsetLeft + Math.floor(props.rect().width / props.numCols())
    );
    let currRemoved = 0;
    while (xs.length !== 0) {
      const oneBreak = xs.findIndex((val) => val > maxWidth());
      if (oneBreak > 0) {
        temp_breaks = [...temp_breaks, oneBreak + currRemoved];
      }
      currRemoved += xs.length;
      xs = xs.filter((x) => x > maxWidth()).map((x) => x - maxWidth());
      currRemoved -= xs.length;
    }
    return temp_breaks;
  };

  createEffect(() => {
    data();
    props.numCols();
    props.rect();
    setFlip((prev) => !prev);
  });

  createEffect(() => {
    if (flip()) {
      setFlip((prev) => !prev);
      setBreaks([0]);
    } else {
      setBreaks(recalculate());
    }
  });

  return (
    <Index each={breaks()}>
      {(breakAt, breakIndex) => (
        <div class="h-auto w-full aspect-[297/210] flex flex-col flex-wrap">
          <Index
            each={data().slice(
              breakAt(),
              breakIndex + 1 === breaks().length
                ? undefined
                : breaks()[breakIndex + 1]
            )}
          >
            {(item, index) => (
              <div
                ref={(el) => setRefs([index + breakAt()], el)}
                class={clsx("p-4")}
                style={`width: ${Math.floor(
                  props.rect().width / props.numCols()
                )}px;`}
              >
                {breakIndex === 0 && index === 0 ? (
                  <TitleCard {...item()} />
                ) : (
                  <SectionCard {...item()} />
                )}
              </div>
            )}
          </Index>
        </div>
      )}
    </Index>
  );
}

export default PrintDisplay;
