function status(request, response) {
  response
    .status(200)
    .json({ msg: "Os alunos do Deschamps são acima da média!" });
}

export default status;
