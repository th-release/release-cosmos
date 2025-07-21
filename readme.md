# release-cosmos
**release-cosmos** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

```
Ignite CLI version:             v29.2.0-dev
Ignite CLI build date:          2025-05-31T07:31:49Z
Ignite CLI source hash:         8fd169cf9170ac1170412ebc87a48c6eb68fd3af
Ignite CLI config version:      v1
Cosmos SDK version:             v0.53.0
```

## How To Start (Docker)?
0. docker build
    * `docker build -t released:lastest .`

1. docker compose -f init-compose.yaml up
    * Make a note of the node IDs in the log.

2. file update
    * Please copy docker/${seed-node}/config/genesis.json and over write each docker/${validators}/config/genesis.json with it
    * Please modify the seeds = "" and persistent_peers = "" sections in each docker/${validators}/config/config.toml to the format {node_id}@{service}:{port}.
    
3. docker start
    * `docker compose up -d`

## Get started

```
ignite chain serve
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Ignite CLI docs](https://docs.ignite.com).

### Web Frontend

Additionally, Ignite CLI offers both Vue and React options for frontend scaffolding:

For a Vue frontend, use: `ignite scaffold vue`
For a React frontend, use: `ignite scaffold react`
These commands can be run within your scaffolded blockchain project. 

For more information see the [monorepo for Ignite front-end development](https://github.com/ignite/web).

## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)
