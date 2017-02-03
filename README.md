[![npm version](https://badge.fury.io/js/pxa.svg)](https://badge.fury.io/js/pxa)

# PXA
## Pixelant command line utility

The Pixelant command line utility makes it easy to start, build and run some Pixelant projects.

Use the ` pxa -h ` or ` pxa --help ` command for more info about utility.

### [CHANGELOG](https://github.com/pixelant/pxa/blob/master/CHANGELOG.md)
### [CONTRIBUTING](https://github.com/t3kit/t3kit/blob/master/CONTRIBUTING.md)


### Minimal `pxa` requirements:
 - [Git](https://git-scm.com/)
 - [NodeJs](http://nodejs.org/) >= 6.9.0
 - [NPM](https://github.com/npm/npm) >= 3.10.0

### Specific required dependencies for every type of template starters:

**Mobile App**
 - [Cordova](https://cordova.apache.org) >= 6.3.1 `[sudo*] npm install -g cordova`
 - [Ionic](http://ionic.io) >= 2.1.4 `[sudo*] npm install -g ionic`


**\***_Note: You might need to use `sudo` before `npm` command to install packages_ **globally**
***


## Installing:

```
[sudo*] npm install -g pxa
```

*****_Note: You might need to use `sudo` before `npm` command to install packages_ **globally**


## Starting:

To start using **pxa** just use command `pxa` and follow the instructions
```
pxa
```

## Flags/options:

```
[ -m | --mobile-app ]        generate mobile app
[ -t | --theme ]             generate t3kit sub theme
[ -h | --help ]              show pxa CLI help
[ -v | --version ]           show pxa CLI version
```

---

## Template starters:

### Mobile App:

Install mobile application based on [**Ionic Framework**](http://ionic.io), [**inAppBrowser plugin**](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser) and [**mobileApp_template**](https://github.com/pixelant/mobileApp_template) with push-notifications. 

Steps:

1. Clone Mobile app template and install dependencies
 ```
 pxa => "Mobile App" => "Setup MobileApp Template"
 or
 pxa -m => "Setup MobileApp Template"
 ```

2. Setup Ionic Cloud and Google FCM Sender ID
 ```
 pxa => "Mobile App" => "Setup Ionic Cloud and Google FCM Sender ID"
 or
 pxa -m => "Setup Ionic Cloud and Google FCM Sender ID"
 ```

3. [Install Security Profiles](http://docs.ionic.io/services/profiles/) (Manually)
