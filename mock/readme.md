# como executar o Json Server

1. Abra o terminal e digite:

```
npm install -D json-server
```
2. criar a pasta mock na raiz do projeto

3. criar o arquivo database.json

4. no arquivo database.json criar um elemento inicial
```
{
  "pessoas": []
}
```
5. no package.json, na sessão de Scripts, colocar:

```
"jsonserver": "json-server -w -p 3333 ./mock/database.json"
```

6. rodar no terminal 

```
npm run jsonserver
```