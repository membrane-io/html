import { nodes, root, state } from "membrane";

export const Root = {
  form: async ({ args: { action, path, method, title } }) => {
    const params = JSON.parse(
      JSON.parse(await nodes.graph.argsInfo({ gref: action }).$get())
    );

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
        case "Float":
          type = "number";
          break;
        // add more or not?
        default:
          "text";
          break;
      }
      html =
        html +
        `
        <div class="pront">
          <label class="large-label" for="${name}">${name}:</label>
          <input class="block-content" type="${type}" id="${name}" name="${name}">
        </div>
      `;
    }

    return base(`
      <form action="${path}" class="block-content centered" method="${method}">
        <div class="block header">
          <div class="block section-title3">
            <div class="block section-title2">
              <div class="block section-title">${title}</div>
            </div>
          </div>
        </div>
            <div class="">
              <div class="inputs">${html}</div>
              <div>
              <div class="buttons">
              <button class="block-content submit" type="submit">Submit</button>
              <button class="block-content" type="reset">Reset</button>
            </div>
          </div>
        </div>
      </form>`);
  },
  render: async ({ args: { field, query } }) => {
    const { fields } = JSON.parse(
      JSON.parse(await nodes.graph.typeInfo({ gref: field }).$get())
    );

    const values = JSON.parse(await field.$query(query));

    let htmlFields: string = "";
    for (const item of fields) {
      const { type, name } = item;
      if (!(name === "gref")) {
        htmlFields =
          htmlFields +
          `<h4><span data-tooltip="${type}">${name}: ${values[name]}</span></h4> `;
      }
    }

    return base(`
        <div>
          <div>
            <h2>Fields</h2>
            ${htmlFields}
          <div>
        </div>
    `);
  },
};

function base(code: string) {
  return `  <!DOCTYPE html>
  <html>
    <head>
      <title>Membrane.io - Program</title>
      <link href="https://fonts.cdnfonts.com/css/roboto-mono" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://eteekin.eus/wp-content/uploads/2018/11/normalize_reset.css"
      />
      <style>
      [data-tooltip] {
        position: relative;
        border-bottom: 1px dashed #000;
        cursor: help
      }
      
      [data-tooltip]::after {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        content: attr(data-tooltip);
        right: calc(100% + 10px);
        border-radius: 0px;
        box-shadow: 0 0 1px 1px rgb(100 100 100 / 60%);
        background-color: white;
        z-index: 10;
        padding: 8px;
        width: 60px;
        transform: translateY(-20px);
        transition: all 150ms cubic-bezier(.25, .8, .25, 1);
      }
      
      [data-tooltip]:hover::after {
        opacity: 1;
        transform: translateY(0);
        transition-duration: 300ms;
      }
      body {
        margin: 0;
        background-color: #f9f9f9;
        color: #333;
      }

      .large-label,
      button {}

      main {
        margin: 10px;
      }

      form {}

      button,
      fieldset,
      input,
      legend,
      select,
      textarea {}

      input[type="email"],
      input[type="text"],
      input[type="number"],
      select,
      textarea {
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
        border-radius: 0px;
        border: 1px solid var(--color-button-background);
        font-family: var(--font-bold);
        font-weight: var(--font-bold-weight);
        text-transform: uppercase !important;
        font-size: 7pt;
        color: var(--color-button-ok-text);
        background: #999;
      }

      button[type="submit"] {
        background: #4e1;
        border: 1px solid #000;
      }

      .large-label {
        text-transform: capitalize;
      }

      /*! CSS Used from: https://www.membrane.io/_next/static/css/8ffefcb0a99c7a9f.css */
      html {
        line-height: 1.15;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      footer,
      section {
        display: block;
      }

      main {
        display: block;
      }

      button,
      input {
        font-family: sans-serif;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }

      button,
      input {
        overflow: visible;
      }

      button {
        text-transform: none;
      }

      button {
        -webkit-appearance: button;
      }

      button::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }

      button:-moz-focusring {
        outline: 1px dotted ButtonText;
      }

      body,
      html {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      @media (prefers-color-scheme:dark) {
        html {
          color-scheme: dark;
        }

        body {
          color: #fff;
          background: #000;
        }
      }

      *,
      :after,
      :before {
        box-sizing: border-box;
      }

      body {
        --color-background: #fff;
        --color-disabled: #eee;
        --color-highlight: #f36;
        --color-connector: #000;
        --color-error: #f33;
        --color-footer-background: #bbb;
        --color-group-background: #efefef;
        --color-drop-potential: #a9d;
        --color-drop-hover: #9da;
        --color-main: #000;
        --color-faint: #9a9a9a;
        --color-fainter: #bbb;
        --color-less-faint: #888;
        --color-action: #63f;
        --color-event: #d3e;
        --color-input-background: #333;
        --color-input-focused-background: #000;
        --color-input-focused-border: #999;
        --color-input-underline: #888;
        --color-cli-border: #666;
        --color-cli-border-focus: #000;
        --color-button-background: #000;
        --color-button-text: #fff;
        --color-button-active-background: #ccc;
        --color-button-active-text: #000;
        --color-button-hover-background: #333;
        --color-button-disabled-text: #555;
        --color-button-disabled-background: #aaa;
        --color-button-disabled-border: #888;
        --color-button-ok-background: #4e1;
        --color-button-ok-text: #000;
        --color-button-ok-hover-background: #3c1;
        --color-button-ok-hover-text: #000;
        --color-sidebar-background: hsla(0, 0%, 92%, .8);
        --color-ref-tree-footer-background: hsla(0, 0%, 92%, .8);
        --color-ref-tree-footer-background-hover: hsla(0, 0%, 82%, .6);
        --color-desk-header: hsla(0, 0%, 78%, .6);
        --color-pane-background: hsla(0, 0%, 94%, .6);
        --color-menu-background: #efefef;
        --color-menu-text: #000;
        --color-menu-background-hover: #fff;
        --font-size-tiny: 7pt;
        --font-normal: MonoRegular, Inconsolata, Consolas, Monaco, monospace;
        --font-normal-weight: 400;
        --font-bold: MonoRegular, Inconsolata, sans-serif;
        --font-bold-weight: 700;
        --font-mono: MonoRegular, Inconsolata, Consolas, Monaco, monospace;
        --font-mono-weight: 400;
        font-family: var(--font-normal);
        font-weight: var(--font-normal-weight);
        line-height: 15px;
        font-size: 8pt;
        letter-spacing: .05ch;
        color: var(--color-main);
        background: var(--color-background);
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
      }

      input {
        font-family: var(--font-normal);
      }

      /*! CSS Used from: Embedded */
      .header.block {
        width: 100%;
        margin-top: -52px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .section-title3.block {
        -webkit-align-self: flex-start;
        -ms-flex-item-align: start;
        align-self: flex-start;
        margin: 29px;
      }

      .section-title.block {
        border-right: 8px solid#fff;
        border-left: 8px solid#fff;
        background: #fff;
        font-family: MonoBold;
      }

      .section-title2.block {
        border-right: 1px solid#000;
        border-left: 1px solid#000;
        height: 5px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      section.block {
        position: relative;
        margin: 20px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        -moz-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        background: #fff;
        border: 1px solid#999;
        padding: 20px;
        -webkit-box-shadow: 5px 5px;
        -moz-box-shadow: 5px 5px;
        box-shadow: 5px 5px;
      }

      /*! CSS Used from: Embedded */
      button.submit {
        user-select: none;
        border-radius: 0;
        border: 1px solid var(--color-button-background);
        margin: 1px;
        padding-top: 4px;
        padding-bottom: 3px;
        font-family: var(--font-bold);
        font-weight: var(--font-bold-weight);
        text-transform: uppercase;
        font-size: 7pt;
        background: var(--color-button-background);
        color: var(--color-button-text);
        outline: none;
        min-height: 19px;
        background: var(--color-button-ok-background);
        color: var(--color-button-ok-text);
      }

        /*! CSS Used from: Embedded */
        .centered.block-content {
          position: relative;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          -moz-box-orient: vertical;
          -moz-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -moz-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -moz-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          width: 100%;
        }

        input.block-content {
          width: 200px;
          margin-top: 15px;
          margin-bottom: 15px;
          -webkit-transition: all.12s ease-in;
          -moz-transition: all.12s ease-in;
          -o-transition: all.12s ease-in;
          transition: all.12s ease-in;
          border: none;
          border-bottom: 1px solid#aaa;
          outline: none;
        }

        .prompt.block-content {
          padding: 3px;
        }

        /*! CSS Used fontfaces */
        @font-face {
          font-family: MonoRegular;
          src: url(https://www.membrane.io/Font-Regular.woff) format("woff")
        }
        
        @font-face {
          font-family: MonoBold;
          src: url(https://www.membrane.io/Font-Bold.woff) format("woff")
        }
        
        @font-face {
          font-family: MonoItalic;
          src: url(https://www.membrane.io/Font-Italic.woff) format("woff")
        }
      
      </style>
    </head>
    <body>
      <main class="block-content centered">
        <section style="width: 500px" class="block">
          ${code}
        </section>
      </main>
    </body>
  </html>`;
}
