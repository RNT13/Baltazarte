'use client'

import Button from "@/components/ui/Button/Button";
import { MaskedInput } from "@/components/ui/MaskedInput/MaskedInput";
import { useLoginUserMutation, useVerifyUserQuery } from "@/redux/slices/apiSlice";
import { TitleH2 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as yup from 'yup';
import {
  LoginContainer,
  LoginContent,
  LoginForm,
  LoginWindow,
  LoginWindowBody,
  LoginWindowFooter,
  LoginWindowHeader
} from "./loginStyles";

export default function Login() {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { refetch: refetchUser } = useVerifyUserQuery();


  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values: LoginPayLoad) => {
      try {
        const response = await loginUser(values).unwrap();

        if (response.success) {
          toast.success(response.message || 'Login realizado com sucesso!');
          await refetchUser();
          router.push('/');
        } else {
          toast.error(response.message || 'Erro ao fazer login');
        }
      } catch (err) {
        const error = err as ApiErrorResponse;
        toast.error(error?.data?.message || 'Erro inesperado no login');
      }
    }
  });

  return (
    <LoginContainer>
      <LoginContent>
        <LoginWindow>
          <LoginWindowHeader>
            <TitleH2>Login</TitleH2>
          </LoginWindowHeader>

          <LoginWindowBody>
            <FormikProvider value={form}>
              <LoginForm onSubmit={form.handleSubmit}>
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

                <Button
                  variant="pink"
                  size="md"
                  title="Login"
                  type="submit"
                  loading={isLoading}
                >
                  Entrar
                </Button>
              </LoginForm>
            </FormikProvider>
          </LoginWindowBody>

          <LoginWindowFooter>
            <div>
              <p>Não possui conta?</p>
              <Button
                variant="ghost"
                size="xs"
                title="ir para cadastro"
                href="/register"
              >
                Clique aqui
              </Button>
            </div>
          </LoginWindowFooter>
        </LoginWindow>
      </LoginContent>
    </LoginContainer>
  );
}
