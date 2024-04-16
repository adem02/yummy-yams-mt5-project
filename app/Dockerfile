FROM node:18

# Installation des paquets et configurations
RUN apt-get update \
    && apt-get install -y mycli \
    && apt-get install -y less \
    && apt-get install -y tzdata \
    && npm install -g typescript \
    && npm install -g ts-node

# Définir le fuseau horaire et le shell
ENV TZ=Europe/Paris

ENV SHELL=/bin/bash

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Exécuter un shell interactif pour que vous puissiez utiliser le conteneur en tant qu'utilisateur malahtech
RUN /bin/bash
