import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={`button ${props.className}`}>
      {children}
    </button>
  );
}
