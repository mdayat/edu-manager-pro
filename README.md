# Edu Manager Pro

## Preface

This is a repository to host our Capstone Project of Dicoding Bootcamp 2023. We choose to use [SvelteKit](https://kit.svelte.dev/) because it offers the flexibility of [SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA). Of course, because the tight of the deadline, we choose to use SvelteKit as our fullstack app to handle both Fron-End and Back-End requirements.

## Tech Stack

We use plain JavaScript – without type safety support like [TypeScript](https://www.typescriptlang.org/) or [JSDoc](https://jsdoc.app/), and CSS – without CSS frameworks like [Tailwind CSS](https://tailwindcss.com/) – because our team is unfamiliar with those things, so we decided to use plain JavaScript and CSS instead with the help of [Svelte](https://svelte.dev/) SFC (Single File Component) to speed up our development process. As for the package manager, we use [pnpm](https://pnpm.io/) instead of [npm](https://docs.npmjs.com/) for many reasons – you can check this [article](https://pnpm.io/) to help understand our reasons.

Then, what about code styles? For that purpose, we picked up a few tools to help maintain our code consistency. We have [ESLint](https://eslint.org/) which will statically analyze our code to follow best practices. On the other hand, we have [Prettier](https://prettier.io/) to align our code-writing styles. Lastly, we need automation tools to run the previously-mentioned tools. For that reason, we use [Husky](https://typicode.github.io/husky/) which will run every event we defined before on top of the git hooks.

## Getting Started

### Clone The Project

Run this command to clone the repository to your local computer:

```shell
git clone https://github.com/mdayat/edu-manager-pro.git
```

### Install The Project

After cloning the repository, install all the dependencies with pnpm:

```shell
pnpm install
```

If you haven't yet pnpm, run this command to install pnpm:

```shell
npm install -g pnpm
```

If you prefer another methods to install pnpm, please refer to this [document](https://pnpm.io/installation).

## API Reference

Please read further [this document](docs/api/README.md) if you want to use the API that we provide.
