# Getting Started

1. Install Node.js v12.18.3 
    * [Windows](https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi) and [Mac](https://nodejs.org/dist/v12.18.3/node-v12.18.3.pkg)

2a. Install Chocolatey (Windows only)
    * Open PowerShell as Admin, then run the following command.
    * `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`
3a. Install Chocolatey Dependancies (Windows only)
    * `choco install -y nodejs.install python2 openjdk8`

2b. Install Homebrew (Mac only)
    * `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
3b. Install node and watchman
    * `brew install node`
    * `brew install watchman`

4. Install dependencies
    * `npm install`

## `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

## `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:


### Run instructions for iOS:
    • cd "C:\Documents\GitHub\StockChat" && npx react-native run-ios
    - or -
    • Open StockChat\ios\StockChat.xcodeproj in Xcode or run "xed -b ios"
    • Hit the Run button

### Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "C:\Documents\GitHub\StockChat" && npx react-native run-android

### Run instructions for Windows and macOS:
    • See https://aka.ms/ReactNative for the latest up-to-date instructions.