Netsuite SuiteScript 2.0 Project Skeleton
==

Dependencies
--
* NodeJS 8.9.1

Installation
--
`npm install -g mocha yarn && yarn install`

Developing
--
Run the following while you are developing to continuously execute tests.

  `gulp watch-tests`

Configuration
--
In order to deploy to NetSuite, you will need to configure your account
credentials in `credentials.json`, and your user must be an Administrator of
the NetSuite account you are attempting to deploy to.

1. Copy or rename `credentials-sample.json` to `credentials.json`
2. Go to `Setup > Integration > Web Services Preferences` in your NetSuite account.
3. Copy the `ACCOUNT ID` value to your `credentials.json` file under `account`,
  and fill in all other appropriate values for `role`, `email`, and `password`.
4. If your account sandbox is newer and not hosted at the sandbox.netsuite
  subdomain, run the following command:

   `./util/use_top_level_sandbox.py`
5. If you want to use the SuiteCloud Development Framework to backup and deploy
   object definitions alongside your scripts, first [install the SDF CLI
   tools](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_1489072409.html)
   and then run `./util/init_sdf.sh` to configure the project folders.
6. If you want to use the `gulp create-script` command, be sure to edit the
   script header definition in `templates/_script_header.js`.

Deploying
--
Run the command `gulp deploy-sandbox` to deploy to your Sandbox account.
Run the command `gulp deploy-production` to deploy to your Production account.

Debugging
--
Using the NetSuite debugger is an absolute chore. If you are a Vim user, there
is now a better option.

1. Install my [NetSuite Browserlink](https://github.com/kevinmershon/netsuite-browserlink.vim)
plugin into your Vim install.
2. In Chrome/Chromium, open the extensions window and drag-drop the file
   `util/vim_netsuite_browserlink.user.js` file into the pane to prompt to
   install the user script.
3. Follow the Browserlink usage directions for more details.

License
--
AGPLv3
