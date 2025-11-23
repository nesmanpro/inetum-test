import Link from "next/link";
import Boostrap from "../ui/logos/Boostrap";

interface navigationType {
  label: string;
  href: string;
}

const navigation: navigationType[] = [
  { label: "Formulario", href: "/formulario" },
  { label: "Empresa", href: "/" },
  { label: "Apoyo", href: "/" },
  { label: "Precios", href: "/" },
];

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-wrapper bottom-separator max-w-lg">
        <div className="navbar-logo">
          <Link href="/">
            <Boostrap />
          </Link>
          <span>Ejemplo de precios</span>
        </div>
        <div className="navbar-menu">
          {navigation.map(({ label, href }) => (
            <div key={label}>
              <Link href={href}>{label}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
