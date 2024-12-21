import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  PageHeader,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useCategory } from "../../hooks";

export function CategoriesAdmin(props) {
  const { onClose } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, categories, getCategories, deleteCategory } = useCategory();

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    };
    fetchCategories();
  }, [refetch]);

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Editar Categoria");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (data) => {
    const result = window.confirm(
      `Desea eliminar la categoria "${data.title}" ?`
    );
    if (result) {
      try {
        await deleteCategory(data.id);
        onRefetch();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };

  return (
    <>
      <PageHeader
        title="Categorias"
        btnTitle="Nueva Categoria"
        btnClic={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategory={onDeleteCategory}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
