---
layout: post
title: "[Java 기초] 스트림(Stream) API: 컬렉션 데이터 처리의 혁명"
date: 2026-04-14 11:00
tags: [스터디로그, java, Collection, Stream, Lambda]
summary: 람다식을 활용하여 컬렉션 데이터를 필터링하고 가공할 수 있게 해주는 스트림(Stream) API의 파이프라인 구조를 알아본다.
---

앞선 포스트에서 람다식(Lambda)을 통해 코드를 아주 간결하게 작성하는 방법을 배웠다. 자바 개발진은 이 람다식을 우리가 매일 사용하는 컬렉션(`List`, `Set`)에 결합하여 엄청난 시너지를 만들어냈는데, 그것이 바로 **스트림(Stream) API**다.

## 1. 기존 for문의 한계와 스트림의 등장

여러 사람의 이름이 담긴 리스트에서, 성이 "김"씨인 사람만 찾아 이름 뒤에 "님"을 붙여 출력하는 요구사항이 있다고 가정해 보자.

```java
// 🚨 기존의 방식: "어떻게(How)"에 집중
List<String> names = Arrays.asList("김철수", "이영희", "김민수", "홍길동");

for (String name : names) {
    if (name.startsWith("김")) { // 필터링 조건
        System.out.println(name + "님"); // 가공 및 출력
    }
}
```

이 방식은 조건이 복잡해질수록 코드의 뎁스(들여쓰기)가 깊어지고 가독성이 심각하게 떨어진다.

반면 스트림 API를 사용하면 데이터를 컨베이어 벨트에 올려놓고 조립하듯이, 데이터가 흘러가는 파이프라인을 우아하게 구축할 수 있다.

```Java
// 💡 스트림 방식: "무엇을(What) 할 것인가"에 집중
names.stream()
     .filter(n -> n.startsWith("김"))  // 1. "김"씨만 걸러내라! (람다식)
     .map(n -> n + "님")               // 2. 뒤에 "님"을 붙여라! (람다식)
     .forEach(n -> System.out.println(n)); // 3. 출력해라!
```

## 2. 스트림의 3단계 파이프라인 구조

스트림은 반드시 아래의 3단계 생명주기를 거치며 데이터를 처리한다.

### 단계 1: 생성 (Creation)

컬렉션의 데이터들을 컨베이어 벨트 위에 쏟아붓는 과정이다.

.stream(): 리스트나 셋을 스트림 형태로 변환한다.

### 단계 2: 중간 연산 (Intermediate Operation)

데이터를 필터링하거나 형태를 가공하는 과정이다. 계속해서 체이닝(연결)할 수 있으며, 앞서 배운 람다식이 여기서 쓰인다.

.filter(조건): 조건에 맞는 데이터만 걸러낸다.

.map(변환): 데이터를 다른 형태로 매핑(변환)한다.

### 단계 3: 최종 연산 (Terminal Operation)

가공이 끝난 데이터들을 모아서 최종 결과를 만들어내고 스트림을 닫는 과정이다. 최종 연산을 호출하기 전까지는 중간 연산들이 실제로 실행되지 않는다.

.forEach(): 가공된 데이터를 하나씩 꺼내어 실행한다.

.collect(Collectors.toList()): 가공된 데이터들을 모아서 새로운 List 바구니에 담아 반환한다.

## 3. 실전 활용: 조건에 맞는 데이터만 새 리스트로 모으기

실무에서는 원본 데이터를 훼손하지 않고, 가공된 데이터들만 모아 새로운 리스트로 반환하는 로직을 가장 많이 사용한다.

```Java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamEx {
    public static void main(String[] args) {
        List<String> rawNames = Arrays.asList("김철수", "이영희", "김민수", "홍길동");

        // "김"씨만 필터링하고 "님"을 붙인 뒤, 새로운 리스트로 수집!
        List<String> processedNames = rawNames.stream()
                .filter(name -> name.startsWith("김"))
                .map(name -> name + "님")
                .collect(Collectors.toList()); // 최종 연산: List로 모아라

        System.out.println("초대장 발송 명단: " + processedNames); 
        // 출력: [김철수님, 김민수님]
    }
}
```