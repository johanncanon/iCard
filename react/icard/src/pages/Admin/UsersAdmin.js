import React, { useState, useEffect } from "react";
import { Confirm, Loader } from "semantic-ui-react";
import {
  PageHeader,
  TableUsers,
  AddEditUserForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common/ModalBasic";
import { useUser } from "../../hooks";
import { data } from "react-router-dom";

export function UsersAdmin() {
  const { loading, users, getUsers, deleteUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, seTtitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };
    fetchUsers();
  }, [reFetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onReFetch = () => setReFetch((prev) => !prev);
  const addUser = () => {
    seTtitleModal("Nuevo Usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onReFetch={onReFetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    seTtitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onReFetch={onReFetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`Desea eliminar el usuario ${data.email} ?`);
    if (result) {
      try {
        await deleteUser(data.id);
        onReFetch();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };

  return (
    <>
      <PageHeader title="Usuarios" btnTitle="Nuevo Usuario" btnClic={addUser} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}
      <ModalBasic show={showModal} title={titleModal} children={contentModal} />
    </>
  );
}
