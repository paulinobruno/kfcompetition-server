# paal-kfcompetition-server
Node.js server for Kung Fu Competition app
# Deploy no Heroku

## Criando a aplicação

```
$ heroku create paal-kfcompetition-server
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs
$ git remote add heroku https://git.heroku.com/paal-kfcompetition-server.git
```

## Comandos úteis

Deploy:
```
$ npm run deploy
```

Scale (1 máquina do serviço web):
```
$ heroku ps:scale web=1
```

Checar situação:
```
$ heroku ps
```

Verificar logs:
```
$ heroku logs --tail
```

Rodar Local:
```
$ heroku local web
```
