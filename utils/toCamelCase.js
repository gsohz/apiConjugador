const toCamelCase = (text) => {
  text = text.replaceAll("-", " ");
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let lowerCaseText = text.toLowerCase();

  return lowerCaseText
    .split(" ")
    .reduce(
      (string, char) => string + (char.charAt(0).toUpperCase() + char.slice(1))
    );
};

module.exports = { toCamelCase };
