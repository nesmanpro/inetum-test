import { tableType } from "@/types/homeTypes";
import { Check } from "lucide-react";

type Props = {
  data: tableType[];
};

export default function Table({ data }: Props) {
  return (
    <ul className="table">
      <li className="table-header">
        <span></span>
        <div className="table-tail">
          <p>Gratis</p>
          <p>Pro</p>
          <p> Empresa</p>
        </div>
      </li>
      {data.map(({ title, empresa, gratis, pro }) => (
        <li key={title} className="table-line">
          <p>{title}</p>
          <div className="table-tail">
            <span>{gratis && <Check />}</span>
            <span>{pro && <Check />}</span>
            <span>{empresa && <Check />}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
