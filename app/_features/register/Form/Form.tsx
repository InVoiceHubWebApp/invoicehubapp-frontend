'use client';
import { Button } from '@/components/ui/button';
import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { userRegister, type UserRegisterType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '@/app/_service/users';
import { useNavigation } from '@/lib/navigation';
import { useToast } from '@/lib/toast';

export function Form() {
  const form = useForm<UserRegisterType>({
    resolver: zodResolver(userRegister),
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { router } = useNavigation();
  const { feedback } = useToast();

  async function onSubmit(values: UserRegisterType) {
    const response = await createUser(values);
    feedback({
      ...response,
      type: response.type as 'success' | 'destructive',
      onSuccess: () => router.push('/')
    });
  }

  return (
    <FormComponent {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px] max-md:w-full"
      >
        <div className="flex gap-2 max-md:flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Digite o usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 max-md:flex-col">
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a senha"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirme a senha"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full">Cadastrar</Button>
        <p className="text-center">
          Já tem uma conta?{' '}
          <Link className="font-bold" href="/">
            Entre
          </Link>
        </p>
      </form>
    </FormComponent>
  );
}
