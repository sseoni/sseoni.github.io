---
layout: post
title: "[Java 활용] ArrayList 핵심 메서드(API) 총정리"
date: 2026-04-12 19:30
tags: [스터디로그, java, Collection, ArrayList, API]
summary: 실무와 코딩 테스트에서 가장 빈번하게 사용되는 ArrayList의 데이터 추가, 조회, 수정, 삭제 관련 핵심 메서드들의 사용법을 완벽하게 정리한다.
---

앞선 포스트에서 동적 배열인 `ArrayList`의 구조적 특징에 대해 알아보았다. 

{% include link-card.html url="/blog/engineering/java/javabasic-17+collectionframework" %}

이론을 알았다면 이제 바구니를 직접 다뤄볼 차례다. `ArrayList`는 자바에서 가장 보편적으로 사용되는 자료구조인 만큼, 데이터를 다루는 강력하고 다양한 내장 기능(API)들을 제공한다.

실무 개발은 물론이고 코딩 테스트나 정보처리기사 실기 시험 등에서도 데이터 조작을 위해 반드시 숙지해야 하는 `ArrayList`의 핵심 메서드 7가지를 표와 코드로 완벽하게 정리해 본다.


## 1. ArrayList 핵심 기능 요약 (Cheat Sheet)

`ArrayList<String> list = new ArrayList<>();` 가 선언되어 있다고 가정할 때, 가장 자주 쓰이는 메서드들은 다음과 같다.

| 기능 (Method) | 설명 | 사용 예시 | 실행 후 리스트 상태 / 반환 결과 |
| :--- | :--- | :--- | :--- |
| **`add(value)`** | 리스트의 맨 뒤에 데이터를 **추가**한다. | `list.add("철수");` | `["철수"]` |
| **`get(index)`** | 특정 인덱스 번호의 데이터를 **조회**한다. | `list.get(0);` | `"철수"` (반환값) |
| **`size()`** | 현재 리스트에 들어있는 데이터의 **총개수**를 확인한다. | `list.size();` | `1` (반환값) |
| **`set(index, value)`** | 특정 인덱스의 데이터를 다른 값으로 **수정(덮어쓰기)**한다. | `list.set(0, "영희");` | `["영희"]` |
| **`contains(value)`** | 특정 데이터가 리스트에 **포함되어 있는지** 확인한다. | `list.contains("영희");` | `true` (반환값) |
| **`remove(value)`** | 특정 데이터를 리스트에서 찾아 **삭제**한다. | `list.remove("영희");` | `[]` (비어있음) |
| **`clear()`** | 리스트 안의 모든 데이터를 **전체 삭제**하여 비운다. | `list.clear();` | `[]` (비어있음) |

> 💡 **참고**: `remove()` 메서드는 데이터의 값(`"영희"`)을 직접 넣어 삭제할 수도 있고, 인덱스 번호(`list.remove(0)`)를 넣어 해당 위치의 데이터를 지울 수도 있다. 삭제된 빈자리는 뒤에 있던 데이터들이 앞으로 당겨지며 자동으로 채워진다.


## 2. 💻 코드로 보는 ArrayList 조작 흐름

위에서 살펴본 7가지 메서드가 실제 코드 흐름 속에서 어떻게 리스트를 변화시키는지 직접 확인해 보자.

```java
import java.util.ArrayList;

public class ArrayListApiEx {
    public static void main(String[] args) {
        
        // 1. 리스트 생성
        ArrayList<String> list = new ArrayList<>();
        
        // 2. add(): 데이터 추가
        list.add("철수");
        list.add("영희");
        list.add("민수");
        System.out.println("add 후 리스트: " + list); // [철수, 영희, 민수]
        
        // 3. size(): 크기 확인
        System.out.println("현재 크기: " + list.size() + "명"); // 3명
        
        // 4. get(): 특정 위치 데이터 가져오기 (인덱스는 0부터 시작!)
        System.out.println("0번 인덱스: " + list.get(0)); // 철수
        
        // 5. set(): 데이터 수정 (0번 자리를 '길동'으로 변경)
        list.set(0, "길동");
        System.out.println("set 후 리스트: " + list); // [길동, 영희, 민수]
        
        // 6. contains(): 포함 여부 확인
        boolean hasYoungHee = list.contains("영희");
        System.out.println("영희가 있나요? " + hasYoungHee); // true
        
        // 7. remove(): 데이터 삭제
        list.remove("영희"); // 값으로 직접 삭제
        System.out.println("remove 후 리스트: " + list); // [길동, 민수]
        
        // 8. clear(): 전체 삭제
        list.clear();
        System.out.println("clear 후 리스트: " + list); // []
        System.out.println("clear 후 크기: " + list.size()); // 0
    }
}