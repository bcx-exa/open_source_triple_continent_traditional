# Introduction ![buildstatus](docs/assets/passing.svg)

![bcxexa](docs/assets/exa_backgrond.jpg)

• [Website](https://www.bcx.co.za/exa/) • [Docs](docs/architecture/architecture.svg)

This is to demonstrate how to deploy a multi-region active-active monolithic architecture across 3 continents. 
---

> We would recommend looking at a micro-services architecture should your app require a multi-region implementation.  That said, if it's not an option and you need a spring board, we hope this code will help you out!!

![requirement](docs/assets/Triple_Continent_Active_Active_bcx_exa.pdf)

# Customer Requirement

- 99.999% Availability (5.26 minutes DOWMTIME per year)
- Low Latency For Users in US, EU and AUS
- Cross-Continent Eventual Consistency (Under 3 Seconds)
- Blue/Green Deployment Capabilities
- Canary Deployment Capabilities
- One Deployment Command


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
aws configure --profile bcxexa
```

4. Create and configure your local env files inside your environments folder.

Filenames
- .env.local

```bash
GITHUB_OWNER=<GITHUB OWNER>
GITHUB_REPO=<YOUR REPO>
GITHUB_TOKEN=<GITHUB TOKEN>
AWS_ACCESS_KEY_ID=<YOUR KEY>
AWS_SECRET_ACCESS_KEY=<YOUR KEY>
```

---
### Deployment
---


1. You can now deploy the demo using this command

```bash
npm run deploy
```

---
### Destroying environments
---
```bash
npm run destroy
```

### Reading Material

- Cloudfront Multi-Region - https://aws.amazon.com/blogs/apn/using-amazon-cloudfront-with-multi-region-amazon-s3-origins/
- Architectural Patterns for Multi-Region Active Active - https://www.youtube.com/watch?v=2e29I3dA8o4
- Find ALB hosted zone id's - https://docs.aws.amazon.com/general/latest/gr/elb.html
- User Data Scripts & Lifecycle Hooks - https://medium.com/faun/autoscaling-like-a-pro-how-to-use-ec2-auto-scaling-lifecycle-hooks-the-right-way-7e1e6c952d3c
- DynamoDB Table Design Pattern - Versioning - https://aws.amazon.com/blogs/database/implementing-version-control-using-amazon-dynamodb/

# Version

- 0.0.1

# Contributions

- BCX Exa Core Team

# Special Mentions

- Serverless Framework
- AWS