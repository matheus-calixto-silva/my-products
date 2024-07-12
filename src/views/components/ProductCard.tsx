/* eslint-disable camelcase */
import { CircleDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

import { IDialog } from '@app/interfaces/IDialog';
import { routes } from '@app/Router/routes';

import { useTheme } from '@app/contexts/ThemeProvider';
import { IProductCard } from '@app/interfaces/IProductCard';
import AlertDialogPopup from './AlertDialogPopUp';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Toaster } from './ui/toaster';

function ProductCard({ product, onDelete }: IProductCard) {
  const { id, name, description, price } = product;

  const dialogDataFiels: IDialog = {
    id,
    btnString: 'Deletar',
    title: 'Deseja excluir esse produto?',
    description:
      'A ação não poderá ser desfeita, todas as informações serão perdidas',
    onClick(productId) {
      onDelete(productId);
    },
  };

  const { theme } = useTheme();

  return (
    <>
      <Card className="mb-10 p-6">
        <CardContent>
          <p className="mb-1">{name}</p>
          <p
            className={
              theme === 'light' ? 'text-violet-900' : 'text-violet-400'
            }
          >
            {description}
          </p>
        </CardContent>
        <CardFooter />
        <CardContent className="flex">
          <CircleDollarSign /> <p className="ml-2">{price}</p>
        </CardContent>
        <CardContent className="flex">
          <Button variant="default" className="mr-2">
            <Link to={`${routes.editProduct}/${id}`}>Editar</Link>
          </Button>
          <AlertDialogPopup dialog={dialogDataFiels} />
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}

export default ProductCard;
