import type {
  Chain,
  ChainId,
  ClamorDia,
  ConteudoItem,
  ConversaEstrategia,
  CoberturaPrayer,
  DevotionalDay,
  FrasePronta,
  InfluenciaCategoria,
  LiberationPrayer,
  ModuleDef,
} from "./types"

/* ------------------------------------------------------------------ */
/* DIAGNÓSTICO — CORRENTES INVISÍVEIS                                  */
/* ------------------------------------------------------------------ */

export const CHAINS: Chain[] = [
  {
    id: "escravidao",
    problema: "Vícios (bebida, cigarro, drogas, jogos)",
    nome: "Corrente da Escravidão",
    descricao:
      "Hábitos e substâncias que dominam a vontade dele. Vamos romper toda aliança do vício com a mente e o corpo do seu marido.",
    icon: "Wine",
  },
  {
    id: "coracao-endurecido",
    problema: "Frieza emocional e distância afetiva",
    nome: "Corrente do Coração Endurecido",
    descricao:
      "A indiferença e a distância que viraram muro entre vocês. Vamos orar para que onde há pedra, Deus coloque carne.",
    icon: "HeartCrack",
  },
  {
    id: "impureza",
    problema: "Pornografia e problemas sexuais",
    nome: "Corrente da Impureza",
    descricao:
      "Fortalezas de impureza sobre a mente e os olhos dele. Vamos clamar por pureza e pela restauração da intimidade.",
    icon: "EyeOff",
  },
  {
    id: "escassez",
    problema: "Travado financeiramente / sem propósito",
    nome: "Corrente da Escassez",
    descricao:
      "A estagnação e a vergonha que roubam a confiança dele. Vamos declarar provisão, direção e propósito.",
    icon: "Coins",
  },
  {
    id: "ira",
    problema: "Raiva, agressividade, mau humor",
    nome: "Corrente da Ira",
    descricao:
      "A explosão e a hostilidade que ferem a casa. Vamos pedir mansidão e que o Espírito o convença antes da ira.",
    icon: "Flame",
  },
  {
    id: "incredulidade",
    problema: "Resistência a Deus / não leva a fé a sério",
    nome: "Corrente da Incredulidade",
    descricao:
      "O véu que impede ele de ver a Deus como Pai. Vamos orar para que o coração dele seja atraído antes de qualquer palavra sua.",
    icon: "CloudOff",
  },
  {
    id: "opressao",
    problema: "Ansiedade, depressão, vazio interior",
    nome: "Corrente da Opressão",
    descricao:
      "O peso invisível que ele carrega em silêncio. Vamos declarar paz e o descanso que só Deus pode dar.",
    icon: "CloudRain",
  },
]

export const TEMPO_OPCOES = [
  "Menos de 6 meses",
  "Entre 6 meses e 2 anos",
  "Mais de 2 anos",
  "Desde que eu conheço ele",
]

export const SENTIMENTO_OPCOES = [
  "Cansaço",
  "Solidão",
  "Esperança",
  "Raiva",
  "Medo de desistir",
]

export function getChain(id: ChainId): Chain {
  return CHAINS.find((c) => c.id === id) as Chain
}

/* ------------------------------------------------------------------ */
/* MÓDULOS                                                             */
/* ------------------------------------------------------------------ */

export const MODULES: ModuleDef[] = [
  {
    slug: "diagnostico",
    icon: "Flame",
    titulo: "Diagnóstico das Correntes Invisíveis",
    descricao: "Reveja as correntes que identificamos na sua jornada.",
    unlockDay: 0,
  },
  {
    slug: "oracoes-libertacao",
    icon: "HandHeart",
    titulo: "Orações de Libertação",
    descricao: "Para quebrar cada corrente identificada no seu diagnóstico.",
    unlockDay: 0,
  },
  {
    slug: "mapa",
    icon: "Link2Off",
    titulo: "Mapa das Influências",
    descricao: "Identifique e cubra em oração as influências sobre o seu marido.",
    unlockDay: 0,
  },
  {
    slug: "manual",
    icon: "BookOpen",
    titulo: "Manual do Marido Liberto (21 Dias)",
    descricao: "O devocional principal, dia a dia, com versículo, reflexão, oração e ação.",
    unlockDay: 0,
  },
  {
    slug: "clamor",
    icon: "Heart",
    titulo: "21 Dias de Clamor pela Restauração",
    descricao: "Calendário de oração intensiva, paralelo ao devocional principal.",
    unlockDay: 0,
  },
  {
    slug: "conversas",
    icon: "MessagesSquare",
    titulo: "Conversas que Trazem Deus para o Lar",
    descricao: "Como falar de fé sem gerar conflito.",
    unlockDay: 7,
  },
  {
    slug: "cobertura",
    icon: "Shield",
    titulo: "Campanha da Cobertura Conjugal",
    descricao: "Orações de proteção física, emocional e espiritual.",
    unlockDay: 7,
  },
  {
    slug: "conteudos",
    icon: "Smartphone",
    titulo: "Coleção de Conteúdos que Ativam a Fé",
    descricao: "Filmes, livros, músicas e canais para manter o ambiente espiritual vivo.",
    unlockDay: 7,
  },
]

/* ------------------------------------------------------------------ */
/* MÓDULO 1 — DEVOCIONAL 21 DIAS                                       */
/* ------------------------------------------------------------------ */

export const DEVOTIONAL: DevotionalDay[] = [
  {
    dia: 1,
    semana: 1,
    titulo: "O Primeiro Passo é Reconhecer",
    versiculo:
      "Pois as armas da nossa milícia não são carnais, mas sim poderosas em Deus, para destruição das fortalezas.",
    referencia: "2 Coríntios 10:4",
    reflexao:
      "Hoje não é dia de cobrar mudança nele. É dia de reconhecer, diante de Deus, o tamanho da batalha que você está enfrentando — sem minimizar, sem fingir que está tudo bem. Deus não pede que você seja forte sozinha. Ele pede que você seja honesta com Ele primeiro.",
    oracao:
      "Senhor, eu reconheço diante de Ti que não consigo mudar o coração do meu marido com minhas próprias forças. Eu entrego a Ti a frustração, o cansaço e a vergonha que sinto. Hoje eu escolho lutar essa batalha de joelhos, não com cobrança. Em nome de Jesus, amém.",
    acao:
      "Escreva em um papel os 3 maiores motivos da sua dor hoje. Não mostre a ele. É só entre você e Deus.",
  },
  {
    dia: 2,
    semana: 1,
    titulo: "Quebrando a Corrente da Comparação",
    versiculo:
      "Não retribuam a ninguém mal por mal. Procurem fazer o que é bom diante de todos.",
    referencia: "Romanos 12:17",
    reflexao:
      "É fácil comparar seu marido com o marido de outra mulher, com o homem que ele já foi, ou com a imagem que você criou na sua cabeça. Essa comparação não cura — ela aprisiona vocês dois. Hoje você vai entregar essa comparação a Deus.",
    oracao:
      "Pai, eu confesso que tenho comparado meu marido com outras pessoas e isso só tem gerado mais distância entre nós. Eu peço perdão por isso e escolho hoje olhar para ele com os olhos que Tu olhas — vendo o potencial que ainda existe nele. Em nome de Jesus, amém.",
    acao:
      "Toda vez que pensar em compará-lo com alguém hoje, ore silenciosamente: \"Senhor, eu confio no Teu tempo para ele.\"",
  },
  {
    dia: 3,
    semana: 1,
    titulo: "A Corrente da Ira e do Ressentimento",
    versiculo:
      "Toda amargura, fúria e ira, gritaria e calúnia devem ser removidas dentre vocês.",
    referencia: "Efésios 4:31",
    reflexao:
      "Mágoas acumuladas se tornam uma corrente invisível que prende não só ele, mas você também. Você não precisa fingir que não está magoada. Mas hoje é dia de começar a soltar, pedacinho por pedacinho, o que você guarda há tempos.",
    oracao:
      "Senhor, eu trago diante de Ti as mágoas que carrego do meu marido. Eu escolho perdoar, não porque ele merece, mas porque eu preciso de liberdade para continuar essa batalha. Solta em mim qualquer raiz de amargura. Em nome de Jesus, amém.",
    acao:
      "Identifique 1 mágoa específica que você vai entregar a Deus hoje, conscientemente, mesmo que precise repetir esse processo nos próximos dias.",
  },
  {
    dia: 4,
    semana: 1,
    titulo: "Orando Contra a Corrente dos Vícios",
    versiculo:
      "Tudo me é lícito, mas nem tudo me convém; tudo me é lícito, mas eu não me deixarei dominar por nada.",
    referencia: "1 Coríntios 6:12",
    reflexao:
      "Se o seu marido luta com algum vício — bebida, jogos, pornografia ou qualquer outra escravidão — hoje é dia de guerra espiritual específica por essa área. Você não pode libertá-lo, mas pode interceder com autoridade.",
    oracao:
      "Senhor, eu declaro que nenhuma escravidão tem poder maior que o Teu sobre a vida do meu marido. Eu rompo, em nome de Jesus, qualquer aliança que o vício tenha feito com a mente e o coração dele. Que o Espírito Santo o convença e o atraia para a liberdade. Em nome de Jesus, amém.",
    acao:
      "Evite tocar nesse assunto com ele hoje através de cobrança. Deixe que a oração trabalhe primeiro.",
  },
  {
    dia: 5,
    semana: 1,
    titulo: "A Corrente da Frieza Espiritual",
    versiculo:
      "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei e cearei com ele.",
    referencia: "Apocalipse 3:20",
    reflexao:
      "Você não pode forçar a porta do coração dele. Mas pode orar para que ele ouça a voz de Deus batendo. A frieza espiritual geralmente não é rebeldia pura — é cansaço, decepção ou ferida não tratada.",
    oracao:
      "Pai, eu peço que Tu mesmo bata à porta do coração do meu marido, de uma forma que só Tu sabes fazer. Que ele sinta sede do que só Tu podes dar. Eu desisto de tentar convencê-lo com minhas palavras e confio que a Tua voz é mais poderosa que a minha. Em nome de Jesus, amém.",
    acao:
      "Hoje, em vez de falar sobre Deus para ele, ore sobre ele em silêncio pelo menos 3 vezes durante o dia.",
  },
  {
    dia: 6,
    semana: 1,
    titulo: "Vestindo a Armadura por Ele",
    versiculo:
      "Revistam-se de toda a armadura de Deus, para que possam ficar firmes contra as ciladas do diabo.",
    referencia: "Efésios 6:11",
    reflexao:
      "Você é a intercessora da sua casa. Isso não significa fraqueza — significa autoridade espiritual. Hoje, vista a armadura espiritual não só por você, mas declarando proteção sobre seu marido.",
    oracao:
      "Senhor, eu visto a armadura da fé sobre meu casamento. Cubro meu marido com o sangue de Jesus contra qualquer ataque do inimigo sobre a mente, o coração e as decisões dele. Que nenhuma arma forjada contra nossa família prospere. Em nome de Jesus, amém.",
    acao:
      "Escreva uma declaração de proteção espiritual sobre seu marido e leia em voz alta, mesmo que ele não esteja por perto.",
  },
  {
    dia: 7,
    semana: 1,
    titulo: "Descanso e Reflexão da Primeira Semana",
    versiculo:
      "Lancem sobre Ele toda a sua ansiedade, porque Ele tem cuidado de vocês.",
    referencia: "1 Pedro 5:7",
    reflexao:
      "Hoje não é dia de guerra — é dia de descanso. Você completou a primeira semana. Permita-se respirar. Releia o que escreveu no Dia 1 e observe se algo já começou a mudar dentro de você, mesmo que nada tenha mudado nele ainda.",
    oracao:
      "Senhor, eu descanso hoje na certeza de que Tu estás trabalhando, mesmo quando eu não vejo. Entrego a Ti o resultado e escolho confiar no processo. Renova minhas forças para a próxima semana. Em nome de Jesus, amém.",
    acao:
      "Sem ação de guerra hoje. Apenas descanse, ore com gratidão e celebre os 7 dias de constância.",
  },
  {
    dia: 8,
    semana: 2,
    titulo: "Orando Pela Restauração da Intimidade",
    versiculo: "Portanto, o que Deus uniu, o homem não separe.",
    referencia: "Mateus 19:6",
    reflexao:
      "Distância não é apenas física — é emocional e espiritual. Hoje você ora pela restauração da conexão entre vocês, começando pelo que só Deus pode reconstruir.",
    oracao:
      "Senhor, restaura o que foi quebrado entre mim e meu marido. Reconstrua pontes onde existem muros. Que possamos voltar a nos sentir uma equipe, não dois estranhos sob o mesmo teto. Em nome de Jesus, amém.",
    acao:
      "Faça um gesto pequeno e genuíno de afeto hoje, sem esperar reciprocidade imediata.",
  },
  {
    dia: 9,
    semana: 2,
    titulo: "A Língua que Edifica",
    versiculo: "A vida e a morte estão no poder da língua.",
    referencia: "Provérbios 18:21",
    reflexao:
      "As palavras que você usa sobre ele — para ele e sobre ele, mesmo quando ele não está perto — têm poder espiritual. Hoje, escolha edificar em vez de criticar, mesmo internamente.",
    oracao:
      "Senhor, guarda a porta dos meus lábios. Que minhas palavras sobre meu marido sejam de vida, não de morte, mesmo quando estou frustrada. Ajuda-me a falar dele com fé, não com desespero. Em nome de Jesus, amém.",
    acao: "Evite falar mal dele para terceiros hoje, mesmo que seja \"só desabafo\".",
  },
  {
    dia: 10,
    semana: 2,
    titulo: "Conversas que Trazem Deus Para o Lar",
    versiculo: "A resposta branda desvia a ira.",
    referencia: "Provérbios 15:1",
    reflexao:
      "Hoje, se sentir direção de Deus, você pode tentar uma conversa breve e leve com ele — sem cobrança, sem sermão. Apenas presença e gentileza.",
    oracao:
      "Senhor, dá-me as palavras certas se eu precisar falar com ele hoje. Que minha boca não traga acusação, mas suavidade. Usa até o meu silêncio para falar mais alto que minhas palavras. Em nome de Jesus, amém.",
    acao:
      "Se possível, jante junto com ele hoje sem celular na mesa, mesmo que a conversa seja simples.",
  },
  {
    dia: 11,
    semana: 2,
    titulo: "Orando Pela Mente Dele",
    versiculo: "Que haja em vocês o mesmo sentimento que houve em Cristo Jesus.",
    referencia: "Filipenses 2:5",
    reflexao:
      "A guerra espiritual mais importante muitas vezes acontece na mente. Hoje você ora especificamente pelos pensamentos dele — pela renovação da mente, não apenas do comportamento.",
    oracao:
      "Senhor, renova a mente do meu marido. Que pensamentos de verdade substituam mentiras que o inimigo tem plantado nele sobre quem ele é, sobre o nosso casamento e sobre Ti. Em nome de Jesus, amém.",
    acao:
      "Escreva uma característica boa dele que você ainda admira, mesmo nos dias difíceis.",
  },
  {
    dia: 12,
    semana: 2,
    titulo: "A Corrente da Comparação com o Passado",
    versiculo: "Não se lembrem das coisas passadas, nem considerem as antigas.",
    referencia: "Isaías 43:18",
    reflexao:
      "Se ele já foi diferente um dia, é fácil viver comparando o \"antes\" com o \"agora\". Hoje, entregue essa expectativa do passado e abra espaço para um novo capítulo.",
    oracao:
      "Senhor, eu solto a imagem do que ele já foi e abro meu coração para o que Tu estás formando nele agora. Não permita que eu viva no passado quando Tu estás trabalhando no presente. Em nome de Jesus, amém.",
    acao:
      "Evite hoje qualquer frase do tipo \"você não era assim antes\". Substitua por silêncio orante.",
  },
  {
    dia: 13,
    semana: 2,
    titulo: "Cobertura Sobre as Finanças e o Propósito Dele",
    versiculo: "O Senhor é o meu pastor, nada me faltará.",
    referencia: "Salmos 23:1",
    reflexao:
      "Se ele está travado financeiramente ou sem propósito, isso afeta a autoestima e o espírito dele profundamente. Hoje você ora por direção e provisão, não por cobrança de resultado.",
    oracao:
      "Senhor, abre portas de propósito e provisão para o meu marido. Que ele encontre direção clara para o trabalho das suas mãos. Tira dele o peso da vergonha e coloca nele a confiança de que Tu cuidas da nossa casa. Em nome de Jesus, amém.",
    acao:
      "Evite comentários sobre dinheiro hoje. Ore em silêncio por essa área específica.",
  },
  {
    dia: 14,
    semana: 2,
    titulo: "Descanso e Reflexão da Segunda Semana",
    versiculo:
      "Sede fortes e corajosos... porque o Senhor, vosso Deus, é quem vai com vocês.",
    referencia: "Deuteronômio 31:6",
    reflexao:
      "Você completou 14 dias. Pare e observe: o que mudou em você até aqui? A oração com direção já começou a transformar seu próprio coração, mesmo antes de qualquer mudança visível nele.",
    oracao:
      "Senhor, obrigada por Tua fidelidade nesses 14 dias. Eu sigo confiando, mesmo sem ver tudo o que desejo ainda. Renova minhas forças para a última semana dessa jornada. Em nome de Jesus, amém.",
    acao:
      "Releia suas anotações dos dias anteriores e celebre sua constância até aqui.",
  },
  {
    dia: 15,
    semana: 3,
    titulo: "Iniciando o Jejum com Propósito",
    versiculo: "Quando jejuardes, não vos mostreis tristes como os hipócritas.",
    referencia: "Mateus 6:16",
    reflexao:
      "A partir de hoje, se tiver condições de saúde para isso, você pode somar um jejum leve (de uma refeição, de redes sociais, ou de algo pessoal) aos próximos 7 dias, como expressão de intensidade na sua busca por Deus.",
    oracao:
      "Senhor, eu apresento meu jejum como sinal de que dependo de Ti mais do que de qualquer outra coisa. Que esse sacrifício abra portas espirituais sobre o meu casamento. Em nome de Jesus, amém.",
    acao:
      "Escolha conscientemente o que você vai jejuar nos próximos dias (se for saudável para você fazer isso).",
  },
  {
    dia: 16,
    semana: 3,
    titulo: "Orando pela Cobertura Espiritual da Casa",
    versiculo: "Quanto a mim e à minha casa, serviremos ao Senhor.",
    referencia: "Josué 24:15",
    reflexao:
      "Hoje você declara, com autoridade espiritual de esposa, que a sua casa pertence a Deus — independente de onde seu marido esteja espiritualmente agora.",
    oracao:
      "Senhor, eu declaro esta casa Tua. Que nenhuma influência contrária à Tua vontade tenha lugar aqui. Cubro com o sangue de Jesus as portas, os corações e as decisões dessa família. Em nome de Jesus, amém.",
    acao: "Ore caminhando por cada cômodo da casa, declarando paz e proteção.",
  },
  {
    dia: 17,
    semana: 3,
    titulo: "Rompendo Influências Externas",
    versiculo: "Não se deixem enganar: más companhias corrompem os bons costumes.",
    referencia: "1 Coríntios 15:33",
    reflexao:
      "Se há pessoas ou ambientes que têm afastado seu marido de Deus, hoje é dia de orar especificamente por isso, sem necessariamente confrontá-lo.",
    oracao:
      "Senhor, eu rompo qualquer influência que tem afastado meu marido de Ti. Substitui essas companhias por pessoas que o aproximem da Tua vontade. Que ele sinta o vazio de ambientes que não o edificam. Em nome de Jesus, amém.",
    acao:
      "Não critique as amizades dele hoje. Ore por substituição divina em silêncio.",
  },
  {
    dia: 18,
    semana: 3,
    titulo: "A Esposa Como Sacerdotisa do Lar",
    versiculo: "A oração feita por um justo pode muito em seus efeitos.",
    referencia: "Tiago 5:16",
    reflexao:
      "Você tem mais autoridade espiritual sobre essa situação do que imagina. Hoje, ore com a convicção de quem está exercendo um papel sacerdotal dentro da própria casa.",
    oracao:
      "Senhor, eu assumo meu lugar de intercessora por essa família. Que minhas orações tenham efeito poderoso, como Tua Palavra promete. Eu creio que estás agindo, mesmo no silêncio. Em nome de Jesus, amém.",
    acao:
      "Ore em voz alta hoje, mesmo que sozinha em um cômodo, declarando fé sobre o seu casamento.",
  },
  {
    dia: 19,
    semana: 3,
    titulo: "Preparando o Coração Para a Resposta",
    versiculo: "Tudo quanto pedirdes em oração, crede que recebereis, e tê-lo-eis.",
    referencia: "Marcos 11:24",
    reflexao:
      "Faltam poucos dias. Hoje, prepare seu coração para reconhecer a resposta de Deus, mesmo que ela venha de forma diferente do que você imaginou.",
    oracao:
      "Senhor, abre meus olhos para reconhecer Tua resposta, mesmo que ela não venha da forma que eu esperava. Ajuda-me a não perder a fé pelos detalhes e a confiar no Teu tempo perfeito. Em nome de Jesus, amém.",
    acao:
      "Anote um sinal, mesmo pequeno, de que algo já está diferente desde o início dessa jornada.",
  },
  {
    dia: 20,
    semana: 3,
    titulo: "Perseverança Até o Fim",
    versiculo: "E não nos cansemos de fazer o bem, pois no tempo próprio colheremos.",
    referencia: "Gálatas 6:9",
    reflexao:
      "O dia 20 é sobre perseverança. Mesmo que ainda não veja a transformação completa, você está mais próxima do que estava há 19 dias. Não desista agora.",
    oracao:
      "Senhor, dá-me perseverança para continuar orando, mesmo quando o cansaço quiser me fazer desistir. Eu creio que estou colhendo, mesmo sem ver toda a colheita ainda. Em nome de Jesus, amém.",
    acao: "Releia o Dia 1 e compare com como você se sente hoje.",
  },
  {
    dia: 21,
    semana: 3,
    titulo: "Celebração e Renovação da Aliança",
    versiculo: "Até aqui nos ajudou o Senhor.",
    referencia: "1 Samuel 7:12",
    reflexao:
      "Você completou os 21 dias. Independente de onde seu marido esteja hoje espiritualmente, você não é mais a mesma mulher que começou essa jornada. Hoje é dia de celebrar a sua constância e renovar sua aliança de fé com Deus pelo seu casamento.",
    oracao:
      "Senhor, obrigada por esses 21 dias. Obrigada por trabalhar em mim enquanto eu orava por ele. Eu renovo minha aliança de fé, confiando que Tu continuarás agindo no coração do meu marido, no Teu tempo e à Tua maneira. Em nome de Jesus, amém.",
    acao:
      "Escreva uma carta de oração para o futuro do seu casamento e guarde-a. Releia em 30, 60 e 90 dias.",
  },
]

/* ------------------------------------------------------------------ */
/* MÓDULO 2 — ORAÇÕES DE LIBERTAÇÃO                                    */
/* ------------------------------------------------------------------ */

export const LIBERATION_PRAYERS: LiberationPrayer[] = [
  {
    chainId: "escravidao",
    titulo: "Corrente da Escravidão (Vícios)",
    texto:
      "Em nome de Jesus, eu rompo toda aliança que o vício fez com a mente e o corpo do meu marido. Declaro que ele não pertence a nenhuma substância, nenhum hábito, nenhuma escravidão. Senhor, liberta-o como libertaste tantos na Tua Palavra. Que o desejo pelo vício diminua e o desejo por Ti aumente a cada dia. Cubro a vontade dele com o sangue de Jesus. Amém.",
  },
  {
    chainId: "coracao-endurecido",
    titulo: "Corrente do Coração Endurecido (Frieza Emocional)",
    texto:
      "Senhor, eu peço que reblandeças o coração do meu marido. Onde há pedra, coloca carne. Onde há indiferença, acende sensibilidade. Que ele volte a sentir, a se emocionar, a se conectar — comigo, com os filhos, e principalmente Contigo. Em nome de Jesus, amém.",
  },
  {
    chainId: "impureza",
    titulo: "Corrente da Impureza (Pornografia/Problemas Sexuais)",
    texto:
      "Pai, eu rompo, em nome de Jesus, qualquer fortaleza de impureza sobre a mente do meu marido. Que os olhos dele sejam guardados e o coração dele purificado. Que Tu sejas mais atraente para ele do que qualquer imagem ou tentação. Restaura nossa intimidade conforme o Teu propósito original. Em nome de Jesus, amém.",
  },
  {
    chainId: "escassez",
    titulo: "Corrente da Escassez (Financeiro/Propósito)",
    texto:
      "Senhor, eu declaro provisão e direção sobre a vida profissional do meu marido. Tira dele a vergonha da estagnação e coloca nele a confiança de que tens um plano de prosperidade. Abre portas que homem nenhum possa fechar. Em nome de Jesus, amém.",
  },
  {
    chainId: "ira",
    titulo: "Corrente da Ira (Raiva/Agressividade)",
    texto:
      "Pai, eu peço mansidão sobre o coração do meu marido. Que o Espírito Santo o convença antes que a ira tome conta dele. Que ele aprenda a responder com calma, não com explosão. Cubro nossa casa contra qualquer ambiente de hostilidade. Em nome de Jesus, amém.",
  },
  {
    chainId: "incredulidade",
    titulo: "Corrente da Incredulidade (Resistência Espiritual)",
    texto:
      "Senhor, eu rompo qualquer véu de incredulidade sobre os olhos espirituais do meu marido. Que ele Te veja como realmente és — não como uma religião de regras, mas como um Pai que ama. Atrai o coração dele para Ti, antes que seja eu quem o atraia. Em nome de Jesus, amém.",
  },
  {
    chainId: "opressao",
    titulo: "Corrente da Opressão (Ansiedade/Depressão/Vazio)",
    texto:
      "Pai, eu declaro paz sobre a mente do meu marido. Que toda opressão, todo peso invisível que ele carrega, seja levantado pelo poder do Espírito Santo. Que ele encontre em Ti o descanso que nenhuma outra coisa pôde dar. Em nome de Jesus, amém.",
  },
]

/* ------------------------------------------------------------------ */
/* MÓDULO — CAMPANHA DA COBERTURA CONJUGAL                             */
/* ------------------------------------------------------------------ */

export const COBERTURA_PRAYERS: CoberturaPrayer[] = [
  {
    titulo: "Proteção Física",
    texto:
      "Senhor, eu cubro com o sangue de Jesus a saúde, a segurança e a integridade física do meu marido. Protege-o em seus caminhos, em seu trabalho, em cada deslocamento. Que nenhum mal o alcance. Que ele tenha disposição, saúde e vigor para cumprir o propósito que Tu tens para a vida dele. Em nome de Jesus, amém.",
  },
  {
    titulo: "Proteção Emocional",
    texto:
      "Pai, eu peço proteção sobre as emoções do meu marido. Que ele não seja levado por desânimo, desespero ou solidão. Que ele encontre em mim e principalmente em Ti um porto seguro para suas lutas internas. Cura qualquer ferida emocional que ele ainda carrega, mesmo que ele nunca tenha me contado sobre ela. Em nome de Jesus, amém.",
  },
  {
    titulo: "Proteção Espiritual",
    texto:
      "Senhor, eu visto meu marido com a armadura espiritual, mesmo que ele ainda não saiba disso. Cubro a mente dele contra mentiras do inimigo. Cubro o coração dele contra qualquer voz que não seja a Tua. Declaro que nenhuma força espiritual contrária tem poder sobre ele, porque eu intercedo em nome de Jesus, que é maior que qualquer outro nome. Amém.",
  },
]

/* ------------------------------------------------------------------ */
/* MÓDULO — CONVERSAS QUE TRAZEM DEUS PARA O LAR                       */
/* ------------------------------------------------------------------ */

export const CONVERSAS_PRINCIPIO =
  "Antes de qualquer conversa, lembre-se: você não está tentando \"converter\" seu marido com argumentos. Você está sendo um instrumento, enquanto Deus trabalha o coração dele no tempo Dele. Cobrança gera resistência. Presença gentil gera abertura."

export const CONVERSAS_EVITAR = [
  "Comparações (\"Fulano vai à igreja todo domingo e você nem...\")",
  "Ultimatos espirituais (\"Se você não mudar, eu...\")",
  "Sermões longos e repetitivos",
  "Falar de fé só quando está brava com ele",
  "Citar versículos como \"arma\" numa discussão",
]

export const CONVERSAS_ESTRATEGIAS: ConversaEstrategia[] = [
  {
    titulo: "Viva, não apenas fale",
    texto:
      "A forma mais poderosa de evangelizar dentro de casa é através do exemplo. Ore visivelmente (sem performance), reaja com paz nos momentos difíceis, perdoe rápido. Isso fala mais alto que qualquer palavra.",
  },
  {
    titulo: "Use perguntas, não afirmações",
    texto:
      "Em vez de \"Você precisa voltar para Deus\", experimente: \"Você já sentiu que está faltando algo, mesmo quando tudo parece estar bem?\" Perguntas abrem espaço; afirmações fecham portas.",
  },
  {
    titulo: "Escolha o momento certo",
    texto:
      "Nunca inicie uma conversa espiritual durante ou imediatamente após uma briga. Espere um momento de paz, talvez durante uma refeição tranquila ou um momento de descanso juntos.",
  },
  {
    titulo: "Compartilhe sua própria jornada, não a dele",
    texto:
      "Fale sobre o que Deus está fazendo em você, não sobre o que ele \"deveria\" fazer. Por exemplo: \"Eu tenho orado muito esses dias e sinto uma paz diferente\" abre mais portas do que \"Você devia orar mais\".",
  },
  {
    titulo: "Convide, não exija",
    texto:
      "\"Você gostaria de orar comigo antes de dormir hoje?\" é muito mais eficaz do que \"A gente precisa orar junto, isso é obrigação de casal cristão\".",
  },
]

export const CONVERSAS_FRASES: FrasePronta[] = [
  {
    momento: "Quando ele estiver estressado",
    frase: "Eu vou orar por você hoje. Você não precisa carregar isso sozinho.",
  },
  {
    momento: "Quando ele tiver uma vitória, mesmo pequena",
    frase: "Fico feliz por você. Acho que Deus tem cuidado de nós, sabe?",
  },
  {
    momento: "Quando ele estiver resistente a falar de fé",
    frase:
      "Tudo bem, eu não vou insistir. Só quero que saiba que estou aqui e que oro por você todos os dias.",
  },
  {
    momento: "Quando vocês tiverem um momento de paz",
    frase: "Posso te contar uma coisa que tenho sentido na minha caminhada com Deus?",
  },
]

/* ------------------------------------------------------------------ */
/* MÓDULO — 21 DIAS DE CLAMOR                                          */
/* ------------------------------------------------------------------ */

export const CLAMOR: ClamorDia[] = [
  { dia: 1, foco: "Pela honestidade do meu próprio coração diante de Deus" },
  { dia: 2, foco: "Pelo fim da comparação entre meu marido e outros" },
  { dia: 3, foco: "Pela cura das mágoas acumuladas entre nós" },
  { dia: 4, foco: "Pela libertação de vícios e escravidões" },
  { dia: 5, foco: "Pelo amolecimento do coração espiritual dele" },
  { dia: 6, foco: "Pela proteção espiritual da nossa casa" },
  { dia: 7, foco: "Por descanso e renovação das minhas forças" },
  { dia: 8, foco: "Pela restauração da intimidade entre nós" },
  { dia: 9, foco: "Por palavras de vida saindo da minha boca" },
  { dia: 10, foco: "Por sabedoria nas conversas com ele" },
  { dia: 11, foco: "Pela renovação da mente dele" },
  { dia: 12, foco: "Por libertação das comparações com o passado" },
  { dia: 13, foco: "Por provisão e propósito profissional para ele" },
  { dia: 14, foco: "Por gratidão pelo progresso até aqui" },
  { dia: 15, foco: "Por força e propósito no jejum" },
  { dia: 16, foco: "Pela cobertura espiritual completa da casa" },
  { dia: 17, foco: "Por ruptura de influências externas negativas" },
  { dia: 18, foco: "Por autoridade espiritual como intercessora" },
  { dia: 19, foco: "Por discernimento para reconhecer a resposta de Deus" },
  { dia: 20, foco: "Por perseverança até o fim da jornada" },
  { dia: 21, foco: "Por celebração e renovação da aliança de fé" },
]

export const CLAMOR_COMO_USAR =
  "Leia o foco do dia pela manhã e volte a ele mentalmente 2 a 3 vezes ao longo do dia, especialmente em momentos de tensão ou cansaço. Você pode sussurrar uma oração curta, como: \"Senhor, hoje eu clamo por [foco do dia].\" Isso mantém você em estado de oração constante, mesmo em meio à rotina."

/* ------------------------------------------------------------------ */
/* MÓDULO — COLEÇÃO DE CONTEÚDOS QUE ATIVAM A FÉ                       */
/* ------------------------------------------------------------------ */

export const CONTEUDOS: ConteudoItem[] = [
  {
    categoria: "Filmes para assistir sozinha (fortalecer sua fé)",
    itens: [
      { titulo: "À Prova de Fogo (Fireproof)", descricao: "Restauração de casamento através da fé" },
      { titulo: "War Room — A Sala de Guerra", descricao: "O poder da intercessão de uma esposa" },
      { titulo: "Milagres do Céu", descricao: "Fé em momentos de dor" },
      { titulo: "A Cabana", descricao: "Perdão e relacionamento com Deus" },
    ],
  },
  {
    categoria: "Filmes para sugerir assistirem juntos (sem forçar)",
    itens: [
      { titulo: "Invictus", descricao: "Liderança, perdão e propósito" },
      { titulo: "O Resgate do Soldado Ryan", descricao: "Sacrifício e companheirismo" },
      {
        titulo: "Dica",
        descricao:
          "Comece pelos filmes menos \"evidentemente religiosos\" se ele tiver resistência. O objetivo é abrir o coração, não confrontar.",
      },
    ],
  },
  {
    categoria: "Livros para você",
    itens: [
      { titulo: "A Esposa Intercessora", descricao: "O papel espiritual da mulher no lar" },
      { titulo: "Louca de Amor", descricao: "Perseverança no casamento" },
      { titulo: "Salmos 27, 91 e 121", descricao: "Leitura diária de fortalecimento" },
    ],
  },
  {
    categoria: "Livros para sugerir a ele, com leveza",
    itens: [
      { titulo: "Biografias de homens de fé com passados difíceis", descricao: "Conversões de atletas, empresários" },
      { titulo: "Livros sobre propósito masculino e liderança no lar", descricao: "Costumam ser mais bem recebidos por homens" },
    ],
  },
  {
    categoria: "Músicas para ambientar a casa",
    itens: [
      { titulo: "Hinos instrumentais suaves de fundo" },
      { titulo: "Adoração contemporânea sobre restauração e família" },
      { titulo: "Playlists de música ambiente cristã" },
    ],
  },
  {
    categoria: "Canais e conteúdos para acompanhar",
    itens: [
      { titulo: "Pregações curtas (15-20 min)", descricao: "Propósito, família, finanças, masculinidade" },
      { titulo: "Testemunhos reais de homens restaurados", descricao: "Geram mais identificação que sermões" },
      { titulo: "Podcasts cristãos voltados para homens", descricao: "Ouvidos por você primeiro, mencionados casualmente depois" },
    ],
  },
]

export const CONTEUDOS_COMO_USAR = [
  "Nunca anuncie \"vou te mostrar um filme cristão\". Apenas proponha: \"Vamos ver um filme hoje?\"",
  "Deixe o conteúdo no ambiente (música de fundo, livro na mesa) sem comentar.",
  "Compartilhe sua própria experiência, não a expectativa sobre a dele.",
  "Não force conversa depois do filme/conteúdo. Se ele quiser comentar, ele vai comentar.",
]

/* ------------------------------------------------------------------ */
/* MÓDULO — MAPA DAS INFLUÊNCIAS (Correntes do Passado / bônus)        */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* VERSÍCULOS DE BOAS-VINDAS (rotativos por dia)                       */
/* ------------------------------------------------------------------ */

export const WELCOME_VERSES: { texto: string; referencia: string }[] = [
  {
    texto: "O Senhor pelejará por vós, e vós vos calareis.",
    referencia: "Êxodo 14:14",
  },
  {
    texto: "Eu e a minha casa serviremos ao Senhor.",
    referencia: "Josué 24:15",
  },
  {
    texto: "Porque para Deus nada é impossível.",
    referencia: "Lucas 1:37",
  },
  {
    texto:
      "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.",
    referencia: "Isaías 41:10",
  },
  {
    texto:
      "Aquietai-vos e sabei que eu sou Deus.",
    referencia: "Salmos 46:10",
  },
  {
    texto:
      "O que em vós começou a boa obra a aperfeiçoará até ao dia de Cristo Jesus.",
    referencia: "Filipenses 1:6",
  },
  {
    texto:
      "Lança o teu cuidado sobre o Senhor, e ele te susterá.",
    referencia: "Salmos 55:22",
  },
  {
    texto:
      "A oração feita por um justo pode muito em seus efeitos.",
    referencia: "Tiago 5:16",
  },
]

/** Retorna o versículo do dia com base na data (rotação simples). */
export function versiculoDoDia(now = Date.now()): {
  texto: string
  referencia: string
} {
  const diaDoAno = Math.floor(now / (1000 * 60 * 60 * 24))
  return WELCOME_VERSES[diaDoAno % WELCOME_VERSES.length]
}

/* ------------------------------------------------------------------ */
/* MENSAGENS DE REFORÇO (variáveis, tom devocional)                    */
/* ------------------------------------------------------------------ */

export const REFORCO_INATIVA = [
  "Seu marido precisa das suas orações hoje. Vamos continuar?",
  "Um dia de pausa não te define. Volte com fé.",
  "Deus não desistiu da sua casa. E você também não vai desistir.",
]

export const REFORCO_ATIVA = [
  "Você está consistente! Isso já é uma vitória.",
  "Cada dia de oração conta mais do que você imagina.",
  "Sua firmeza está abrindo caminhos no invisível.",
  "Continue assim — o céu registra cada clamor seu.",
]

export const REFORCO_MARCO = [
  "Falta só 1 dia para um marco importante!",
  "Você está prestes a alcançar uma nova conquista. Não pare!",
]

/* ------------------------------------------------------------------ */
/* FRASES DE CELEBRAÇÃO (por progresso do devocional)                  */
/* ------------------------------------------------------------------ */

export function fraseCelebracao(diasConcluidos: number): string {
  if (diasConcluidos >= 21) return "Você completou a jornada!"
  if (diasConcluidos >= 15) return "Você está quase lá. Não pare agora."
  if (diasConcluidos >= 8) return "Mais da metade do caminho! Continue firme."
  return "Você está construindo um hábito poderoso."
}

export const INFLUENCIAS: InfluenciaCategoria[] = [
  {
    titulo: "Influências de Amizades",
    perguntas: [
      "Quem são as pessoas que ele mais frequenta hoje?",
      "Essas amizades o aproximam ou afastam de uma vida de fé e família?",
      "Existe algum amigo que incentiva comportamentos que vocês já identificaram como problemáticos?",
    ],
    oracao:
      "Senhor, eu Te entrego as amizades do meu marido. Onde houver influência que o afasta de Ti, eu peço que Tu mesmo cries distância. Onde houver ausência de amizades que o edificam, eu peço que Tu envies pessoas de propósito para o caminho dele. Em nome de Jesus, amém.",
  },
  {
    titulo: "Influências de Ambiente de Trabalho",
    perguntas: [
      "O ambiente de trabalho dele é tóxico, estressante ou cheio de tentações específicas?",
      "Colegas têm incentivado hábitos prejudiciais (bebida após o expediente, cultura de excesso)?",
    ],
    oracao:
      "Pai, eu cubro o ambiente de trabalho do meu marido. Que ele seja luz onde estiver, e não absorva a escuridão que encontrar. Protege a mente e o coração dele durante as horas em que não estou ao lado dele. Em nome de Jesus, amém.",
  },
  {
    titulo: "Influências Digitais",
    perguntas: [
      "Quais conteúdos ele consome nas redes sociais, sem perceber o efeito acumulado?",
      "Existem perfis, grupos ou conteúdos que normalizam comportamentos contrários aos valores de vocês?",
    ],
    oracao:
      "Senhor, guarda os olhos e a mente do meu marido do que ele consome digitalmente. Que algoritmos e conteúdos que o afastam de Ti percam força sobre ele. Atrai a atenção dele para o que edifica, não para o que destrói. Em nome de Jesus, amém.",
  },
  {
    titulo: "Influências Familiares (de Origem)",
    perguntas: [
      "Existem padrões da família de origem dele que ainda influenciam o comportamento hoje?",
      "Ele já viu modelos de masculinidade ou de fé que precisam ser \"desaprendidos\"?",
    ],
    oracao:
      "Pai, eu rompo qualquer padrão geracional negativo que tenha sido passado para o meu marido através da família dele. Que ele se torne o homem que Tu projetaste, não a repetição de feridas antigas. Em nome de Jesus, amém.",
  },
]
