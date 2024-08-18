# treeCommerce

This is an enterprising ecommerce venture that hawks jars of trees distilled into slime.

This artisinal piece of code serves as a proof of concept for creating a custom website that can be hosted by me and managed by a not so technologically inclined client via a CMS.

My wife is a forester, a former wildland firefighter, and got a kick out of a company proposing vats of algae as a supplement for trees in cities. So she is the CMS admin here.

This site is not real. You cannot buy this garbage. If you could, the results would be like obtaining the black goo from Prometheus. You don't want that.

## Tech Stack

Going to be going for a bunch of different features in Astro. List of tools:

- Astro
- TypeScript
- Eslint
- Vitest
- Playwright
- Decap CMS
- Sentry

Additionally, I've opted to integrate Shoelace web components so that I can make styling sort of brainless.

Database is handled by Astro DB.

## Running locally

In addition to the usual run script, we can also run [Decap](https://decapcms.org/docs/working-with-a-local-git-repository/) locally.

`npx decap-server`

For fun I also set up Sentry for monitoring, its auth token is set in a .env file that is obviously not checked in.
