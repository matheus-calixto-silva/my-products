import { toast } from '@app/hooks/use-toast';
import { IProduct } from '@app/interfaces/IProduct';
import productsService from '@app/services/products';
import ProductCard from '@views/components/ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@views/components/ui/pagination';
import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const fetchData = async () => {
    try {
      const response = await productsService.getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePreviousClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - rowsPerPage);
      setEndIndex(endIndex - rowsPerPage);
    }
  };

  const handleNextClick = () => {
    if (endIndex < products.length) {
      setStartIndex(startIndex + rowsPerPage);
      setEndIndex(endIndex + rowsPerPage);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productsService.removeProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId),
      );

      toast({
        title: 'Produto excluido com sucesso.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          'Não foi possível remover o produto agora, tente novamente',
      });
    }
  };

  if (products.length === 0)
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1>Nenhum produto para ser exibido</h1>
        <p>Adicione um produto</p>
      </div>
    );

  return (
    <section className="w-full min-h-screen flex flex-col items-center">
      <div className="w-4/5 sm:w-3/5 md:w-9/12 lg:w-2/5">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onDelete={handleDeleteProduct}
          />
        ))}
        <Pagination className="mb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  startIndex === 0
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                onClick={handlePreviousClick}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={
                  endIndex >= products.length
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                onClick={handleNextClick}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default Home;
