# IBM Prices

![GitHub repo size](https://img.shields.io/github/repo-size/vsalmeida/IBM-Prices)
![GitHub top language](https://img.shields.io/github/languages/top/vsalmeida/IBM-Prices)
![GitHub last commit](https://img.shields.io/github/last-commit/vsalmeida/IBM-Prices)
![License](https://img.shields.io/github/license/vsalmeida/IBM-Prices)

## Table of contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting API Username](#getting-api-username)
- [Getting API Key](#getting-api-key)
- [Usage](#usage)
- [Contributing](#contributing)

## Prerequisites

To run this project you need to have

- [IBM Cloud API Username](#getting-api-username)
- [IBM Cloud API Key](#getting-api-key)
- [NodeJS](https://nodejs.org/en/)

## Installation

First you need to clone this repository

```bash
git clone https://github.com/VSAlmeida/IBM-Prices
```

After that use the [npm](https://www.npmjs.com/get-npm) package manager to install the dependencies.

```bash
npm install
```

## Getting API Username

- In the manage menu, click on Access(IAM)
- In the side menu, select Users
- Select your user
- Scroll down to the "VPN Password" section
- Copy the username for this session. Usually it will be the user's account number + "\_" + email. <br>Example: 1234567_example@example.com

## Getting API Key

- In the manage menu, click on Access(IAM)
- In the side menu, select Users
- Select your user
- Scroll down to the "API keys" section

If you already **have** an api key

- Click on the 3 dots to the right of your key
- Click details and copy it

If you **don't have** an api key

- Click on "Create classic infrastructure key" and copy it

## Usage

After you have done the [installation](#installation) open the terminal in the directory where you cloned the project and create .env file

Inside the .env file you need to put your [API Username](#getting-api-username) and [API Key](#getting-api-key)

```bash
SL_USER=Your_API_Username
SL_PASS=Your_API_Key
```

After creating the file, you can start the program with

```bash
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
