import { useField } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IMaskInput } from "react-imask";
import { MaskedInputContainer, PasswordToggle } from "./MaskedInputStyles";

type MaskedInputProps = {
  name: string;
  mask?: string;
  placeholder?: string;
  className?: string;
  showError?: boolean;
  type?: string;
  id?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
  password?: boolean;
  fileUpload?: boolean;
  multiple?: boolean;
  uploadPreset?: string;
  cloudName?: string;
};

export const MaskedInput = ({
  name,
  mask,
  placeholder,
  className,
  showError = true,
  type = "text",
  id,
  as = "input",
  children,
  password = false,
  fileUpload = false,
  multiple = false,
  uploadPreset,
  cloudName,
}: MaskedInputProps) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const hasError = meta.touched && !!meta.error;

  // Separa a prop 'value' do resto das props do Formik.
  // Isso é crucial para não passar 'value' para o input de arquivo.
  const { value, ...restOfField } = field;

  const inputType = fileUpload
    ? "file"
    : password
      ? showPassword
        ? "text"
        : "password"
      : type;

  // ========================
  // Função de upload Cloudinary
  // ========================
  const handleFileUpload = async (files: FileList) => {
    if (!files || !uploadPreset || !cloudName) return;

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error(err);
        toast.error(`Erro ao enviar imagem ${files[i].name}`);
      }
    }

    if (multiple) {
      // Garante que o valor inicial seja um array antes de espalhar as novas URLs
      const existingValue = Array.isArray(value) ? value : [];
      helpers.setValue([...existingValue, ...uploadedUrls]);
    } else {
      helpers.setValue(uploadedUrls[0]);
    }

    toast.success("Upload concluído!");
  };

  // Props comuns para a maioria dos inputs, mas sem a prop 'value'.
  const commonProps = {
    ...restOfField,
    placeholder,
    className: `${className ?? ""} ${hasError ? "error" : ""}`,
    id,
    onBlur: () => helpers.setTouched(true),
  };

  let InputElement;

  // ========================
  // Input de arquivo (Thumbnail ou Galeria) - Componente NÃO CONTROLADO
  // ========================
  if (fileUpload) {
    InputElement = (
      <input
        name={name}
        placeholder={placeholder}
        className={`${className ?? ""} ${hasError ? "error" : ""}`}
        type="file"
        accept="image/*"
        multiple={multiple}
        id={id}
        onBlur={() => helpers.setTouched(true)}
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          handleFileUpload(files);
        }}
      />
    );
  }
  // ========================
  // Input com máscara - Componente CONTROLADO
  // ========================
  else if (mask && as === "input") {
    InputElement = (
      <IMaskInput
        {...commonProps}
        type={inputType}
        mask={mask}
        value={value !== undefined && value !== null ? String(value) : ""}
        onAccept={(val: string) => helpers.setValue(val)}
      />
    );
  }
  // ========================
  // Textarea - Componente CONTROLADO
  // ========================
  else if (as === "textarea") {
    InputElement = (
      <textarea
        {...commonProps}
        value={value !== undefined && value !== null ? String(value) : ""}
        onChange={(e) => helpers.setValue(e.target.value)}
      />
    );
  }
  // ========================
  // Select - Componente CONTROLADO
  // ========================
  else if (as === "select") {
    InputElement = (
      <select
        {...commonProps}
        value={value !== undefined && value !== null ? String(value) : ""}
        onChange={(e) => helpers.setValue(e.target.value)}
      >
        {children}
      </select>
    );
  }
  // ========================
  // Input padrão - Componente CONTROLADO
  // ========================
  else {
    InputElement = (
      <input
        {...commonProps}
        type={inputType}
        value={value !== undefined && value !== null ? String(value) : ""}
        onChange={(e) => helpers.setValue(e.target.value)}
      />
    );
  }

  return (
    <MaskedInputContainer $hasToggle={password}>
      {InputElement}
      {password && (
        <PasswordToggle onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </PasswordToggle>
      )}
      {showError && hasError && (
        <div className="error-message">{meta.error}</div>
      )}
    </MaskedInputContainer>
  );
};
