# Local Packages: Altitude Design System

The **Altitude Design System** is a set of standards for managing design at scale by reducing redundancy while creating a common language and visual consistency across pages and channels.

## Table of Contents

* [Architecture](#architecture)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)

## Architecture

The **Altitude Design System** is built on [Lerna](https://lerna.js.org/). This tool manages several independent but interconnected packages:

* Design Tokens

## Prerequisites

**Node** (v14.x): https://nodejs.org/download/release/latest-fermium/

## Installation

> **Important**: You must set the `BRAND` environment variable in order to build the packages. If it is not provided, the fallback value will be `vallier`.

In order to install the project dependencies and those of all packages, run this command line:

```bash
npm run all:install
```

## Usage

A series of commands are available in the file named `package.json` in order to work with the project.

> **Important**: At this point, even though **Altitude Design System** is an independent project and manages its own version and environment, it is used inside **Altitude Storefront** as a local dependency.

When the **Altitude Storefront** is set up and executed, the building process of the **Altitude Design Systen** project will be triggered.
