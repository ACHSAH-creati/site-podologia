const artigos = [
    {
        id: "cuidados-diarios",
        titulo: "Cuidados simples para os pés no dia a dia",
        categoria: "Cuidados em casa",
        resumo: "Hábitos de higiene, secagem e escolha de calçados que ajudam a cuidar dos pés.",
        imagem: "cuidados%20em%20casa%20M.jpg",
        paragrafos: [
            "Lavar os pés e secá-los com cuidado, inclusive entre os dedos, faz parte da rotina básica de higiene. Também vale observar a pele e as unhas regularmente para notar mudanças.",
            "Escolha calçados confortáveis e adequados à atividade, e evite compartilhar itens de uso pessoal. Se houver dor persistente, feridas ou alterações que preocupem, procure orientação de uma profissional de saúde."
        ]
    },
    {
        id: "saude-das-unhas",
        titulo: "Atenção à saúde das unhas dos pés",
        categoria: "Saúde das unhas",
        resumo: "Observe mudanças nas unhas e prefira cuidados que não machuquem a pele ao redor.",
        imagem: "unhas%20amareladas%20M.jpg",
        paragrafos: [
            "Manter as unhas limpas e apará-las sem cortar a pele ao redor ajuda a evitar pequenos machucados. Use instrumentos limpos e não compartilhe alicates ou outros itens de manicure.",
            "Mudanças de cor, espessura, formato ou sensibilidade podem ter diferentes causas. Evite tentar diagnosticar ou tratar por conta própria e procure avaliação profissional se notar algo persistente."
        ]
    },
    {
        id: "pele-dos-pes",
        titulo: "Como cuidar da pele ressecada dos pés",
        categoria: "Pele dos pés",
        resumo: "Cuidados gerais para manter a pele confortável e reconhecer quando pedir ajuda.",
        imagem: "P%C3%A9s%20asperos%20M%20(2).jpg",
        paragrafos: [
            "A hidratação regular pode ajudar a reduzir a sensação de ressecamento. Evite lixar ou remover a pele em excesso, pois isso pode causar irritação ou ferimentos.",
            "Rachaduras doloridas, sangramento ou sinais de inflamação merecem avaliação profissional. Pessoas com condições de saúde que afetam a circulação ou a sensibilidade devem conversar com sua equipe de saúde antes de iniciar cuidados por conta própria."
        ]
    },
    {
        id: "prevencao-micoses",
        titulo: "Hábitos de prevenção contra micoses",
        categoria: "Micoses e prevenção",
        resumo: "Pequenos cuidados de higiene ajudam a manter os pés secos e protegidos.",
        imagem: "frieira%20M.jpg",
        paragrafos: [
            "Secar bem os pés, especialmente entre os dedos, e trocar meias úmidas são hábitos úteis. Em vestiários e áreas compartilhadas, use calçados próprios para esses ambientes.",
            "Coceira, descamação ou vermelhidão podem ter várias causas. Um profissional de saúde pode avaliar os sintomas e indicar o cuidado apropriado; evite compartilhar medicamentos ou usar tratamentos sem orientação."
        ]
    },
    {
        id: "consulta-podologica",
        titulo: "Quando procurar uma profissional de podologia",
        categoria: "Podologia",
        resumo: "Entenda como uma avaliação pode orientar o cuidado individual dos pés.",
        imagem: "consulta%20M.jpg",
        paragrafos: [
            "Uma avaliação profissional pode ajudar a compreender desconfortos e necessidades de cuidado dos pés. A orientação é individual e depende do histórico e das condições de cada pessoa.",
            "Procure atendimento de saúde sem demora diante de feridas, dor intensa, sinais de infecção ou piora rápida. Conte à profissional sobre condições de saúde, medicamentos e cuidados já realizados."
        ]
    }
];

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto) elemento.textContent = texto;
    return elemento;
}

function renderizarLista() {
    const grade = document.getElementById("grade-artigos");
    const resultado = document.getElementById("resultado-filtro");
    if (!grade || !resultado) return;

    const filtros = document.querySelectorAll("[data-filtro]");
    const mostrar = (categoria) => {
        const correspondentes = categoria === "todos"
            ? artigos
            : artigos.filter((artigo) => artigo.categoria === categoria);

        grade.replaceChildren();
        correspondentes.forEach((artigo) => {
            const cartao = criarElemento("article", "cartao-artigo");
            const imagem = document.createElement("img");
            imagem.src = `midias/${artigo.imagem}`;
            imagem.alt = "";
            imagem.loading = "lazy";

            const conteudo = criarElemento("div", "cartao-artigo-conteudo");
            conteudo.append(
                criarElemento("p", "artigo-categoria", artigo.categoria),
                criarElemento("h3", "", artigo.titulo),
                criarElemento("p", "", artigo.resumo)
            );
            const link = criarElemento("a", "", "Ler artigo");
            link.href = `artigo.html?id=${encodeURIComponent(artigo.id)}`;
            conteudo.append(link);
            cartao.append(imagem, conteudo);
            grade.append(cartao);
        });

        resultado.textContent = `${correspondentes.length} ${correspondentes.length === 1 ? "artigo encontrado" : "artigos encontrados"}.`;
        filtros.forEach((botao) => {
            const ativo = botao.dataset.filtro === categoria;
            botao.classList.toggle("ativo", ativo);
            botao.setAttribute("aria-pressed", String(ativo));
        });
    };

    filtros.forEach((botao) => {
        botao.addEventListener("click", () => mostrar(botao.dataset.filtro));
    });
    mostrar("todos");
}

function renderizarArtigo() {
    const conteudo = document.getElementById("conteudo-artigo");
    const tituloMigalha = document.getElementById("migalha-titulo");
    if (!conteudo || !tituloMigalha) return;

    const id = new URLSearchParams(window.location.search).get("id");
    const artigo = artigos.find((item) => item.id === id);
    if (!artigo) {
        conteudo.replaceChildren(
            criarElemento("h1", "", "Artigo não encontrado"),
            criarElemento("p", "erro-artigo", "Escolha um conteúdo na página de artigos para continuar.")
        );
        tituloMigalha.textContent = "Artigo não encontrado";
        return;
    }

    conteudo.replaceChildren(
        criarElemento("p", "artigo-categoria", artigo.categoria),
        criarElemento("h1", "", artigo.titulo),
        ...artigo.paragrafos.map((paragrafo) => criarElemento("p", "", paragrafo))
    );
    tituloMigalha.textContent = artigo.titulo;
}

renderizarLista();
renderizarArtigo();
