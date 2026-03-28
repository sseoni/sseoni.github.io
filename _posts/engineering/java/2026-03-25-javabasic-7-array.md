---
layout: post
title: "[Java 기초] 7. 배열(Array)과 순회"
date: 2026-03-25
tags: [스터디로그, Java, 정보처리기사]
summary:
---

수십 개의 데이터를 다루기 위해 변수를 수십 개 선언하는 것은 비효율적이다.

같은 타입의 여러 데이터를 하나의 묶음으로 묶는 **배열(Array)**을 사용해 데이터를 효율적으로 관리한다.

### 1. 배열의 선언과 초기화

배열은 이전에 다룬 **참조형(Reference Type)** 데이터다. 메모리(Heap)에 연속된 공간을 할당받으며, 한 번 크기가 정해지면 늘리거나 줄일 수 없다(크기 고정).

```java
// [배열 선언 및 초기화 예제]
// 1-1. 크기만 지정해서 생성 (기본값으로 초기화됨: 정수는 0, 참조형은 null)
int[] numbers = new int[5]; // 5개의 칸을 가진 배열 생성

// 1-2. []의 위치를 바꿔도 된다.
int numbers[] = new int[5]; // 1-1의 예제와 동일하게 기능

// 2. 생성과 동시에 값 할당 (가장 많이 쓰는 방식)
String[] names = {"Java", "Python", "C"};
```

### 2. 배열 순회 (Array Traversal)

배열 안의 모든 데이터를 처음부터 끝까지 확인하는 것을 '순회'라고 한다. 자바의 인덱스는 **0부터 시작**하며, 배열의 길이는 `.length` 속성을 통해 가져올 수 있다.

```java
int[] scores = {90, 85, 100, 75};

// 1. 기본 for문을 이용한 순회 (인덱스가 필요할 때 유리함)
for (int i = 0; i < scores.length; i++) {
    System.out.println(i + "번째 점수: " + scores[i]);
}

// 2. 향상된 for문 (for-each) (단순히 값을 읽어올 때 매우 간결함)
for (int score : scores) {
    System.out.println("점수: " + score);
}
```