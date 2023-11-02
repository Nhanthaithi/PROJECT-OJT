# ra_intern_a

## 1. Description

RKDN training

## 2. Prerequisite

- [NodeJS](https://nodejs.org) (v18)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

## 3. Techniques
- [NestJS](https://docs.nestjs.com/) (v10)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/) (v8.0)
- [TypeORM](https://docs.nestjs.com/techniques/database)

## 4. Directory Structure
```
├───src
│   │   app.module.ts
│   │   main.ts
│   │   config/ # Thông số cấu hình
│   │   └───xxx.config.ts
│   └───{module-name}
│       │   {module-name}.module.ts
│       ├───controllers # Layer điều hướng request
│       │       xxx.controller.ts
│       │       yyy.controller.ts
│       ├───enums # Chứa các định nghĩa hằng số
│       │       xxx.enum.ts
│       │       yyy.enum.ts
│       ├───entities # Chứa thực thể mapping với bảng trong cơ sở dữ liệu
│       │       xxx.entity.ts
│       │       yyy.entity.ts
│       ├───providers # Layer xử lý logic
│       │       xxx.service.ts
│       │       yyy.service.ts
│       ├───requests # Chứa định nghĩa các request resources (bao gồm validation)
│       │       create-xxx.request.ts
│       │       update-xxx.request.ts
│       │       create-yyy.request.ts
│       │       update-yyy.request.ts
│       └───responses # Chứa định nghĩa các response resources
│               xxx.response.ts
│               yyy.response.ts
```

## 5. Hướng dẫn Docker

### 5.1. Start docker containers
Chạy Terminal ở thư mục này

```bash
$ docker compose up -d
```

> Lưu ý: trước khi thực hiện cần bật sẵn phần mềm Docker

### 5.2. Một số câu lệnh thường sử dụng
|No.|Command|Mục đích|
|---|-------|--------|
|1| docker compose up -d| Start docker containers|
|2| docker compose stop| Stop docker containers|
|3| docker compose down| Down docker containers|

###### Reference
- [Docker compose command lines](https://docs.docker.com/engine/reference/commandline/compose/)

## 6. Installation

### 6.1. Install Yarn

Chạy Terminal bằng quyền Admin
```bash
$ npm install -g yarn
```


### 6.2. Install dependencies
Chạy Terminal ở thư mục này
```bash
$ yarn install
```

## 7. Running the app
Chạy Terminal ở thư mục này
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## 8. Test
Chạy Terminal ở thư mục này
```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## 9. Kết nối
### 9.1. Kết nối cơ sở dữ liệu

Sử dụng MySQL Workbench và kết nối theo thông tin dưới đây

|Name|Value|
|---|---|
|Protocol| `IP/TCP` |
|Host|`127.0.0.1`|
|Port|`3307`|
|User|`rikkei`|
|Password|`Password123`|
|Database|`rk_training`|

### 9.2. Kết nối API

- Base URL: http://127.0.0.1:3000/
