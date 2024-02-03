---
title: "Certificados digitais auto assinados"
author:
  name: "Carlos Souza"
  profile: "https://avatars.githubusercontent.com/u/53836455?v=4"
---

### Requisitos
É necessário ter instalado `openssl`

### Passo a passo

Gerando chave privada (private key) e certificado de assinatura de requsição:

```bash
> openssl genrsa -aes256 -passout pass:gsahdg -out server.pass.key 4096
...
> openssl rsa -passin pass:gsahdg -in server.pass.key -out server.key
writing RSA key
> rm server.pass.key
> openssl req -new -key server.key -out server.csr
...
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:California
...
A challenge password []:
...
```

Gerando certificado SSL:

```bash
> openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

O arquivo `server.crt` e o `server.key` precisam ser expostos no seu servidor para que o ssl funcione.

---

#### Referências
- [Criar certificado digital auto assinado](https://devcenter.heroku.com/articles/ssl-certificate-self)
