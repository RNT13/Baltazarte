'use client'

import { Button } from "@/components/ui/Button/Button";
import { MaskedInput } from "@/components/ui/MaskedInput/MaskedInput";
import { useRegisterUserMutation } from "@/redux/slices/apiSlice";
import { TitleH2 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdCreateNewFolder } from "react-icons/md";
import * as yup from 'yup';
import { RegisterContainer, RegisterContent, RegisterFooter, RegisterForm, RegisterHeader } from "./registerStyles";

export default function Register() {
  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string().min(5, 'Minimo de 5 caracteres').required('Campo obrigatório'),
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      password: yup.string().min(6, 'Minimo de 6 caracteres').required('Campo obrigatório'),
    }),
    onSubmit: async (values: RegisterPayLoad) => {
      try {
        const response = await registerUser(values).unwrap();

        if (response.success) {
          toast.success(response.message || 'Usuário criado com sucesso!');
          form.resetForm();
          router.push('/login');
        } else {
          toast.error(response.message || 'Erro ao criar usuário');
        }
      } catch (err) {
        const error = err as ApiErrorResponse;
        toast.error(error?.data?.message || 'Erro inesperado no login');
      }
    }
  })

  const router = useRouter();

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  return (
    <RegisterContainer >

      <RegisterContent>
        <RegisterHeader>
          <TitleH2>Crie sua conta</TitleH2>
        </RegisterHeader>
        <FormikProvider value={form}>
          <RegisterForm onSubmit={form.handleSubmit}>

            <div>
              <label htmlFor="name">Nome</label>
              <MaskedInput
                name="name"
                id="name"
                placeholder="Digite seu nome"
                showError={false}
              />
            </div>

            <div>
              <label htmlFor="email">E-mail</label>
              <MaskedInput
                name="email"
                id="email"
                placeholder="Digite seu e-mail"
                showError={false}
              />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <MaskedInput
                name="password"
                id="password"
                placeholder="Digite sua senha"
                password
                showError={false}
              />
            </div>

            <Button variant="pink" type="submit" loading={isLoading} title="Crie sua conta" leftIcon={<MdCreateNewFolder />}>
              Crie sua conta
            </Button>
          </RegisterForm>
        </FormikProvider>
        <RegisterFooter>
          <div>
            <p>
              Já possui conta?
            </p>
            <Button
              variant="ghost"
              size="xs"
              title="ir para login"
              href="/login"
            >
              clique aqui
            </Button>
          </div>
        </RegisterFooter>
      </RegisterContent>
    </RegisterContainer >
  )
}
