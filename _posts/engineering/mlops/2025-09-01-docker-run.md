---
layout: post

title: "Docker 실행하기"
date: 2025-09-01
tags: [스터디로그, Docker, CS]
summary:
---

## 실행방법: build → run

기본적으로 docker를 실행하려면 build를 하고 실행(run)을 해야한다.

따라서 아래 명령어 두개를 모두 실행해야한다.

```python
 docker build [도커 파일 경로]
 docker run [포트]:[포트] [이미지 ID]
```

두 명령어를 실행할 때 아래와 같은 에러메세지가 뜨는 경우가 있는데 그건 도커 데몬이 실행되고있지 않아서 발생하는 문제이기 때문에 도커 프로그램을 실행시켜주면 바로 해결된다.

```python
ERROR: Cannot connect to the Docker daemon at unix:///Users/.docker/run/docker.sock. Is the docker daemon running?
```

[🔗 docker 설치, 실행하기](https://sseoni.github.io/blog/docker/25090101)

## **실행 확인: ps**

## 주의할 점

Docker는 **기본 파일명으로 `Dockerfile`만 인식**한다.

대소문자까지 완전히 동일해야 한다.

[🔗 dockerfile name error, -f flag](https://sseoni.github.io/blog/docker/25090104)