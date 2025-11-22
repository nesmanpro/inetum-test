type Props = {
  title?: string;
  subtitle?: string;
};

export default function Header({ title, subtitle }: Props) {
  return (
    <div className="header">
      <h1 className="header-title">{title}</h1>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </div>
  );
}
