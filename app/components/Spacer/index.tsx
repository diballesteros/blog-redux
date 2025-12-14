import { classNames } from "../../utils/common";

type Props = {
  className?: string;
  size: keyof typeof sizes;
};

const sizes = {
  xs: "h-6",
  sm: "h-10",
  md: "h-20",
  lg: "h-32",
  xl: "h-40",
  xxl: "h-64",
};

export default function Spacer({ className = "", size }: Props) {
  const getStringSize = () => {
    switch (size) {
      case "xs":
        return "md:h-6";
      case "md":
        return "md:h-20";
      case "lg":
        return "md:h-32";
      case "xl":
        return "md:h-40";
      case "xxl":
        return "md:h-64";
      case "sm":
      default:
        return "md:h-10";
    }
  };

  return (
    <div className={classNames(`${sizes.xs} ${getStringSize()}`, className)} />
  );
}
