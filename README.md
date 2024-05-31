# TypeCommerce Webhook Manager
Esse repositório é somente para fins educacionais.

## Instalação:

### Via Docker:
Todos os serviços foram configurados para rodar através do docker composer.
Abra o terminal na raiz do projeto e acesse:
```
cd docker
```
Execute o seguintes comandos em sequência (o primeiro pode levar alguns minutos):
```
docker compose build
docker compose up -d
```

#### Obs:
Se estiver em um sistema windows, deve ser necessário modificar o arquivo docker/docker-entrypoint-initdb.d/init-multiple-databases.sh para o fim de linha "LF".

No VSCode po ser feito aqui:

![image](https://github.com/BrunoGazineu/typecommerce-webhook-manager/assets/107951111/ffabab60-4c2f-40d3-b4fe-c7dda449c8fe)

## Manualmente (Não recomendado):
Para rodar os serviços manualmente será necessário ter instalado Node no meu sistema.

Será necessário criar arquivos .env.local para cada um dos serviços que utilizam variáveis de ambiente (Pode me ser requisitado).

Para cada seviço em "services", no terminal, será necessário rodar:
```
npm install
npm run start:dev
```

Para o frontend será necessário rodar:
```
npm install
npm run build
npm run start
```

O aplicativo pode ser acessado em: http://localhost:3000
Devido ao sistema de cache do next, as vezes pode ser necessário atualizar as páginas para ver as mudanças.

## Documentação de arquitetura:

Driagrama de Arquitetura:

![image](https://github.com/BrunoGazineu/typecommerce-webhook-manager/assets/107951111/53d377a0-c6d7-4ef4-b822-056e87bf4a7c)

## Escolhas Técnicas

### Arquitetura:

Considerando que se trata de um sistema de Ecommerce, presumi que o volume de requisições de novos eventos seria muito alto.
Com isso em mente, gostaria que esse serviço pudesse ser facilmente escalado horizontalmente. Para alcançar esse objetivo, optei por uma arquitetura de microsserviços.

Essa escolha resultou em um desenvolvimento mais complexo, exigindo a implementação de comunicações assíncronas e resilientes. Assim como um novo serviço para servir de Proxy Reverso (ApiGateway).

### Backend:

Escolhi o NestJS como principal framework de backend por ser facilmente escalável, altamente modular e oferecer suporte a microsserviços (Além de que foi mostrado como interesse pelo autor do desafio).

Embora o NestJS seja um framework maduro, fiquei tentado a utilizar .NET devido ao seu amplo suporte a microsserviços e às ferramentas robustas que oferece para lidar com os desafios associados.

### Docker:

Escolhi o Docker pela sua escalabilidade e com a visão futura de uma implantação com Kubernetes, para facilitar a escalabilidade horizontal dos contêineres necessários.

Embora esse escolha tenha levado a uma complexidade inicial, difícil depuração enquanto os serviços estão rodando em containers e a quantidade de memória alocada para as imagens.

### RabbitMQ

RabbitMQ é conhecido por ser confiável e robusto, além de que, quando comparado com sistemas parecidos como Kafka, apresenta uma latência mais baixa para entregas mais rápidas de mensagens em tempo real.

Embora não seja o ideal para altas taxas de transferência, julgando pelos requisitos do sistema, não será um grande problema.

### Replicação dos dados do serviço de WebhookService no serviço de EventDelivery

Pensando na alta demanda do EventDelivery, pensei ser necessário manter uma cópia dos webhooks existentes em seu banco de dados.
Assim, removendo a necessidade de serem feitas requisições ao WebhookService e garantindo a escalabilidade independente do EventDelivery.

Essa abordagem, infelizmente, resulta em duplicação de dados e lógica.

### Endpoint Service

O objetivo desse sistema é apenas auxiliar na depuração dos webhooks, oferencendo uma forma conveniente de gerar urls com "defeito". Não deve ser julgado como os outros serviços, pois foi feito com "qualidade inferior".

### Uso do NextJs e React

React é uma ótima escolha para renderizar dados de forma dinâmica, além de possuír uma biblioteca gigante de componentes para Ui e lógica. O Nextjs, como backend for frontend, é ótimo para garantir SSR e, devido aos server action, poder ainda se comunicar com os serviços dentro da mesma rede cloud. 

### Uso de seeds

Os serviços de seed foram concebidos com o objetivo de simplificar o desenvolvimento, fornecendo uma maneira conveniente de preencher os bancos de dados locais e permitir a reinicialização deles de forma rápida e fácil.

### Uso de gRPC

O uso de gRPC, nesse contexto, foi feita apenas para poupular o banco de dados do EventDelivery com os dados populados inicialmente no WebhookService.

Entretanto, o uso de gRPC é muito interessante pois garante uma comunicação de alta performance resultando em uma redução na latência.


