## Pixelant Template Generator 0.0.2 Alpha

Not published to **npm** yet.

### [CHANGELOG](https://github.com/pixelant/pxa/blob/master/CHANGELOG.md)
### [CONTRIBUTING](https://github.com/t3kit/t3kit/blob/master/CONTRIBUTING.md)


### Required dependencies:

- [Git](https://git-scm.com/)
- [NodeJs](http://nodejs.org/) >=6.9.0
- [NPM](https://github.com/npm/npm) >=3.10.0

_Note: You might need to use `sudo` before `npm` command to install packages globally_
***




If you want to check **pxa generator** now, you need to clone it to your local and install:

```
git clone git@github.com:pixelant/pxa.git
cd pxa
sudo npm link
```

To strat **pxa generator** just use command `pxa` and follow the instructions
```
pxa
```

Quick help:

`pxa -h` or  `pxa --help` get quick help

---

## Templates:

### Mobile App

Install mobile application based on **inAppBrowser** plugin with push-notifications.
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
