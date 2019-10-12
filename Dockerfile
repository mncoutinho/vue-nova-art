# build stage
FROM node:8 as build
# Declara o argumento ambiente a ser passado no momento do build (--build-arg ambiente=dev ou prod)
ARG ambiente
# Define app como o diretório de trabalho
WORKDIR /app
# Copia o projeto para dentro da imagem
COPY . .
# Instala o gulp globalmente
RUN set -xe \
    && npm install -g vue-cli quasar-cli \
    && rm -rf /var/cache/apk/* /tmp/*
RUN npm install
# Faz o gulp de acordo com o ambiente Dev ou Prod
RUN if [ "$ambiente" = "prod" ] ; then prod=true quasar build; elif [ "$ambiente" = "dev" ] ; then dev=true quasar build ; elif [ "$ambiente" = "local" ] ; then local=true quasar build ; else echo "Ambiente especificado é inválido" ; fi

# 
# ---- NGINX para servir o código ----
FROM nginx AS release

# Copia o resultado do build para o nginx
COPY --from=build /app/dist/creaonline  /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]