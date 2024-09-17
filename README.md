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
$ cp .env.example .env
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

## Getting results via the CLI

You can get the results of the competition via the CLI. To do this, run the following command:

```bash
$ bun src/cli/index.ts --dataDirPath <absolute-path-to-data-dir>
```

The `--dataDirPath` flag is required and should be the absolute path to the directory where the data files are stored. The data files are exports from the database and should be named `Match.json` and `User.json`

### Excluding users

You can also exclude users from the goals scored and goals conceded ranking by passing the `--excludeUsers` flag followed by a comma separated list of user ids. For example:

```bash
$ bun src/cli/index.ts --dataDirPath <absolute-path-to-data-dir> --excludeUserIds 1,2,3
```

Make sure no spaces are present between the user ids.

### Defining a locale

You can also define a locale for the output by passing the `--locale` flag followed by the locale you want to use. For example:

```bash
$ bun src/cli/index.ts --dataDirPath <absolute-path-to-data-dir> --locale nl-NL
```

The locale should be a valid IETF BCP 47 language tag. The default locale is `en-US`.

## Contributing

Contibutions are welcome! If you want to add a cool feature or do some kind of improvement, feel free to open an [issue](https://github.com/brainstudnl/blaco/issues/new/choose) or [pull request](https://github.com/brainstudnl/blaco/compare)!
