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
import { userLogin, type UserLoginType } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from './action';
import { useNavigation } from '@/lib/navigation';
import { useToast } from '@/lib/toast';

export function Form() {
  const form = useForm<UserLoginType>({
    resolver: zodResolver(userLogin),
    defaultValues: { username: '', password: '' }
  });

  const { router } = useNavigation();
  const { feedback } = useToast();

  async function onSubmit(data: UserLoginType) {
    const response = await login(data);
    feedback({
      ...response,
      type: response.type as 'success' | 'destructive',
      onSuccess: () => router.push('/hub')
    });
  }
  return (
    <FormComponent {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px] max-md:w-full"
      >
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
        <Button className="w-full" type="submit">
          Entrar
        </Button>
        <p className="text-center">
          Não é registrado?{' '}
          <Link className="font-bold" href="/register">
            Cadastre-se!
          </Link>
        </p>
      </form>
    </FormComponent>
  );
}
