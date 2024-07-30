const axios = require("axios");
const cheerio = require("cheerio");

const getVerbConjugation = async (req, res) => {
  const { verb } = req.params;

  try {
    const url = `https://www.conjugacao.com.br/busca.php?q=${verb}`;
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);

    const conjugations = {};

    // Caso o verbo pesquisado esteja flexionado pega a identificação apresentada pelo site e refaz a busca
    const flexionInfo = $(".flection-info");
    if (flexionInfo.length > 0) {
      const href = flexionInfo.find("a").attr("href");
      const baseVerb = href.split("/").slice(-2, -1)[0].replace("verbo-", ""); // Extrai o verbo base do href
      const correctUrl = `https://www.conjugacao.com.br/busca.php?q=${baseVerb}`;
      const { data } = await axios.get(correctUrl);

      $ = cheerio.load(data);
    }

    // Itera sobre cada linha de conjugação principal
    $("#conjugacao .conj-row").each((index, rowElement) => {
      // Obtém o título da categoria de conjugação (como "Indicativo", "Subjuntivo", etc.)
      const categoryTitle = $(rowElement)
        .find(".verb-tense--title")
        .text()
        .trim();

      // Inicializa a categoria se ainda não existir
      if (!conjugations[categoryTitle]) {
        conjugations[categoryTitle] = {};
      }

      // Itera sobre cada bloco de conjugação dentro da linha
      $(rowElement)
        .find(".verb-col")
        .each((verbIndex, verbElement) => {
          // Obtém o tempo verbal
          const tense = $(verbElement)
            .find(".verb-tense--subtitle")
            .text()
            .trim();

          // Inicializa o array para armazenar as formas verbais
          const forms = [];

          // Itera sobre cada elemento com a classe 'f'
          $(verbElement)
            .find(".f")
            .each((i, formElement) => {
              forms.push($(formElement).text().trim());
            });

          conjugations[categoryTitle][tense] = forms;
        });
    });

    res.status(200).json(conjugations);
  } catch (error) {
    res.status(500).json("Erro ao obter a conjugação");
    console.error("Erro ao obter a conjugação: ", error);
  }
};

module.exports = { getVerbConjugation };
