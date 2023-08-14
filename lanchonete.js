class CaixaDaLanchonete {
  constructor() {
    this.cardapio = [
      {
        cod: "cafe",
        descricao: "Café",
        valor: 3.0,
      },
      {
        cod: "chantily",
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
      },
      {
        cod: "suco",
        descricao: "Suco Natural",
        valor: 6.2,
      },
      {
        cod: "sanduiche",
        descricao: "Sanduíche",
        valor: 6.5,
      },
      {
        cod: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.0,
      },
      {
        cod: "salgado",
        descricao: "Salgado",
        valor: 7.25,
      },
      {
        cod: "combo1",
        descricao: "1 suco e 1 sanduíche",
        valor: 9.5,
      },
      {
        cod: "combo2",
        descricao: "1 café e 1 sanduíche",
        valor: 7.5,
      },
    ];
  }

  verificaSeExiste(itens) {
    let l = this.cardapio.map((opcao) => opcao.cod);
    for (let idx = 0; idx < itens.length; idx++) {
      if (!l.includes(itens[idx].split(",")[0])) {
        return true;
      }
    }
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    let valor = 0;
    let principal;
    let pedidos = [];
    let quantidades = [];
    itens.forEach((item) => {
      pedidos.push(item.split(",")[0]);
      quantidades.push(item.split(",")[1]);
    });

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    } else if (quantidades.includes("0")) {
      return "Quantidade inválida!";
    } else if (this.verificaSeExiste(itens)) {
      return "Item inválido!";
    } else {
      itens.forEach((item, index) => {
        principal = false;
        let qntd = quantidades[index];
        let pedido = pedidos[index];

        this.cardapio.forEach((opcao) => {
          if (opcao.cod === pedido) {
            if (opcao.descricao.includes("extra")) {
              for (let i = 0; i < this.cardapio.length; i++) {
                if (
                  !this.cardapio[i].descricao.includes("extra") &&
                  pedidos.includes(this.cardapio[i].cod) &&
                  opcao.descricao.includes(this.cardapio[i].descricao)
                ) {
                  valor += opcao.valor * qntd;
                  principal = true;
                }
              }
            } else {
              valor += opcao.valor * qntd;
              principal = true;
            }
          }
        });
      });
    }

    if (!principal) {
      return "Item extra não pode ser pedido sem o principal";
    } else {
      switch (metodoDePagamento) {
        case "debito":
          return `R$${valor.toFixed(2)}`;
          break;
        case "dinheiro":
          return `R$${(valor * 0.95).toFixed(2)}`;
          break;
        case "credito":
          return `R$${(valor * 1.03).toFixed(2)}`;
          break;
        default:
          return "Forma de pagamento inválida!";
      }
    }
  }
}

let pedido = new CaixaDaLanchonete();

console.log(pedido.calcularValorDaCompra('debito', ["2"]));
