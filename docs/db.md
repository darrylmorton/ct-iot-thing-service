# Database

## Migrations

Database migrations are handled using [`knex.js`](https://knexjs.org/)

```
npx knex migrate:latest
```

## Table structure

The following tables exist in the `things` database.

### `thing_groups`

#### Columns

| column        | postgresql type           | nullable | default | description                    |
|:--------------|:--------------------------|:--------:|:-------:|:-------------------------------|
| `name`        | `CHARACTER VARYING(25)`   |  FALSE   |    -    | Name of the thing group        |
| `description` | `CHARACTER VARYING(100)`  |  FALSE   |    -    | Description of the thing group |
| `created_at`  | `Timestamp with timezone` |  FALSE   | `now()` | When the row was first created |
| `updated_at`  | `Timestamp with timezone` |  FALSE   | `now()` | When the row was last updated  |

#### Indexes

| columns | index type | description |
|:--------|:-----------|:------------|
| `name`  | PRIMARY    | Primary key |

### `thing_group_devices`

#### Columns

| column        | postgresql type           | nullable |       default        | description                                    |
|:--------------|:--------------------------|:--------:|:--------------------:|:-----------------------------------------------|
| `id`          | `UUID`                    |  FALSE   | `uuid_generate_v4()` | Unique identifier for the `thing_group_device` |
| `thing_group` | `CHARACTER VARYING(25)`   |  FALSE   |          -           | Name of the thing group                        |
| `device_id`   | `CHARACTER VARYING(100)`  |  FALSE   |          -           | Description of the thing group                 |
| `created_at`  | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was first created                 |

#### Indexes

| columns       | index type  | description                                                |
|:--------------|:------------|:-----------------------------------------------------------|
| `id`          | PRIMARY KEY | Primary key                                                |
| `thing_group` | INDEX       | Allows filtering of `thing_group_devices` by `thing_group` |
| `device_id`   | INDEX       | Allows filtering of `thing_group_devices` by `thing`       |


#### Foreign Keys

| columns       | references  | description                           |
|:--------------|:-----------:|:--------------------------------------|
| `thing_group` |   `name`    | Guarantees the `thing_group` is valid |
| `device_id`   | `device_id` | Guarantees the `thing` is valid       |

### `thing_types`

#### Columns

| column        | postgresql type           | nullable | default | description                    |
|:--------------|:--------------------------|:--------:|:-------:|:-------------------------------|
| `name`        | `CHARACTER VARYING(25)`   |  FALSE   |    -    | Name of the thing type         |
| `description` | `CHARACTER VARYING(100)`  |  FALSE   |    -    | Description of the thing type  |
| `created_at`  | `Timestamp with timezone` |  FALSE   | `now()` | When the row was first created |
| `updated_at`  | `Timestamp with timezone` |  FALSE   | `now()` | When the row was last updated  |

#### Indexes

| columns | index type | description |
|:--------|:-----------|:------------|
| `name`  | PRIMARY    | Primary key |

### `things`

#### Columns

| column        | postgresql type           | nullable | default | description                    |
|:--------------|:--------------------------|:--------:|:-------:|:-------------------------------|
| `name`        | `CHARACTER VARYING(25)`   |  FALSE   |    -    | Name of the `thing`            |
| `description` | `CHARACTER VARYING(100)`  |  FALSE   |    -    | Description of the thing       |
| `thing_type`  | `CHARACTER VARYING(25)`   |  FALSE   |    -    | Name of the `thing_type`       |
| `created_at`  | `Timestamp with timezone` |  FALSE   | `now()` | When the row was first created |
| `updated_at`  | `Timestamp with timezone` |  FALSE   | `now()` | When the row was last updated  |

#### Indexes

| column | index type | description                     |
|:-------|:-----------|:--------------------------------|
| `name` | PRIMARY    | Primary key                     |

#### Foreign Keys

| columns      | references | description                    |
|:-------------|:----------:|:-------------------------------|
| `thing_type` |   `name`   | Guarantees the `type` is valid |

### `thing_payloads`

#### Columns

| column              | postresql type            | nullable |       default        | description                                                       |
|:--------------------|:--------------------------|:--------:|:--------------------:|:------------------------------------------------------------------|
| `id`                | `UUID`                    |  FALSE   | `uuid_generate_v4()` | Unique identifier for the `thing`                                 |
| `device_id`         | `CHARACTER VARYING(25)`   |  FALSE   |          -           | Device id of the `thing`                                          |
| `payload_timestamp` | `INTEGER`                 |  FALSE   |          -           | Stores the timestamp of when the payload was sent via the `thing` |
| `payload`           | `JSONB`                   |  FALSE   |       `jsonb`        | Stores the payload sent via the `thing`                           |
| `created_at`        | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was first created                                    |
| `updated_at`        | `Timestamp with timezone` |  FALSE   |       `now()`        | When the row was last updated                                     |

#### Indexes

| columns             | index type  | description                                                 |
|:--------------------|:------------|:------------------------------------------------------------|
| `id`                | PRIMARY KEY | Primary key                                                 |
| `device_id`         | INDEX       | Allows filtering of `thing_payloads` by `thing`             |
| `payload_timestamp` | INDEX       | Allows filtering of `thing_payloads` by `payload_timestamp` |

#### Foreign Keys

| columns     | references    | description                     |
|:------------|:--------------|:--------------------------------|
| `device_id` | `device_id`   | Guarantees the `thing` is valid |
