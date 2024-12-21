import React, { useCallback, useState } from "react";
import { Form, Button, Image, Divider } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useCategory } from "../../../../hooks";

import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch, category } = props;
  const [previewImage, setPreviewImage] = useState(category?.image || "");
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) await updateCategory(category.id, formValue);
        else await addCategory(formValue);
        onRefetch();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de Categoria"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Button
        type="button"
        fluid
        color={formik.errors.image && "red"}
        {...getRootProps()}
      >
        {previewImage ? "Actualizar Imagen" : "Subir Imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} fluid />
      <Divider />
      <Button
        type="submit"
        primary
        fluid
        content={category ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
