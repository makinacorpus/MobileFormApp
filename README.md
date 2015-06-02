# MobileFormApp

## Prerequisites

* [daybed](http://daybed.rtfd.org/) backend to store answers sent from your app

* The latest version of [Ionic](http://ionicframework.com/) to build your app

## Setup

1. ```npm install```

2. ```gulp install [--url backend_url] [--os android|ios|all]```
    * `--url` parameter allow to specify your backend url
    * `--os` parameter allow to configure the ionic project environment for build your app in future. If no parameters are specified, the project environment will be configured to work with Android.

## Start

The application starts as an ionic Application :

* ```ionic serve``` to view it in your browser

* ```ìonic run``` to build, install and launch it on your smartphone