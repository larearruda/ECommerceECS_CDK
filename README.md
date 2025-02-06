# Anotações - Backend com NestJS na infraestrutura AWS, usando o AWS ECS e Fargate com AWS CDK
Tópicos que o curso aborda:
- AWS Cloud Formation
- AWS CDK - Cloud Development Kit
- AWS ECR - Elastic Container Registry
- VPC

## AWS Cloud Formation

AWS CloudFormation é uma ferramenta da AWS que permite modelar e provisionar recursos da AWS usando arquivos de configuração em formato JSON ou YAML. Ele é usado para definir infraestruturas como código, ou seja, você escreve uma descrição declarativa da infraestrutura que deseja criar, e o CloudFormation cuida da criação e gerenciamento dessa infraestrutura.

## CDK - Cloud Development kit
O AWS CDK é uma abordagem mais moderna e programática para criar recursos da AWS. Ao invés de usar YAML ou JSON, o CDK permite que você escreva código em linguagens de programação como JavaScript, TypeScript, Python, Java, C# e outras para definir sua infraestrutura como código.

O AWS CDK gera templates do CloudFormation automaticamente a partir do código que você escreve. Quando você executa o comando cdk deploy, o CDK converte o código em um template do CloudFormation e o envia para o serviço do CloudFormation para que ele provisiona os recursos da AWS.

Ou seja, o CDK é uma camada de abstração sobre o CloudFormation, tornando a criação de infraestrutura mais fácil e programática. O CDK oferece uma experiência de desenvolvimento mais interativa e de alto nível, mas, no fundo, ele ainda usa o CloudFormation para fazer a provisão real dos recursos na AWS.

### Iniciar um novo projeto cdk
```shell
cdk init --language typescript

# listar 
cdk list

cdk deploy --all --profile default
# ou 
cdk deploy <NOME DA STACK> --profile default
```

## Preparando a estrutura
Prepara sua conta e região AWS para permitir que o AWS CDK execute e implante recursos. Esse processo de "bootstrap" é necessário para o CDK poder provisionar recursos em sua conta AWS de forma eficiente.
```shell
cdk bootstrap --profile default 
```

## AWS ECR - Elastic Container Registry 

Passo 1 - Autenticar o Podman no Amazon Elastic Container Registry (ECR), permitindo que eu faça push e pull de imagens de contêiner para meu repositório privado da AWS.
```shell
aws ecr get-login-password --region us-east-1 | podman login --username AWS --password-stdin 471112844480.dkr.ecr.us-east-1.amazonaws.com
```

Passo 2 - Taggear a imagem com o nome do AWS ECR.
```shell
## unir imagem a tag
podman tag 60825aecaefb 471112844480.dkr.ecr.us-east-1.amazonaws.com/products-service:latest
```
Taggear uma imagem significa renomeá-la ou atribuir um alias para que ela possa ser enviada a um repositório específico.

Cada imagem no Podman tem um identificador único chamado IMAGE ID. Mas, para subir a imagem ao AWS ECR, o nome dela precisa seguir o formato `<aws-account-id>.dkr.ecr.<aws-region>.amazonaws.com/<nome-do-repositorio>:<tag>`


```shell
podman push 471112844480.dkr.ecr.us-east-1.amazonaws.com/products-service:1.0.0
```

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
