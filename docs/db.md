# Database

## Migrations

Database migrations are handled using [`knex.js`](https://knexjs.org/)

```
npx knex migrate:latest
```

## Table structure

The following tables exist in the `things` database.

### `thing_types`

#### Columns

| column       | postgresql type           | nullable | default | description                    |
|:-------------|:--------------------------|:--------:|:-------:|:-------------------------------|
| `name`       | `CHARACTER VARYING(25)`   |  FALSE   |    -    | Name of the thing type         |
| `created_at` | `Timestamp with timezone` |  FALSE   | `now()` | When the row was first created |
| `updated_at` | `Timestamp with timezone` |  FALSE   | `now()` | When the row was last updated  |

#### Indexes

| columns | index type | description |
|:--------|:-----------|:------------|
| `name`  | PRIMARY    | Primary key |

### `things`

#### Columns

| column       | postgresql type           | nullable |       default        | description                       |
|:-------------|:--------------------------|:--------:|:--------------------:|:----------------------------------|
| `id`         | `UUID`                    |  FALSE   | `uuid_generate_v4()` | Unique identifier for the `thing` |
| `name`       | `CHARACTER VARYING(25)`   |  FALSE   |          -           | Name of the `thing`               |
| `thing_type` | `CHARACTER VARYING(25)`   |  FALSE   |          -           | Name of the `thing_type`          |
| `created_at` | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was first created    |
| `updated_at` | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was last updated     |

#### Indexes

| column | index type | description                     |
|:-------|:-----------|:--------------------------------|
| `id`   | PRIMARY    | Primary key                     |
| `name` | UNIQUE     | Guarantees the `name` is unique |

#### Foreign Keys

| columns      | references | description                    |
|:-------------|:----------:|:-------------------------------|
| `thing_type` |   `name`   | Guarantees the `type` is valid |

### `thing_payloads`

#### Columns

| column       | postresql type            | nullable |       default        | description                                                       |
|:-------------|:--------------------------|:--------:|:--------------------:|:------------------------------------------------------------------|
| `id`         | `UUID`                    |  FALSE   | `uuid_generate_v4()` | Unique identifier for the `thing`                                 |
| `thing`      | `UUID`                    |  FALSE   |          -           | Name of the `type` for this `thing`                               |
| `timestamp`  | `INTEGER`                 |  FALSE   |          -           | Stores the timestamp of when the payload was sent via the `thing` |
| `payload`    | `JSONB`                   |  FALSE   |       `jsonb`        | Stores the payload sent via the `thing`                           |
| `created_at` | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was first created                                    |
| `updated_at` | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was last updated                                     |

#### Indexes

| columns     | index type  | description                                         |
|:------------|:------------|:----------------------------------------------------|
| `id`        | PRIMARY KEY | Primary key                                         |
| `thing`     | INDEX       | Allows filtering of `thing_payloads` by `thing`     |
| `timestamp` | INDEX       | Allows filtering of `thing_payloads` by `timestamp` |

#### Foreign Keys

| columns | references | description                     |
|:--------|:-----------|:--------------------------------|
| `thing` | `id`       | Guarantees the `thing` is valid |
