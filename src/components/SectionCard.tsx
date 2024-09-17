type SectionProps = {
  title: string;
  content: string;
};

function SectionCard(props: SectionProps) {
  return (
    <div class="">
      <p
        class="text-lg px-2 py-1 relative top-0 left-3 bg-white w-max outline rounded"
        innerHTML={props.title}
      ></p>
      <div class="outline rounded relative -z-10 -top-4 -mb-4 pt-5 text-wrap text-justify px-2 pb-1" innerHTML={props.content}></div>
    </div>
  );
}

export default SectionCard;
