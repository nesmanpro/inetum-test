type Props = {
  color?: boolean;
  width?: string;
  height?: string;
  className?: string;
};

export default function Boostrap({ color, width, height, className }: Props) {
  const bsBlack = "/img/bootstrap-logo-black.svg";
  const bsColor = "/img/bootstrap-logo.svg";
  return (
    <>
      <img
        src={color ? bsColor : bsBlack}
        alt="Logo"
        width={width ? width : "29"}
        height={height ? height : "23"}
        className={className}
      />
    </>
  );
}
