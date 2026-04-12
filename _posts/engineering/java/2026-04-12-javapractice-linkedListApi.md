---
layout: post
title: "[Java 기초] [활용] 실전! LinkedList 핵심 메서드(API) 총정리"
date: 2026-04-12 20:00
tags: [스터디로그, java, Collection, LinkedList, API]
summary: 삽입과 삭제에 특화된 이중 연결 리스트 구조인 LinkedList의 핵심 메서드 사용법을 알아본다. (Deque 인터페이스 특화 기능 포함)
---

이전 포스트에서 노드(Node)들의 연결로 이루어진 `LinkedList`의 구조적 특징을 알아보았다. 

{% include link-card.html url="/blog/engineering/java/javabasic-17+collectionframework" %}

`LinkedList`는 기본적으로 `List` 인터페이스를 구현하므로 `ArrayList`와 사용하는 메서드가 거의 비슷하지만, 양방향으로 데이터를 넣고 뺄 수 있는 `Deque`의 성질도 가지고 있어서 **맨 앞이나 맨 뒤의 데이터를 직접 조작하는 특화된 메서드**들을 추가로 제공한다.


## 1. LinkedList 핵심 기능 요약

`LinkedList<String> list = new LinkedList<>();` 가 선언되어 있다고 가정할 때, 가장 자주 쓰이는 메서드들은 다음과 같다.

| 기능 (Method) | 설명 | 사용 예시 | 실행 후 리스트 상태 / 반환 결과 |
| :--- | :--- | :--- | :--- |
| **`add(value)`** | 리스트의 맨 뒤에 데이터를 **추가**한다. | `list.add("철수");` | `["철수"]` |
| **`get(index)`** | 특정 인덱스의 데이터를 **조회**한다. | `list.get(0);` | `"철수"` (반환값) |
| **`getFirst()`** | 리스트의 **맨 처음** 데이터를 조회한다. | `list.getFirst();` | `"철수"` (반환값) |
| **`getLast()`** | 리스트의 **맨 마지막** 데이터를 조회한다. | `list.getLast();` | `"철수"` (반환값) |
| **`addFirst(value)`** | 리스트의 **맨 앞**에 데이터를 추가한다. | `list.addFirst("영희");` | `["영희", "철수"]` |
| **`addLast(value)`** | 리스트의 **맨 뒤**에 데이터를 추가한다. | `list.addLast("영철");` | `["영희", "철수", "영철"]` |
| **`clear()`** | 리스트 안의 모든 데이터를 **전체 삭제**한다. | `list.clear();` | `[]` (비어있음) |


## 2. 💻 코드로 보는 LinkedList 조작 흐름

```java
import java.util.LinkedList;

public class LinkedListApiEx {
    public static void main(String[] args) {
        
        LinkedList<String> list = new LinkedList<>();
        
        // 1. add(): 기본 추가 (맨 뒤에 들어감)
        list.add("철수");
        System.out.println("add 후: " + list); // [철수]
        
        // 2. addFirst(): 맨 앞에 밀어 넣기 (LinkedList의 특화 기능)
        list.addFirst("영희");
        System.out.println("addFirst 후: " + list); // [영희, 철수]
        
        // 3. addLast(): 맨 뒤에 밀어 넣기
        list.addLast("영철");
        System.out.println("addLast 후: " + list); // [영희, 철수, 영철]
        
        // 4. getFirst() / getLast(): 양 끝단 데이터 즉시 조회
        System.out.println("맨 앞: " + list.getFirst()); // 영희
        System.out.println("맨 뒤: " + list.getLast());  // 영철
        System.out.println("0번 인덱스: " + list.get(0)); // 영희
        
        // 5. clear(): 전체 비우기
        list.clear();
        System.out.println("clear 후: " + list); // []
    }
}