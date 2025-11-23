"use client";

// react
import { useActionState, useEffect, useState } from "react";

// components
import Header from "@/components/layouts/Header";
import Button from "@/components/ui/Button";

// actions
import { actions } from "@/actions";
import { type FormState } from "@/helper/validation";
import FormError from "@/components/layouts/FormError";
import { useRouter } from "next/navigation";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  errors: null,
  data: {
    name: "",
    secondname: "",
    email: "",
    phone: "",
    message: "",
  },
};

export default function page() {
  const [formState, formAction] = useActionState(
    actions.auth.registerClientActions,
    INITIAL_STATE
  );
  const router = useRouter();
  const [message, setMessage] = useState("");
  const maxChars = 160;

  useEffect(() => {
    if (formState.serverError) {
      router.push("/serverError");
    }
  }, [formState.serverError]);

  return (
    <div className="form-page max-w-lg">
      <Header title="Formulario" />
      <form className="form-wrapper" action={formAction}>
        <div className="">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            defaultValue={formState.data?.name ?? ""}
          />
          <FormError error={formState.errors?.name} />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="secondname"
            placeholder="Apellidos"
            defaultValue={formState.data?.secondname ?? ""}
          />
          <FormError error={formState.errors?.secondname} />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className=""
            placeholder="Email"
            defaultValue={formState.data?.email ?? ""}
          />
          <FormError error={formState.errors?.email} />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            placeholder="Telefono"
            defaultValue={formState.data?.phone ?? ""}
          />
          <FormError error={formState.errors?.phone} />
        </div>

        <div className="textarea-wrapper">
          <textarea
            name="message"
            className="form-control"
            placeholder="Escribe tu mensaje..."
            maxLength={maxChars}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <small className="text-muted">
            {maxChars - message.length} caracteres restantes
          </small>
          <FormError error={formState.errors?.message} />
        </div>

        <Button className="solid">Enviar formulario</Button>
      </form>
    </div>
  );
}
