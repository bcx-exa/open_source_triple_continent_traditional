# Introduction ![buildstatus](docs/assets/passing.svg)

![bcxexa](docs/assets/exa_backgrond.jpg)

• [Website](https://www.bcx.co.za/exa/) • [Docs](docs/architecture/architecture.svg)

This is to demonstrate how to deploy a multi-region active-active monolithic architecture.  
---

> We would recommend looking at a micro-services architecture should your app require a multi-region implementation.  That said, if it's not an option and you need a spring board, we hope this code will help you out!!

# Customer Requirement

- Cater for both blue/green & canary deployments
- 99.9999% Availability (31s a year)
- 99.9999% Reliability (31s a year)

# Testing Tools

- Chaos Monkey
- Chaos Gorilla
- Chaos Kong

## Pre-requistes

1. Make sure you have Nodejs installed
2. Make sure you have AWS CLI installed

### Initial Setup
---

1.  Install Serverless globally

```bash
npm install -g serverless
npm install -g cross-env
```

2. Install all packages

```bash
npm install
```

3. Setup your aws profile

```bash
aws configure --profile yepDev
aws configure --profile yepUat
aws configure --profile yepProd
aws configure --profile yepSS
```

4. Create and configure your local env files inside your environments folder.

Filenames
- .env.dev.local
- .env.uat.local
- .env.ss.local
- .env.prod.local

```bash
AWS_ACCESS_KEY_ID=<YOUR KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET>
```

5. Create service linked role (needed to add Elasticsearch to VPC)
aws iam create-service-linked-role --aws-service-name es.amazonaws.com --profile={yepDev,yepUat,yepProd}

---
### For Dev/UAT/Prod Deployments
---

1. If this is the first deployment, you need to deploy the shared services account stack f

```bash
npm run deploy:ss
```

2. You can now deploy the relevant environments with the commands below.

```bash
npm run deploy:infra:{dev, uat or prod}
npm run deploy:certs:{dev, uat or prod}
npm run deploy:lambda:{dev, uat or prod}
npm run deploy:full:{dev, uat or prod}
npm run deploy:ss <- Deployment of the Shared Services environment
```

### For Deploying your lambda functions without deploying the entire stack

```bash
serverless deploy -f <function name> --stage dev
serverless deploy -f <function name> --stage uat
serverless deploy -f <function name> --stage prod

```

---
### Destroying environments Dev/UAT/Prod
---
```bash
npm run destroy:dev
npm run destroy:uat
npm run destroy:prod
```

### Infrastructure Resource Mappings

### Exported Values

| Output Key | Description                          | Import Syntax                          |
|------------|--------------------------------------|----------------------------------------|
| WebSubAz1  | Web Subnet in AZ1 Logical ID         | Fn::ImportValue: WebSubAz1-${env:STAGE} |
| WebSubAz2  | Web Subnet in AZ2 Logical ID         | Fn::ImportValue: WebSubAz2-${env:STAGE} |
| WebSubAz3  | Web Subnet in AZ3 Logical ID         | Fn::ImportValue: WebSubAz3-${env:STAGE} |
| AppSubAz1  | App Subnet in AZ1 Logical ID         | Fn::ImportValue: AppSubAz1-${env:STAGE} |
| AppSubAz2  | App Subnet in AZ2 Logical ID         | Fn::ImportValue: AppSubAz2-${env:STAGE} |
| AppSubAz3  | App Subnet in AZ3 Logical ID         | Fn::ImportValue: AppSubAz3-${env:STAGE} |
| DbSubAz1   | DB Subnet in AZ1 Logical ID          | Fn::ImportValue: DbSubAz1-${env:STAGE}  |
| DbSubAz2   | DB Subnet in AZ2 Logical ID          | Fn::ImportValue: DbSubAz2-${env:STAGE}  |
| DbSubAz3   | DB Subnet in AZ3 Logical ID          | Fn::ImportValue: DbSubAz3-${env:STAGE}  |
| WebSg      | Web Security Group Logical ID        | Fn::ImportValue: WebSg-${env:STAGE}    |
| MgmtSg     | Management Security Group Logical ID | Fn::ImportValue: MgmtSg-${env:STAGE}    |
| AppSg      | App Security Group Logical ID        | Fn::ImportValue: AppSg-${env:STAGE}     |
| DbSg       | DB Security Group Logical ID         | Fn::ImportValue: DbSg-${env:STAGE}      |
| Vpc        | Vpc Security Group Logical ID        | Fn::ImportValue: Vpc-${env:STAGE}       |


### Reading Material

- Cloudfront Multi-Region - https://aws.amazon.com/blogs/apn/using-amazon-cloudfront-with-multi-region-amazon-s3-origins/
- Architectural Patterns for Multi-Region Active Active - https://www.youtube.com/watch?v=2e29I3dA8o4
- Find ALB hosted zone id's - https://docs.aws.amazon.com/general/latest/gr/elb.html
- User Data Scripts & Lifecycle Hooks - https://medium.com/faun/autoscaling-like-a-pro-how-to-use-ec2-auto-scaling-lifecycle-hooks-the-right-way-7e1e6c952d3c
- DynamoDB Table Design Pattern - Versioning - https://aws.amazon.com/blogs/database/implementing-version-control-using-amazon-dynamodb/
### We Might, in the future, but, can't guarentee that we will

- Optimize how auto-scaling behaves in the demo
# Version

- 0.0.1

# Contributions

- BCX Exa Core Team

# Special Mentions

- Serverless Framework
- AWS