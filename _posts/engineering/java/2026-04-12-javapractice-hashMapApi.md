---
layout: post
title: "[Java 활용] HashMap 핵심 메서드(API) 총정리"
date: 2026-04-12 12:00
tags: [스터디로그, java, Collection, Map, HashMap, API]
summary: 키(Key)와 값(Value)의 쌍으로 데이터를 다루는 HashMap의 핵심 메서드(put, get, remove 등) 사용법을 완벽하게 정리한다.
---

이전 포스트에서 키(Key)와 값(Value)을 한 쌍으로 묶어서 저장하는 `Map` 인터페이스와 `HashMap`의 해시 알고리즘 특징에 대해 알아보았다.

{% include link-card.html url="/blog/engineering/java/javabasic-18-hashmap" %}

`HashMap`은 일반적인 `List`나 `Set`과 구조가 완전히 다르기 때문에, 데이터를 추가할 때 `add()` 대신 `put()`을 사용하는 등 전용 메서드(API)를 사용해야 한다. 실무에서 데이터를 다룰 때 가장 빈번하게 사용되는 `HashMap`의 핵심 메서드 6가지를 표와 코드로 정리해 본다.

## 1. HashMap 핵심 기능 요약 (Cheat Sheet)

이름(문자열)을 키로, 점수(정수)를 값으로 갖는 `HashMap<String, Integer> map = new HashMap<>();` 가 선언되어 있다고 가정할 때, 가장 자주 쓰이는 메서드들은 다음과 같다.

| 기능 (Method) | 설명 | 사용 예시 | 실행 후 맵 상태 / 반환 결과 |
| :--- | :--- | :--- | :--- |
| **`put(key, value)`** | 맵에 Key-Value 쌍을 **추가**한다. | `map.put("홍길동", 100);` | `{"홍길동"=100}` |
| **`get(key)`** | 특정 Key를 이용해 연결된 Value를 **가져온다**. | `map.get("홍길동");` | `100` (반환값) |
| **`containsKey(key)`** | 특정 Key가 맵에 **포함되어 있는지** 확인한다. | `map.containsKey("영희");` | `false` (반환값) |
| **`remove(key)`** | 특정 Key를 찾아 해당 쌍을 통째로 **삭제**한다. | `map.remove("홍길동");` | `{}` (비어있음) |
| **`size()`** | 현재 맵에 들어있는 쌍의 **총개수**를 확인한다. | `map.size();` | `1` (반환값) |
| **`clear()`** | 맵 안의 모든 데이터를 **전체 삭제**하여 비운다. | `map.clear();` | `{}` (비어있음) |

> 💡 **참고 (덮어쓰기 기능)**: `HashMap`은 Key의 중복을 허용하지 않는다. 만약 이미 존재하는 Key(`"홍길동"`)에 대고 `map.put("홍길동", 80);`을 한 번 더 실행하면, 에러가 나지 않고 기존의 값 `100`이 `80`으로 **수정(Update)**된다.

## 2. 💻 코드로 보는 HashMap 조작 흐름 (API)

```java
import java.util.HashMap;

public class HashMapEx {
    public static void main(String[] args) {
        
        // <Key타입, Value타입> 제네릭을 2개 쓴다
        HashMap<String, Integer> map = new HashMap<>();
        
        // 1. put(K, V): 데이터 추가
        map.put("홍길동", 90);
        map.put("이순신", 100);
        map.put("강감찬", 80);
        
        System.out.println("map 내용: " + map); 
        // 출력: {홍길동=90, 이순신=100, 강감찬=80} (순서 보장 안됨)

        // 2. get(K): 키를 이용해 값 조회
        System.out.println("이순신의 점수: " + map.get("이순신")); // 100

        // (Tip) 중복된 Key를 put() 한다면? -> 덮어쓰기(Update)가 일어남!
        map.put("홍길동", 95); 
        System.out.println("수정된 홍길동 점수: " + map.get("홍길동")); // 95
        
        // 3. containsKey(K): 특정 키가 존재하는지 확인
        System.out.println("유관순 데이터가 있나요? " + map.containsKey("유관순")); // false
        
        // 4. remove(K): 특정 키와 그에 연결된 값을 통째로 삭제
        map.remove("강감찬");
        
        // 5. size(): 맵에 저장된 Key-Value 쌍의 총개수
        System.out.println("총 학생 수: " + map.size()); // 2

        // 6. clear(): 전체 삭제
        map.clear();
        System.out.println("clear 후 크기: " + map.size()); // 0
    }
}
```