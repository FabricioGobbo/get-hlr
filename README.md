# HLR Service BFF

Backend for Frontend (BFF) que funciona como proxy para 5 APIs de telecom.

## Tecnologias

- NestJS 10
- TypeScript
- Axios
- Swagger/OpenAPI

## Estrutura do Projeto

```
/code
├── src/
│   ├── main.ts                       # CORS habilitado para localhost:8081, porta 3001
│   ├── app.module.ts                 # Módulo principal
│   ├── config/
│   │   └── env.config.ts             # Variáveis de ambiente
│   ├── auth/
│   │   ├── auth.guard.ts             # Valida token do header Authorization
│   │   └── public.decorator.ts       # @Public() para bypass
│   └── proxies/                      # Controladores proxy
│       ├── hss.controller.ts         # POST /api/hss
│       ├── conta.controller.ts       # GET /api/conta/:id/detalhes
│       ├── summa.controller.ts       # POST /api/summa
│       ├── hlr.controller.ts         # POST /api/hlr
│       ├── hub.controller.ts         # POST /api/hub
│       └── health.controller.ts      # GET /health
├── .env
└── package.json
```

## Endpoints

| BFF Endpoint              | Método | API Real                                      | Autenticação |
|--------------------------|--------|-----------------------------------------------|--------------|
| /api/hss                 | POST   | http://localhost:3000/develop/network-subscriber | Sim        |
| /api/conta/:id/detalhes  | GET    | http://localhost:3000/v1/conta/:id/detalhes  | Sim          |
| /api/summa               | POST   | TBD                                           | Sim          |
| /api/hlr                 | POST   | TBD                                           | Sim          |
| /api/hub                 | POST   | TBD                                           | Sim          |
| /health                  | GET    | -                                             | Não (@Public)|
| /api                     | GET    | Swagger                                       | Não (@Public)|

## Instalação

```bash
npm install
```

## Configuração

Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT=3001
CORS_ORIGIN=http://localhost:8081
HSS_URL=http://localhost:3000
CONTA_URL=http://localhost:3000
SUMMA_URL=http://localhost:3000
HLR_URL=http://localhost:3000
HUB_URL=http://localhost:3000
HTTP_TIMEOUT=30000
```

## Executar

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

## Autenticação

Todas as rotas (exceto `/health` e `/api`) requerem um token Bearer no header:

```
Authorization: Bearer {token}
```

O `SpecTokenGuard` valida:
- Presença do header Authorization
- Formato Bearer correto
- Token não vazio

Rotas públicas podem usar o decorator `@Public()` para bypass.

## Endpoints Públicos

- `GET /health` - Health check
- `GET /api` - Documentação Swagger

## Logs

Todas as requisições são logadas com:
- URL de destino
- Body da requisição (DEBUG)
- Status da resposta
- Dados da resposta (DEBUG)
- Erros detalhados

## Tratamento de Erros

O BFF captura erros das APIs e retorna:
- Status HTTP original da API
- Mensagem de erro da API
- Log completo do erro no servidor

## Acesso

- Aplicação: http://localhost:3001
- Health Check: http://localhost:3001/health
- Swagger UI: http://localhost:3001/api
