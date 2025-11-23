export default function FormError({ error }: { error?: string[] }) {
  if (!error) return null;

  return error.map((err, idx) => (
    <div key={idx} className="form-error">
      {err}
    </div>
  ));
}
