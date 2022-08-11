# LDaCCA Website Revamped
A sneaky attempt to rewrite the site using a react based stack before
anybody notices.

## Getting Started
First, install the dependencies with the `yarn` package manager.
```bash
yarn
```
Then run the development server.
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure
- `content`:
  - `pages`: Individual markdown page content from which to generate pages.
  - `posts`: Blog posts to be listed under the `/posts` section.
- `public`: Public images and icons to be used in pages.
- `src` (For developers):
  - `components`: Reusable react components between pages.
  - `contexts`: State storage/providers to be used with the `useContext` hook.
  - `layouts`: Common page wrappers e.g. providing headers and footers or state providers.
  - `lib`: Non-component libraries containing app functionality or logic.
  - `pages`: Next.js pages corresponding 1-1 with the website pages.
  - `public`: Public files e.g. static images, favicons or fonts.
  - `styles`: Global and scoped css files. 
  - `types`: Reusable typescript types.
- Other outer level files: All the config files

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
