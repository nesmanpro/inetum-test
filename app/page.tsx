import Header from "@/components/layouts/Header";
import Table from "@/components/layouts/Table";
import Card from "@/components/ui/Card";
import { cardsType, headerType, tableType } from "@/types/homeTypes";

const headerText: headerType = {
  title: "Precios",
  subtitle:
    "Cree rápidamente una tabla de precios efectiva para sus clientes potenciales con este ejemplo.",
};

const cardsText: cardsType[] = [
  {
    title: "Gratis",
    price: 0,
    description: [
      "10 usuarios incluidos",
      "2 GB de almacenamiento",
      "Soporte de correo electrónico",
      "Acceso al centro de ayuda",
    ],
    button: {
      type: "outline",
      text: "Registrate gratis",
    },
  },
  {
    title: "Pro",
    price: 15,
    description: [
      "20 usuarios incluidos",
      "10 GB de almacenamiento",
      "Soporte prioritario por correo electrónico",
      "Acceso al centro de ayuda",
    ],
    button: {
      type: "solid",
      text: "Empezar",
    },
  },
  {
    title: "Empresa",
    price: 29,
    description: [
      "30 usuarios incluidos",
      "15 GB de almacenamiento",
      "Soporte telefónico y por correo electrónico",
      "Acceso al centro de ayuda",
    ],
    button: {
      type: "solid",
      text: "Contactanos",
    },
  },
];

const tableText: tableType[] = [
  {
    title: "Público",
    gratis: true,
    pro: true,
    empresa: true,
  },
  {
    title: "Privado",
    gratis: false,
    pro: true,
    empresa: true,
  },
  {
    title: "Permisos",
    gratis: true,
    pro: true,
    empresa: true,
  },
  {
    title: "Intercambio",
    gratis: false,
    pro: true,
    empresa: true,
  },
  {
    title: "Miembros ilimitados",
    gratis: false,
    pro: true,
    empresa: true,
  },
  {
    title: "Seguridad adicional",
    gratis: false,
    pro: false,
    empresa: true,
  },
];

export default function Home() {
  return (
    <main className="home-container max-w-lg">
      <Header title={headerText.title} subtitle={headerText.subtitle} />
      <section className="cards-wrapper">
        {cardsText.map((card, idx) => (
          <Card key={idx} data={card} />
        ))}
      </section>
      <section className="table-wrapper">
        <h2>Comparar planes</h2>
        <Table data={tableText} />
      </section>
    </main>
  );
}
