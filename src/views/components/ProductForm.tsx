import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { useToast } from '@app/hooks/use-toast';
import { IProduct } from '@app/interfaces/IProduct';
import useNavigation from '@app/libs/navigate';
import productsService from '@app/services/products';

import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Toaster } from './ui/toaster';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres.',
    })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
      message: 'O nome não pode conter números.',
    }),
  description: z.string().min(5, {
    message: 'A descrição deve ter pelo menos 5 caracteres.',
  }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'O preço deve ser um número válido com até duas casas decimais.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

function ProductForm() {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const navigate = useNavigation();
  const { toast } = useToast();
  const routeParams = useParams();
  const { productId } = routeParams;

  useDocumentTitle(
    productId ? 'Atualização de produto' : 'Cadastro de produto',
  );

  const defaultValues = useMemo(
    () => ({
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
    }),
    [product],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (product) {
        await productsService.updateProduct(
          {
            id: product.id,
            ...data,
            createdAt: product.createdAt, // Preserve the original createdAt date
          },
          product.id,
        );
        toast({
          title: 'Produto atualizado com sucesso.',
          description: 'Você será redirecionado para a página inicial',
        });
      } else {
        const productObj = {
          id: uuidv4(),
          ...data,
          createdAt: new Date().toISOString(),
        };

        await productsService.addNewProduct(productObj);

        setIsSafeToReset(true);

        toast({
          title: 'Produto cadastrado com sucesso.',
          description: 'Você será redirecionado para a página inicial',
        });
      }

      setTimeout(() => navigate('/'), 3500);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          'Não foi possível adicionar o produto agora, tente novamente',
      });
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        try {
          const productById = await productsService.getProductById(productId);
          setProduct(productById);
          form.reset(productById);
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível carregar o produto.',
          });
        }
      }
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!isSafeToReset) return;

    form.reset(defaultValues);
  }, [defaultValues, form, form.reset, isSafeToReset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-4/5 sm:w-3/5 md:w-9/12 lg:w-2/5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Produto XYZ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: Este produto é ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 99.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {productId ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </Button>
      </form>
      <Toaster />
    </Form>
  );
}

export default ProductForm;
