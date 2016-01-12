# ePublishing Debug Config Chrome Extension

by Mike Green <mgreen@epublishing.com>

## Setup

```bash
npm install -g gulp
git clone git@bitbucket.org:mikedamage/epub-debug-config.git
cd epub-debug-config

# Install module dependencies
npm install

# Build assets and transpile scripts
gulp
```

Once the project is built, you can add the `build` folder to Chrome as an unpacked extension by going to chrome://extensions and enabling Developer Mode.
