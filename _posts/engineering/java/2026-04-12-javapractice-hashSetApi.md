---
layout: post
title: "[Java 활용] HashSet 핵심 메서드(API) 총정리"
date: 2026-04-12 20:30
tags: [스터디로그, java, Collection, Set, HashSet, API]
summary: 데이터의 중복을 허용하지 않고 순서가 없는 집합형 자료구조 HashSet의 핵심 메서드 사용법을 완벽하게 정리한다.
---

앞선 포스트에서 순서를 보장하지 않고 데이터의 중복을 원천 차단하는 `Set`의 특징과 해시 알고리즘에 대해 알아보았다.

{% include link-card.html url="/blog/engineering/java/javabasic-17+collectionframework" %}

`HashSet`은 내부적으로 번호표(Index)를 발급하지 않는 주머니와 같다. 따라서 `ArrayList`나 `LinkedList`에서 사용하던 **`get(index)` 기능이 존재하지 않는다**는 점이 가장 큰 차이점이다. 


## 1. HashSet 핵심 기능 요약

`HashSet<String> set = new HashSet<>();` 가 선언되어 있다고 가정할 때, 가장 자주 쓰이는 메서드들은 다음과 같다.

| 기능 (Method) | 설명 | 사용 예시 | 실행 후 집합 상태 / 반환 결과 |
| :--- | :--- | :--- | :--- |
| **`add(value)`** | 집합에 데이터를 **추가**한다. | `set.add("철수");` | `["철수"]` |
| **`contains(value)`** | 특정 데이터가 **포함되어 있는지** 확인한다. | `set.contains("영희");` | `false` (반환값) |
| **`size()`** | 현재 집합에 들어있는 데이터 **총개수**를 확인한다.| `set.size();` | `1` (반환값) |
| **`remove(value)`** | 특정 데이터를 찾아 **삭제**한다. (인덱스가 없으므로 값만 사용 가능) | `set.remove("철수");` | `[]` (비어있음) |
| **`clear()`** | 집합 안의 모든 데이터를 **전체 삭제**한다. | `set.clear();` | `[]` (비어있음) |


## 2. 💻 코드로 보는 HashSet 조작 흐름

```java
import java.util.HashSet;

public class HashSetApiEx {
    public static void main(String[] args) {
        
        HashSet<String> set = new HashSet<>();
        
        // 1. add(): 데이터 추가
        set.add("철수");
        set.add("영희");
        set.add("철수"); // 중복 데이터 삽입 시도 (무시됨)
        
        System.out.println("add 후 집합: " + set); // [영희, 철수] (순서 보장 안됨)
        
        // 2. size(): 크기 확인 (중복이 무시되었으므로 2명)
        System.out.println("현재 크기: " + set.size() + "명"); // 2
        
        // 3. contains(): 포함 여부 확인 (조회 기능이 없으므로 주로 이걸로 확인)
        System.out.println("영희가 있나요? " + set.contains("영희")); // true
        System.out.println("민수가 있나요? " + set.contains("민수")); // false
        
        // 4. remove(): 특정 데이터 지우기 (인덱스가 없으므로 무조건 값을 넘겨야 함)
        set.remove("철수");
        System.out.println("remove 후 집합: " + set); // [영희]
        
        // 5. clear(): 전체 비우기
        set.clear();
        System.out.println("clear 후 집합: " + set); // []
    }
}