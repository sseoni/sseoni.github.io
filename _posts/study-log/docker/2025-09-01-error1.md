---
layout: post

title: "dockerfile name error, -f flag"
date: 2025-09-01
tags: [스터디로그, Docker, CS, errorhandling]
summary:
---

Docker는 **기본 파일명으로 `Dockerfile`만 인식**한다.

대소문자까지 완전히 동일해야 한다.

즉, 디렉토리에서 **`Dockerfile`** 이름만 자동으로 읽힌다:

만약 이름이 다음과 같다면 자동 인식되지 않는다:

```
dockerfile
DockerFile
DOCKERFILE
my.Dockerfile
```

이때 Docker는 “어떤 파일을 Dockerfile로 써야 할지” 모르기 때문에 **명시적으로 알려주는 옵션**을 사용해야 한다.

### 2. `f` 플래그란?

- `f` 는 `-file` 의 약자로

**Docker에게 사용해야 할 Dockerfile의 파일명을 직접 지정하는 옵션**이다.

예:

```
docker build -f ./dockerfile -t gitblog .
```

이 뜻은:

- “`./dockerfile`이라는 파일을 Dockerfile로 사용해라”
- “현재 디렉토리를 빌드 컨텍스트로 삼아라”

를 의미한다.

### 자동 인식 (파일명: **Dockerfile**)

```
docker build -t gitblog .
```

### 직접 지정 필요 (파일명: **dockerfile**)

```
docker build -f dockerfile -t gitblog .
```

### 디렉토리 구조 예

```
project/
 ├── dockerfile    ← 자동 인식 안 됨
 ├── Dockerfile    ← 자동 인식됨
 └── app.py
```