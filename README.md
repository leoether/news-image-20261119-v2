[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/leoether/news-image-20261119-v2/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/leoether/news-image-20261119-v2/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

# The World in One Day — 19 November 2026

A [make.fun](https://make.fun/bounty/news-image-20261119) entry for the `news-image-20261119` competition: one image that
sums up the world's news of Thursday 19 November 2026. Round 2 of the entry:
a hero-led front page — the lead story gets the full-width band, five more
stories follow, and the footer adds four more items.

## The image

`entry.png` (1024×1024, palette PNG, 43,041 bytes) is a newspaper-style
infographic with six stories, each verified against reporting published on
19 November 2026:

1. **Trump, Xi and Putin meet in Shenzhen** (lead story) — first-ever
   trilateral at the APEC summit; joint declaration: nuclear war "cannot be
   won and must never be fought"; 90-minute meeting, peace declaration.
2. **World court rules Myanmar committed genocide** — the ICJ delivers its
   9–6 judgment in The Gambia v. Myanmar; forces killed about 10,000
   Rohingya in 2017.
3. **Jeffries nominated for Speaker** — Democrats pick him 251–11; he would
   be the first Black Speaker if elected on 3 January.
4. **GTA VI launches worldwide** — after 13 years, Vice City returns at
   midnight local time; already live in New Zealand.
5. **Iran widens the Gulf war to Kuwait** — drones hit Ali Al Salem air
   base; Bahrain attacked again; Kuwait reports no casualties.
6. **Cyclone Akvan nears India** — landfall Friday on the Andhra–Odisha
   coast; schools shut, red alerts out.

The footer adds: the EU proposing a €45bn Ukraine loan; Voyager 1 reaching
one light-day from Earth; Anthropic raising $100bn+ in its Nasdaq IPO debut;
Nvidia halting H-series chip shipments to China.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`) after checking
its PNG signature and the 1 MiB size cap. No network, no randomness, no clock
— two runs write byte-identical files.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
