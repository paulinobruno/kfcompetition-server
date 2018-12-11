# paal-workout-server
Node.js server for workout app
# Deploy no Heroku

## Criando a aplicação

```
$ heroku create paal-workout-server
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs
$ git remote add heroku https://git.heroku.com/paal-workout-server.git
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
