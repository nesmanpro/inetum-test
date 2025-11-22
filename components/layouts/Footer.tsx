import Link from "next/link";
import Boostrap from "../ui/logos/Boostrap";

interface NavItemType {
  name: string;
  href: string;
}

const firstColumn: NavItemType[] = [
  { name: "Cosas interesantes", href: "#" },
  { name: "Función aleatoria", href: "#" },
  { name: "Función de equipo", href: "#" },
  { name: "Cosas para desarrolladores", href: "#" },
  { name: "Otro", href: "#" },
  { name: "Última vez", href: "#" },
];
const secondColumn: NavItemType[] = [
  { name: "Recurso", href: "#" },
  { name: "Nombre del recurso", href: "#" },
  { name: "Otro recurso", href: "#" },
  { name: "Último recurso", href: "#" },
];
const thirdColumn: NavItemType[] = [
  { name: "Equipo", href: "#" },
  { name: "Ubicaciones", href: "#" },
  { name: "Privacidad", href: "#" },
  { name: "Términos", href: "#" },
];

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="footer">
      <div className="footer-wrapper max-w-lg top-separator">
        <div className="footer-logo">
          <Boostrap color width="17px" height="auto" />© 2017-2022
        </div>
        <div className="footer-links">
          <div className="link-section">
            <span>Características</span>
            {firstColumn.map(({ name, href }) => (
              <Link className="footer-link" key={name} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div className="link-section">
            <span>Recursos</span>
            {secondColumn.map(({ name, href }) => (
              <Link className="footer-link" key={name} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div className="link-section">
            <span>Acerca de</span>
            {thirdColumn.map(({ name, href }) => (
              <Link className="footer-link" key={name} href={href}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
