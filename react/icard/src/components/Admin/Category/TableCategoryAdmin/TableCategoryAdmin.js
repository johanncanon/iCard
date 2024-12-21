import React from "react";
import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableCategoryAdmin.scss";

export function TableCategoryAdmin(props) {
  const { categories, updateCategory, onDeleteCategory } = props;

  if (categories instanceof Promise) {
    return (
      <Table className="table-category-admin">
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={6}>Cargando usuarios...</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <Table className="table-category-admin">
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={6}>No se encontraron usuarios.</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Image src={category.image} />
            </Table.Cell>
            <Table.Cell>{category.title}</Table.Cell>
            <Actions
              category={category}
              updateCategory={updateCategory}
              onDeleteCategory={onDeleteCategory}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { category, updateCategory, onDeleteCategory } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateCategory(category)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteCategory(category)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
