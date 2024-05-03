import {createContext, useEffect, useMemo, useReducer, useState} from "react";
import {carrinhoReducer} from "@/reducers/carrinhoReducer.js";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "CarrinhoContext";

const estadoInicial = []

export const CarrinhoProvider = ({children}) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const {quantidadeTemp, totalTemp} = useMemo(() => {
    return carrinho.reduce((acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + (produto.preco * produto.quantidade)
      }),
      {
        totalTemp: 0,
        quantidadeTemp: 0
      }
    );
  }, [carrinho])

  useEffect(() => {
    setQuantidade(quantidadeTemp);
    setValorTotal(totalTemp);
  })

  return (
    <CarrinhoContext.Provider value={{
      carrinho,
      dispatch,
      quantidade,
      valorTotal
    }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}
