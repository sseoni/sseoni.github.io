---

layout: post
title: "[Java 기초] Map 인터페이스와 HashMap 구조"
date: 2026-04-12 00:00
tags: [스터디로그, java, Collection, Map, HashMap]
summary:

---

지금까지 살펴본 `List`와 `Set`은 데이터(Value)를 하나씩 나열해서 저장하는 구조였다. 하지만 현실에서는 "홍길동의 점수는 90점", "apple의 뜻은 사과"처럼 **두 개의 데이터가 짝을 이루는 구조**가 훨씬 많이 쓰인다.

이를 완벽하게 구현한 자료구조가 바로 **`Map` 인터페이스**다.

## 1. Map의 핵심: Key-Value 구조

`Map`은 데이터를 저장할 때 반드시 **키(Key)**와 **값(Value)**의 쌍(Pair)으로 묶어서 저장한다. 마치 데이터베이스의 사전(Dictionary)이나 JSON 포맷과 완전히 동일한 구조다.

* **키 (Key)**: 데이터를 식별하는 고유한 이름표다. **중복을 절대 허용하지 않으며, 순서가 없다.** (즉, 내부적으로 `Set` 자료구조와 동일한 특성을 가진다.)
* **값 (Value)**: 실제 저장하려는 데이터다. 키가 다르면 값은 **중복되어도 상관없다.** (즉, 내부적으로 `List`처럼 동작한다.)

> 💡 **참고**: `Map`은 `List`, `Set`과 달리 `Collection` 인터페이스를 직접 상속받지 않는 독립적인 구조를 띠고 있지만, 자바 컬렉션 프레임워크의 핵심 축을 담당한다.

## 2. HashMap (해시 기반 맵)

`Map` 인터페이스의 가장 대표적인 구현체가 바로 **`HashMap`**이다. 이름에서 알 수 있듯, 키(Key)를 저장할 때 **해시 알고리즘(Hash Algorithm)**을 사용하여 엄청난 검색 속도를 자랑한다.

* **검색 속도 $O(1)$**: 수백만 개의 데이터가 있어도, 키(Key) 값만 알면 데이터를 처음부터 뒤지지 않고 해당 메모리 위치로 곧바로 점프해서 값(Value)을 가져온다.
* **사용 사례**: 사용자 ID 기반 정보 조회, 설정값(Config) 관리, 캐시(Cache) 데이터 저장 등 식별자가 필요한 모든 곳에 쓰인다.


```java
import java.util.HashMap;

public class SimpleMapEx {
    public static void main(String[] args) {
        
        // Key: 학생 이름(String), Value: 점수(Integer)를 쌍으로 묶는 맵 생성
        HashMap<String, Integer> scoreMap = new HashMap<>();
        
        // 1. 짝을 지어 데이터 저장 (put)
        scoreMap.put("홍길동", 90);
        scoreMap.put("이순신", 100);
        
        // 2. 키(Key)를 통해 값(Value)을 광속으로 찾아오기 (get)
        System.out.println("이순신의 점수: " + scoreMap.get("이순신")); // 100 출력
        System.out.println("홍길동의 점수: " + scoreMap.get("홍길동")); // 90 출력
    }
}
```