---
title: 'Servir websockets com nginx'
pubDate: '2024-02-03'
---

### Configuração inicial

Exemplo de configuração do site com nginx:

```nginx
# Upstream da sua aplicação com endereço ip e porta
upstream website {
  server 127.0.0.1:3000;
}

# Configuração padrão do serviço com ssl
server {
  listen 443 ssl;
  listen [::]:443 ssl;

  ssl_certificate /etc/letsencrypt/live/website.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/website.com/privkey.pem;

  location / {
    proxy_pass http://website;
  }
}
```

### Configuração dos headers de requisição

É preciso atualizar os headers da aplicação para que o redirecionamento mantenha os dados da requisição e adicione informações do nginx:

```diff
  ...
  location / {
+   proxy_set_header Host $host;
+   proxy_set_header X-Real-IP $remote_addr;
+   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
+   proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Habilitar websocket

É preciso atualizar os headers na configuração do nginx para que seja possível a atualização da conexão para _websockets_:

```diff
    ...
    location / {
+     proxy_http_version 1.1;
+     proxy_set_header Upgrade $http_upgrade;
+     proxy_set_header Connection "Upgrade";
  }
```
