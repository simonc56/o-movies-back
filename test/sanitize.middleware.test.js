import { describe, it } from "mocha";
import { expect } from "chai";
import sanitizeHtml from "sanitize-html";
import bodySanitizer from "../app/middlewares/sanitizeMiddleware.js";

describe("Sanitize Middleware", () => {
  
  it("should sanitize the body of the request", () => {
    // Créer un objet de requête simulé avec un corps contenant des chaînes potentiellement dangereuses
    const req = {
      body: {
        html: "<script>alert(\"XSS attack\")</script>",
        text: "Some text"
      }
    };

    // Créer un objet de réponse simulé
    const res = {};

    // Créer une fonction de middleware next simulée
    const next = () => {};

    // Appeler le middleware avec la requête, la réponse et la fonction next simulées
    bodySanitizer(req, res, next);

    // Vérifier que le corps de la requête a été correctement désinfecté
    expect(req.body.html).to.equal(sanitizeHtml(req.body.html));
    expect(req.body.text).to.equal("Some text");
  });

});
