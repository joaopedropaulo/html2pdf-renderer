# html2pdf-renderer

Simple Node.js application that, given an HTML [mustache.js](https://github.com/janl/mustache.js) template and JSON input data, renders an HTML page or PDF document, server-side, with [puppeteer](https://github.com/puppeteer/puppeteer).

It exposes 2 endpoints:

- `/api/generate/pdf` - renders an HTML page based on a JSON input payload and an HTML template
- `/api/generate/html` - renders a PDF based on a JSON input payload and an HTML template

# Requirements

- [Docker](https://www.docker.com/get-started)
- Alternatively, [Node.js](https://nodejs.org), if not using Docker

# Building and running

If using Docker, simply run `docker-compose up -d`. That will build the Docker image and run it right after.

By default, the application runs with hot reload, meaning you can change it and immediately see it reflected on the container without having to install Node.js on your machine. However, if new packages are added to `package.json`, the Docker container should be deleted and the image needs rebuilt.

# Examples

Requests to both endpoints should be sent as `multipart/form-data`, with 2 form entries:

| Key      | Value                                                                      |
| -------- | -------------------------------------------------------------------------- |
| template | This should be the HTML Mustache template.                                 |
| input    | The JSON payload to be taken into account when generating the output file. |

## HTML - `/api/generate/html`

Considering the following HTML Mustache template:

```html
<div>
  <h2>{{title}}</h2>
  <h4>{{subtitle}}</h4>
  <div>
    {{#list}}
    <p>{{name}}</p>
    {{/list}}
  </div>
</div>
```

And the following JSON payload:

```json
{
  "title": "This is not a drill",
  "subtitle": "This is a subtitle",
  "list": [
    {
      "name": "A",
      "type": "yes"
    },
    {
      "name": "B",
      "type": "no"
    },
    {
      "name": "C",
      "type": "yes"
    }
  ]
}
```

The generated output HTML file would be:

```html
<div>
  <h2>This is not a drill</h2>
  <h4>This is a subtitle</h4>
  <div>
    <p>A</p>
    <p>B</p>
    <p>C</p>
  </div>
</div>
```

## PDF - `/api/generate/pdf`

Considering the previously given inputs for the HTML Mustache template and JSON payload, a request sent to this endpoint would generate a PDF version of the output HTML above.

For additional examples, please check the [examples](https://github.com/joaopedropaulo/html2pdf-renderer/tree/master/examples) folder.
