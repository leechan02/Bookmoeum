export default function CharacterMsg({
  msg,
  imageUrl,
}: {
  msg: string;
  imageUrl: string;
}): JSX.Element {
  return (
    <div className="flex-col justify-center items-center gap-6 inline-flex">
      <img src={imageUrl} alt='character' className="w-[325px] h-[325px]"/>
      <div className="font-medium text-primary text-3xl">{msg}</div>
    </div>
  );
}
