import { nodes, root, state } from "membrane";

export function formFor({ args: { action, path, method } }) {
  // action.params
  // TODO: read from ref
  const params = [
    {
      name: "title",
      type: "String",
    },
    {
      name: "dueDate",
      type: "String",
    }
  ];

  // extract fields
  let html: string = "";
  for (const item of params) {
    const name: string = item.name;
    let type: string = "";
    switch (item.type) {
      case "String":
        type = "text";
        break;
      case "Int":
        type = "number";
        break;
      case "Boolean":
        type = "checkbox";
        break;
      // add more or not?
      default:
        "text";
        break;
    }
    html = html + `
      <div>
        <label class="large-label" for="${name}">${name}:</label>
        <input type="${type}" id="${name}" name="${name}">
      </div>
    `;
  }
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>html demo</title>
        <link href="https://fonts.cdnfonts.com/css/roboto-mono" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://eteekin.eus/wp-content/uploads/2018/11/normalize_reset.css"
        />
        <style>
          body {
            margin: 0;
            background-color: #f9f9f9;
            color: #333;
            font: 100% "Roboto Mono", sans-serif;
          }
          .large-label,
          button {
            font-family: "Roboto Mono", sans-serif;
          }
          main {
            margin: 10px;
          }
          form {
            box-sizing: border-box;
            padding: 1rem;
            border-radius: 0;
            background-color: #fff;
            border: 1px solid #999;
            display: flex;
            width: 350px;
            flex-direction: column;
            box-shadow: 2px 2px;
          }
          button,
          fieldset,
          input,
          legend,
          select,
          textarea {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-color: transparent;
            border: 1px solid #aaa;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          input[type="email"],
          input[type="text"],
          select,
          textarea {
            font-family: "Roboto Mono", sans-serif;
            display: block;
            box-sizing: border-box;
            width: 100%;
          }
          .buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
          }
          button {
            width: 40%;
            height: 30px;
          }
          button[type="submit"] {
            background: #4e1;
            border: 1px solid #000;
          }
          .large-label {
            display: inline-block;
            margin-top: 1rem;
            text-transform: capitalize;
            font-size: medium;
          }
        </style>
      </head>
      <body>
        <main>
          <form action="${path}" method="${method}">
            <div class="inputs">${html}</div>
            <div class="buttons">
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </main>
      </body>
    </html>
  `;
}
