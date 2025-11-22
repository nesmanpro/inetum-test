import { cardsType } from "@/types/homeTypes";
import Button from "./Button";

type Props = {
  data: cardsType;
  [key: string]: any;
};

export default function Card({ data, ...props }: Props) {
  const { title, price, description, button } = data;
  return (
    <div className="card" {...props}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        <h3 className="card-price">
          ${price} <span>/mes</span>
        </h3>
        <ul className="card-description">
          {description.map((des) => (
            <li key={des}>{des}</li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <Button className={`${button.type} w-full`}>{button.text}</Button>
      </div>
    </div>
  );
}
