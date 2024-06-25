# Blaco

Brainstud's Ladder Competition Software.

## Setup

We're using [Bun](https://bun.sh) as our package manager, make sure it's installed on your machine.

Installing the packages for the application:

```bash
$ bun install
```

Copy the .env.example file and add you own database url.

```bash
cp .env.example .env
```

Before you start the server, make sure you've run the migrations:

```bash
$ bunx prisma migrate dev
```

Once migrated, run the development server:

```bash
$ bun dev
```

Open http://localhost:3000 with your browser to see the result.

## Contributing

Contibutions are welcome! If you want to add a cool feature or do some kind of improvement, feel free to open an [issue](https://github.com/brainstudnl/blaco/issues/new/choose) or [pull request](https://github.com/brainstudnl/blaco/compare)!
