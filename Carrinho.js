class Produto {
    constructor(nome, img, descricao, precoBase) {
        this.nome = nome;
        this.img = img;
        this.descricao = descricao;
        this.precoBase = precoBase;
    }
}

var celulares = [];

function addProduto(nome, img, descricao, precoBase) {
    let novoProduto = new Produto(nome, img, descricao, precoBase);
    celulares.push(novoProduto);
    mostrarProdutosNaTela();
    return novoProduto;
}

var mProdutos = document.querySelector('.mProdutos');

function mostrarProdutosNaTela() {
    mProdutos.innerHTML = "";
    for (let i = 0; i < celulares.length; i++) {
        let produto = document.createElement('div');
        produto.classList.add('produto');
    
        let prioridadeProduto = document.createElement('div');
        prioridadeProduto.classList.add('prioridadeProduto');
    
        let imgProduto = document.createElement('img');
        imgProduto.classList.add('imgProduto');
        imgProduto.src = celulares[i].img;
        imgProduto.alt = celulares[i].nome;
    
        let nomePProduto = document.createElement('div');
        nomePProduto.classList.add('nomePProduto');
    
        let nomeProduto = document.createElement('h1');
        nomeProduto.classList.add('nomeProduto');
        nomeProduto.textContent = celulares[i].nome;
    
        let descricaoProduto = document.createElement('p');
        descricaoProduto.classList.add('descricaoProduto');
        descricaoProduto.textContent = celulares[i].descricao;
    
        let valorInputProduto = document.createElement('div');
        valorInputProduto.classList.add('valorInputProduto');
    
        let valorProduto = document.createElement('p');
        valorProduto.classList.add('valorProduto');
        valorProduto.id = `valorProduto_${i+1}`
        valorProduto.textContent = celulares[i].precoBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
        let inputQuantidadeProduto = document.createElement('input');
        inputQuantidadeProduto.type = 'number';
        inputQuantidadeProduto.value = '1';
        inputQuantidadeProduto.min = '1';
        inputQuantidadeProduto.name = 'quantidadeProduto';
        inputQuantidadeProduto.classList.add('quantidadeProduto')
        inputQuantidadeProduto.addEventListener('change', atualizaQuantidadeDeInput)
        inputQuantidadeProduto.id = `quantidadeProduto_${i+1}`;
        inputQuantidadeProduto.addEventListener(`input`, calcSubTotal);
        // calculando novo valor mostrado na tela de acordo com a quantidade de produtos selecionado
        inputQuantidadeProduto.addEventListener('input', function(){
            let id = this.id.split(`_`)[1];
            let quantidade = parseFloat(this.value)
            let precobbase = celulares[id-1].precoBase

            let preco = quantidade * precobbase

            let pValor = document.querySelector(`#${valorProduto.id}`)

            pValor.textContent = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            calcSubTotal()
        }); // Adicionando o evento de input ao inputQuantidadeProduto
    
        let trashIcon = document.createElement('img');
        trashIcon.classList.add('trashIcon');
        trashIcon.src = 'imagens/lixo-cinza.png';
        trashIcon.alt = 'Excluir item do carrinho de compras';
        trashIcon.id = `trashIcon_${i+1}`
        trashIcon.addEventListener(`click`, function(){
            let id = this.id.split(`_`)[1];
            let localArray = id-1
            celulares.splice(localArray,1)
            mostrarProdutosNaTela()
        })

    
        nomePProduto.appendChild(nomeProduto)
        nomePProduto.appendChild(descricaoProduto)

        prioridadeProduto.appendChild(imgProduto);
        prioridadeProduto.appendChild(nomePProduto);


        valorInputProduto.appendChild(valorProduto);
        valorInputProduto.appendChild(inputQuantidadeProduto);

        produto.appendChild(prioridadeProduto);
        produto.appendChild(valorInputProduto);
        produto.appendChild(trashIcon);

        mProdutos.appendChild(produto);

        atualizaQuantidadeDeInput()
    }
}
//Descobrindo a somatória dos valores dos inputs na tela
    
    function atualizaQuantidadeDeInput(){
        let quantidadeDeInput = document.querySelectorAll('.quantidadeProduto')
        let x = document.querySelector('.quantidadeDeItensNoCarrinho')
        let total = 0

        for(i=1; i <= quantidadeDeInput.length;i++){
            let valorAtual = document.querySelector(`#quantidadeProduto_${i}`).value
            total += parseFloat(valorAtual)
            
        }
        x.textContent = total+' '
    }

    function atualizaFrete(novoValor){
        let frete = document.querySelector(`.ValorFrete`)
        frete.textContent = ""
        let valorFormatado = novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        frete.textContent = valorFormatado
    }

    function calcSubTotal() {
       //Falta arrumar
    }


//Cadastrando Valores / Produtos
let Iphone12 = addProduto(`Iphone 12`, `imagens/iphone.png`, `256GB, 32GB RAM, Pourple`, 2999.90)
let Iphone13 = addProduto(`Iphone 13`, `imagens/iphone.png`, `256GB, 32GB RAM, Pourple`, 3999.90)
let s12 = addProduto(`Carregador de Iphone`, `imagens/iphone.png`, `25W Turbo Compatível iPhone X Xr SE 11 12 13 14 Premium LAGUS IMP.`, 99.90)


atualizaFrete(45.60);