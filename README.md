# treeCommerce

This is an enterprising ecommerce venture that hawks jars of trees distilled into slime. Liquid trees, or vats of algae, are far more efficient at harvesting CO2 and converting that into oxygen than your normal tree. It also looks a little silly to have a giant tank of Nickelodean slime sitting in your city. So who's to say if it's good or bad.

| ![beautiful.PNG](/media/beautiful.PNG) |
| :------------------------------------: |
|             _Chef's kiss_              |

THERE IS OPPORTUNITY FOR BUSINESS HERE. I've taken inspiration from the art of bonsai to supply urbanites with their very own liquid trees that can be housed in their increasingly tiny homes. We have the expertise of a former wildland firefighter and tree enthusiast at the local CMS admin here. Her professional opinion is that the liquid trees cannot catch on fire because they're liquid, and hell, I trust that.

| ![majestic.PNG](/media/majestic.PNG) |
| :----------------------------------: |
|      _Presumably not flammable_      |

This site is not real. You cannot buy this garbage. If you could, the results would be like eating the black goo from Prometheus. You don't want that. This code is mainly for messing around with different services and builtin features of the Astro framework.

| ![space-1.jpg](/media/S_2_3.webp) |
| :-------------------------------: |
|     _Average US City in 2030_     |

## Tech Stack

List of tools:

- Astro
- TypeScript
- Eslint
- Vitest
- Playwright
- Decap CMS
- Sentry
- Shoelace (Design Library)
- Turso
- SQLite

Database is sqllite running a the libsql client. This is because AstroDB interfaces with libSQL and I originally intended this to solely use AstroDB. However, Astro's DB studio is closed without an invite, and while self hosting is an option, I don't feel like self hosting a database. Henche, Turso combined with libSQL.

 It even has a [splide](https://splidejs.com/) in there!

## Running locally

In addition to the usual run script, we can also run [Decap](https://decapcms.org/docs/working-with-a-local-git-repository/) locally.

`npx decap-server`

For fun I also set up Sentry for monitoring, its auth token is set in a .env file that is obviously not checked in.

