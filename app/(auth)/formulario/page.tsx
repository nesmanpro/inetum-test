"use client";
import Header from "@/components/layouts/Header";
import Button from "@/components/ui/Button";
import { useFetch } from "@/hooks/useFetch";
import { useState } from "react";

type Props = {};

export default function page({}: Props) {
  const [message, setMessage] = useState("");
  const maxChars = 160;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      nombre: formData.get("nombre"),
      apellidos: formData.get("apellidos"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      mensaje: formData.get("mensaje"),
    };

    console.log("Datos enviados:", payload);
    const { loading, error, data, response } = useFetch();
  };

  return (
    <div className="form-page max-w-lg">
      <Header title="Formulario" />
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="">
          <input type="text" name="name" placeholder="Nombre" required />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="secondname"
            placeholder="Apellidos"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className=""
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            placeholder="Telefono"
            pattern="^[6-7]\d{8}$"
            required
          />
          {/* <div className="form-text">
            Debe ser un número móvil de España (9 dígitos, empieza en 6 o 7).
          </div> */}
        </div>

        <div className="textarea-wrapper">
          <textarea
            name="message"
            className="form-control"
            placeholder="Escribe tu mensaje..."
            required
            maxLength={maxChars}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <small className="text-muted">
            {maxChars - message.length} caracteres restantes
          </small>
        </div>

        <Button type="submit" className="solid">
          Enviar formulario
        </Button>
      </form>
    </div>
  );
}
