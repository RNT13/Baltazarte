import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/slices/apiSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Button from "../Button/Button";
import { CategoryManagerContainer, CategoryManagerContent, CategoryManagerWindow } from "./CategoryManagerStyles";

type CategoryManagerProps = {
  selectedCategoryId: string;
  onSelect: (id: string) => void;
}

export function CategoryManager({ selectedCategoryId, onSelect }: CategoryManagerProps) {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async () => {
    const name = prompt("Nome da nova categoria:");
    if (!name) return;
    try {
      const newCategory = await createCategory({ name }).unwrap();
      toast.success("Categoria criada!");
      onSelect(newCategory.id);
    } catch {
      toast.error("Erro ao criar categoria");
    }
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(`Tem certeza que deseja deletar a categoria ${categories.find(c => c.id === id)?.name}?`);
    if (!confirm) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success("Categoria deletada!");
      if (selectedCategoryId === id) onSelect('');
    } catch {
      toast.error("Erro ao deletar categoria");
    }
  }

  return (
    <CategoryManagerContainer>
      <CategoryManagerContent $isOpen={isOpen}>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} leftIcon={<FaPlusCircle />}>
          {isOpen ? 'Fechar Gerenciador' : 'Gerenciar Categorias'}
        </Button>
        <CategoryManagerWindow $isOpen={isOpen}>
          <Button variant="ghost" size="sm" onClick={handleCreate} leftIcon={<FaPlusCircle />}>Criar Categoria</Button>
          <div>
            {categories.map(cat => (
              <li key={cat.id}>
                <span
                  style={{ fontWeight: selectedCategoryId === cat.id ? 'bold' : 'normal', cursor: 'pointer' }}
                  onClick={() => onSelect(cat.id)}
                >
                  {cat.name}
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleDelete(cat.id)}
                  leftIcon={<FaMinusCircle />}
                />
              </li>
            ))}
          </div>
        </CategoryManagerWindow>
      </CategoryManagerContent>
    </CategoryManagerContainer>
  );
}
