---
layout: post
title:  "[PostgreSQL] Table Partitioning"
category: [데이터베이스, database]
tags:
  - postgresql
comments: true
---

## 테이블 파티셔닝
한 테이블에 데이터 양이 많아지면(1000만 로우를 돌파하게 되면), 데이터베이스의 쿼리 성능은 현저히 떨어진다. <br />
따라서 큰 서비스이고, 방대한 데이터가 쌓일 가능성이 있다면 테이블 파티셔닝을 고려해야 한다. <br />
테이블 파티셔닝은 논리적으로 하나의 큰 테이블을 더 작은 물리적 조각으로 분할하는 것을 의미한다.
PostgreSQL은 테이블 상속을 통한 파티셔닝을 지원한다.

## 테이블 상속
테이블 상속의 개념은 객체 지향 프로그래밍 언어에서 소개하는 상속의 개념과 흡사하다. <br />
이미 존재하는 테이블의 속성을 상속 받아서 자식 테이블에서 사용할 수 있다.

## 테이블 파티셔닝 단계
>
- `Pokemon GO`에서 모든 유저는 잡은 포켓몬을 모을 수 있는 저장 공간이 있다.
- 저장 공간에서 공통으로 사용하는 컬럼은 부모 테이블에 정의한다.
- 저장 공간의 자식 테이블은 유저의 ID에 따라서 분리된다.

### Step 1. 부모 테이블 생성
* 부모 테이블 자체는 일반적으로 비어있고, 전체 데이터 세트를 표현하기 위해 존재한다.
* 하위 모든 테이블에 적용할 것이 아니라면, 제한 조건을 걸지 말아야 한다.
* 인덱스나 유니크 제한 조건도 걸을 필요 또한 없다.

```sql
CREATE TABLE IF NOT EXISTS pokemon_storage (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES pokemongo_user,
  pokemon_name VARCHAR(50) NOT NULL,
  cp INTEGER NOT NULL
);
```

### Step 2. 자식 테이블 생성
`user_id`의 맨 끝자리 `0 - 9`에 따라 테이블을 분리한다. 유저 ID에 해당하는 데이터만 입력 받도록 `check` 제약 조건을 지정한다. <br />
상속 받아서 테이블을 정의하기 때문에 컬럼을 별도로 정의하지 않아도 된다.

```sql
CREATE TABLE IF NOT EXISTS pokemon_storage_0 (
  id INTEGER DEFAULT nextval('pokemon_storage_id_seq'::regclass) PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES pokemongo_user,
  CHECK (user_id % 10 = 0)
) INHERITS (pokemon_storage);

CREATE TABLE IF NOT EXISTS pokemon_storage_1 (
  id INTEGER DEFAULT nextval('pokemon_storage_id_seq'::regclass) PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES pokemongo_user,
  CHECK (user_id % 10 = 1)
) INHERITS (pokemon_storage);

...

CREATE TABLE IF NOT EXISTS pokemon_storage_9 (
  id INTEGER DEFAULT nextval('pokemon_storage_id_seq'::regclass) PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES pokemongo_user,
  CHECK (user_id % 10 = 9)
) INHERITS (pokemon_storage);
```

#### 부모 테이블 Description
![]({{site.url}}/assets/parent-table-description.png){: .left-image}

### Step 3. 트리거 함수 생성
테이블에 데이터 삽입시 자동 분할하여 자식 테이블에 입력이 되지 않기 때문에, 동적 분할을 위한 트리거 함수를 만들어야 한다. <br />
예제는 `RETERNUNG`이 없을 경우이다. => [RETURNING이 있을 경우]()

```sql
CREATE FUNCTION pokemon_storage_insert_trigger() RETURNS TRIGGER LANGUAGE plpgsql
AS $$
  BEGIN
    CASE (NEW.user_id % 10)
      WHEN 0
        THEN INSERT INTO pokemon_storage_0 VALUES (NEW.*);
      WHEN 1
        THEN INSERT INTO pokemon_storage_1 VALUES (NEW.*);

      ...

      WHEN 9
        THEN INSERT INTO pokemon_storage_9 VALUES (NEW.*);
      ELSE
        RAISE EXCEPTION 'Invalid user_id. ADD new pokemon_storage child table and fix pokemon_storage_insert_trigger function';
    END CASE;
    RETURN NULL;
  END;
$$;

-- create trigger for pokemon_storage insert function
CREATE TRIGGER insert_pokemon_storage_trigger
  BEFORE INSERT ON pokemon_storage
  FOR EACH ROW EXECUTE PROCEDURE pokemon_storage_insert_trigger();

```


