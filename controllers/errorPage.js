//SENDING ERROR PAGE
exports.getErrorPage = (request, response, next) => {
  response.sendFile("error.html", { root: "views" });
};
