'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { login } from '../services';
import { setLoginCookies } from '../lib/login-utils';
import {
  LoginPayload,
  LoginResponse,
  LoginErrorResponse
} from '../types/login-types';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  username: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await login({ ...data, user_type: 'management' });
      if ('access_token' in response) {
        setLoginCookies(response);
        toast.success('Login successful!');
        router.push('/core/overview');
      } else {
        toast.error(response.msg || 'Login failed');
      }
    } catch (err: any) {
      toast.error(err?.msg || 'Login failed');
    }
  };

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name='username'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder='Enter your email' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type='password'
                placeholder='Enter your password'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type='submit' className='mt-4 w-full'>
        Sign In
      </Button>
    </Form>
  );
}
