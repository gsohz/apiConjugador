const express = require("express");
const verb = require("./routes/verb");

const app = express();
app.use(express.json());

app.use("/", verb);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
