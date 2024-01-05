"use client";

import { FormEvent, useEffect } from "react";
import Modal from "../../Modal";
import FormButton from "../FormButton";
import "./FormModal.css";

const FormModal = (params: {
  children?: any;
  formTitle: string;
  submitText: string;
  bottomText?: JSX.Element;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  errorText?: string;
  loading?: boolean;
}) => {
  useEffect(() => {
    animateErrors();
  });

  const animateErrors = (): void => {
    const elems = document.getElementsByClassName("form-error");
    for (const el of elems) {
      el.animate(
        [
          {
            color: "red",
            easing: "ease-out",
          },
          {
            color: "white",
          },
        ],
        500
      );
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    params.onSubmit(event);
  };

  const errorText = params.errorText ? `Error: ${params.errorText}` : "";

  return (
    <Modal>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-title large-text">{params.formTitle}</div>
        <div className="form-grid">{params.children}</div>
        <div className="form-error">{errorText}</div>
        <FormButton type="submit" disabled={params.loading}>
          {params.submitText}
        </FormButton>
        {params.bottomText}
      </form>
    </Modal>
  );
};

export default FormModal;
