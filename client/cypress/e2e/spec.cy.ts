describe("Testes do E-commerce", () => {
  describe("Visualização de produtos", () => {
    it("Deve carregar a lista de produtos", () => {
      cy.visit("/principal"); // Abre a página principal
      cy.get(".card-produto").should("have.length.greaterThan", 0); // Verifica que há produtos
    });

    it("Deve exibir erro ao falhar no carregamento dos produtos", () => {
      cy.intercept("GET", "**/produtos", { statusCode: 500 });
      cy.visit("/principal");
      cy.get(".msg-erro-carregamento").should(
        "contain",
        "Falha ao carregar a lista de produtos!"
      );
    });

    it("Deve exibir detalhes do produto", () => {
      cy.visit("/principal");
      cy.get(".card-produto").first().find(".btn-detalhes").click();
      cy.url().should("include", "/detalhesProdutos");
      cy.get(".card-detalhes-produto").should("have.length", 1);
    });

    it("Deve exibir mensagem de erro ao tentar acessar um produto inexistente", () => {
      cy.visit("/detalhesProdutos/0");
      cy.get(".alert-danger").should("contain", "Falha ao carregar o produto!");
    });
  });

  describe("Pesquisa de produtos", () => {
    it("Deve filtrar produtos por nome", () => {
      cy.visit("/principal");
      cy.get('input[name="pesquisa"]').type("Playstation 5");
      cy.get(".card-produto").should("have.length", 1);
    });
  });

  describe("Filtrar produtos por categoria", () => {
    it('Deve filtrar produtos por categoria selecionada', () => {
      cy.visit('/principal');
      cy.get('.dropdown-categorias button').click(); 
    
      // Seleciona uma categoria
      cy.get('.dropdown-item').contains('Videogames').click();
    
      // Verifica se os produtos exibidos pertencem à categoria "Videogame"
      cy.get('.card-produto').each(($produto) => {
        cy.wrap($produto).should('contain', 'Videogame');
      });
    });
  });

  describe("Adicionar ao carrinho", () => {
    it("Deve adicionar um produto ao carrinho", () => {
      cy.visit("/principal");
      cy.get(".card-produto").first().find(".btn-adicionar").click(); // Clica no botão "Adicionar ao Carrinho"
      cy.visit("/carrinho");
      cy.get(".item-carrinho").should("have.length", 1); // Verifica se o produto foi adicionado
    });
  });

  describe("Realizar o checkout", () => {
    it("Deve autenticar o usuário e finalizar a compra", () => {
      // Faz login no sistema
      cy.visit("/entrar");
      cy.get('input[name="username"]').type("viniciusflyssak");
      cy.get('input[name="senha"]').type("Asd123");
      cy.get(".btn-login").click();

      // Aguarda a autenticação e navega para a página principal
      cy.wait(2000);
      cy.visit("/principal");

      // Adiciona um produto ao carrinho
      cy.get(".card-produto").first().find(".btn-adicionar").click();
      cy.visit("/carrinho");
      cy.get(".item-carrinho").should("have.length", 1);

      // Finaliza a compra
      cy.get(".btn-finalizar").click();
      cy.url().should("include", "/finalizar");
      cy.get('input[id="cartaoCredito"]').click();
      cy.get(".btn-confirmar").click();
      cy.get(".text-success").should(
        "contain",
        "Pedido realizado com sucesso!"
      );
    });

    it("Deve autenticar o usuário e finalizar a compra, mas ocorrer erro pois não selecionou forma de pagamento", () => {
      // Faz login no sistema
      cy.visit("/entrar");
      cy.get('input[name="username"]').type("viniciusflyssak");
      cy.get('input[name="senha"]').type("Asd123");
      cy.get(".btn-login").click();

      // Aguarda a autenticação e navega para a página principal
      cy.wait(2000);
      cy.visit("/principal");

      // Adiciona um produto ao carrinho
      cy.get(".card-produto").first().find(".btn-adicionar").click();
      cy.visit("/carrinho");
      cy.get(".item-carrinho").should("have.length", 1);

      // Finaliza a compra
      cy.get(".btn-finalizar").click();
      cy.url().should("include", "/finalizar");
      cy.get(".btn-confirmar").click();
      cy.get(".text-danger").should(
        "contain",
        "Selecione uma forma de pagamento"
      );
    });
  });

  describe("Histórico de pedidos", () => {
    it("Deve exibir histórico de pedidos para usuário logado", () => {
      // Faz login no sistema
      cy.visit("/entrar");
      cy.get('input[name="username"]').type("viniciusflyssak");
      cy.get('input[name="senha"]').type("Asd123");
      cy.get(".btn-login").click();
      cy.wait(2000);

      // Verifica se a lista de pedidos é exibida
      cy.visit("/listaDePedidos");
      cy.get(".card-pedido").should("have.length.greaterThan", 0);
    });

    it("Deve exibir tela vazia para histórico sem pedidos", () => {
      cy.window().then((window) => {
        window.localStorage.setItem(
          "usuario",
          JSON.stringify({
            id: 1,
            nome: "Usuário Teste",
            username: "teste",
            email: "teste@teste.com",
          })
        );
      }); // Simula usuário logado
      cy.visit("/listaDePedidos");
      // Verifica se a mensagem de erro é exibida
      cy.get(".mensagem-sem-pedidos").should(
        "contain",
        "Nenhum pedido encontrado"
      );
    });
  });
});
