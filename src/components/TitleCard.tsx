type TitleProps = {
  title: string;
  content: string;
};

function TitleCard(props: TitleProps) {
  return (
    <div class="rounded">
      <p
        class="text-2xl p-1"
        innerHTML={props.title}
      ></p>
      <div class="text-justify p-1" innerHTML={props.content}></div>
    </div>
  );
}

export default TitleCard;
