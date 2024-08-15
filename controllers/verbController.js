const axios = require("axios");
const cheerio = require("cheerio");
const { toCamelCase } = require("../utils/toCamelCase");

const getVerbConjugation = async (req, res) => {
  const { verb } = req.params;

  try {
    const url = `https://www.conjugacao.com.br/busca.php?q=${verb}`;
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);

    const conjugations = {};

    const flexionInfo = $(".flection-info");
    if (flexionInfo.length > 0) {
      const href = flexionInfo.find("a").attr("href");
      const baseVerb = href.split("/").slice(-2, -1)[0].replace("verbo-", ""); // Extrai o verbo base do href
      const correctUrl = `https://www.conjugacao.com.br/busca.php?q=${baseVerb}`;
      const { data } = await axios.get(correctUrl);

      $ = cheerio.load(data);
    }

    // Obtém conjugação da tabela "Indicativo" e "Subjuntivo"
    extractConjugations($, "#conjugacao .col-three", conjugations);

    // Obtém conjugação da tabela "Imperativo"
    extractConjugations($, "#conjugacao .col-two-third", conjugations);

    // Obtém conjugação da tabela "Infinitivo"
    extractConjugations($, "#conjugacao .col-one-third", conjugations);

    res.status(200).json(conjugations);
  } catch (error) {
    res.status(500).json("Erro ao obter a conjugação");
    console.error("Erro ao obter a conjugação: ", error);
  }
};

function extractConjugations($, selector, conjugations) {
  $(selector).each((index, rowElement) => {
    let categoryTitle = $(rowElement).find(".verb-tense--title").text();
    categoryTitle = toCamelCase(categoryTitle);

    if (!conjugations[categoryTitle]) {
      conjugations[categoryTitle] = {};
    }

    $(rowElement)
      .find(".verb-col")
      .each((verbIndex, verbElement) => {
        let tense = $(verbElement).find(".verb-tense--subtitle").text();
        tense = toCamelCase(tense);

        const forms = [];

        $(verbElement)
          .find(".f")
          .each((i, formElement) => {
            forms.push($(formElement).text().trim());
          });

        conjugations[categoryTitle][tense] = forms;
      });
  });
}

module.exports = { getVerbConjugation };
