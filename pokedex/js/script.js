const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    // nossa função fetchPokemon vai receber um pokemon de paramentro e vai buscar as informações do pokemon buscado

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // o fetch é assincrono, não sabemos quanto tempo leva para retornar os dados, é como uma promessa
    // para testar podemos fazer um console.log(APIResponse) e fora das chaves um fetchPokemon
    // para arrumar podemos usar o await antes de funções ASSINCRONAS, para definir uma função como assincrona usar o async

    // mesmo assim não mostra nada na pokedex, e sim apenas no console
    // para msotrar a resposta da API temos que extrair o JSON, criando uma const e usar o .json para extarir os dados da resposta da API

    if (APIResponse.status === 200) {
        // console.log(APIResponse)
        const data = await APIResponse.json();
        // se tentarmos colocar um valor que não existe a extração feita por essa função não vai dar certo, precisamos tratálo
        
        return data;
    } 
}

// com a função para pegar os dados e retorná-los, precisamos renderizar e criar uma função com a função de renderizar esses dados

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        // objetivo dessa função é pegar o "name" da resposta da api e renderizar, no caso o data.name
        // se pesquisarmos um nome que não tem, da erro no console, temos que mudar para se não tiver não mostrar nada
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTM = '';
    }
}



form.addEventListener('submit', (event) => {
    // por se tratar de um formulário, ele tem um comportamento padrão que deve ser bloqueado

    event.preventDefault();
    // TALVEZ TIRAR MAIUSCULA DO E
    // com isso nós recuperamos a informação dentro do input
    // para testar console.log(input.calue)
    
    renderPokemon(input.value.toLowerCase());
    // depois de renderizar ao apertar enter tornar em branco
    
    // não podemos procurar com a primeira letra maiuscula, temos que tornar na função a primeira letra minuscula
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

