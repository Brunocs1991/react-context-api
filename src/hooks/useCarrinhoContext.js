import {useContext, useEffect} from "react";
import {CarrinhoContext} from "@/context/CarrinhoContext.jsx";

export const useCarrinhoContext = () => {
  const {carrinho, setCarrinho, quantidade, setQuantidade, valorTotal, setValorTotal} = useContext(CarrinhoContext);

  function mudarQuantidade(id, quatidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quatidade
      return itemDoCarrinho
    })
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((item) => item.id === novoProduto.id);
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    }
    const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ehOUltimo = produto.quantidade === 1;
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    const carrinhoAtualizado = mudarQuantidade(id, -1)
    setCarrinho([...carrinhoAtualizado]);
  }

  function removerProdutoCarrinho(id) {
    return setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
    );
  }

  useEffect(() => {
   const{totalTemp, quantidadeTemp} =  carrinho.reduce((acumulador, produto) => ({
     quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
     totalTemp: acumulador.totalTemp + (produto.preco * produto.quantidade)
   }),
     {
       totalTemp: 0,
       quantidadeTemp: 0
     }
   );
   setQuantidade(quantidadeTemp);
   setValorTotal(totalTemp);
  }, [carrinho])

  return {
    carrinho, setCarrinho, adicionarProduto, removerProduto, removerProdutoCarrinho, valorTotal, quantidade
  }
}
