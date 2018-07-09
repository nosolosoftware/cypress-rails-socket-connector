# ns-cypress-connector

Este plugin para Cypress permite ejecutar código en el ámbito de nuestro proyecto backend.

## Instalación

Para añadirlo en tu proyecto debes de ejecutar:

```
yarn add --save-dev ns-cypress-connector
```

Después debes de añadir en tu archivo de plugins (`cypress/plugins/index.js`) el siguiente código:

```
const nsCypressRunner = require('ns-cypress-runner');

module.exports = on => {
  const tasks = Object.assign({}, nsCypressRunner);

  on('task', tasks);
};
```

Además si quieres hacer uso de alguno de los comandos propios de Cypress que este plugin añade, debemos de importarlos en (`cypress/support/index.js`)

```
import 'ns-cypress-runner/commands/factory-bot';
import 'ns-cypress-runner/commands/database-cleaner';
```

## Uso

Por defecto este plugin no añade ningún comando personalizado de cypress, luego la única forma de usarlo sería:

```
cy.task('nsCypressConnector', {class: 'FactoryBot', 'create', ['user']});
```

Esto ejecutará en el ámbito de nuestro proyecto rails:

```
FactoryBot.create('user')
```
