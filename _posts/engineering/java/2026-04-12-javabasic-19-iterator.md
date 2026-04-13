---
layout: post
title: "[Java 기초] 컬렉션 데이터 순회하기: Iterator와 향상된 for문"
date: 2026-04-12 00:05
tags: [스터디로그, java, Collection, Iterator, For-each]
summary: 인덱스(번호표)가 없는 Set과 Map 자료구조의 데이터를 순차적으로 탐색하기 위한 표준 인터페이스, Iterator의 동작 원리와 향상된 for문(for-each)의 관계를 알아본다.
---

`ArrayList`처럼 인덱스(번호표)가 있는 자료구조는 일반적인 `for(int i = 0; i < size; i++)` 문법을 사용해 `get(i)`로 데이터를 하나씩 꺼내볼 수 있다. 

하지만 **`HashSet`이나 `HashMap`처럼 인덱스가 아예 없는 자료구조 안에 들어있는 데이터를 하나씩 모두 확인하려면 어떻게 해야 할까?** 이 문제를 해결하기 위해 등장한 자바의 표준 탐색 도구가 바로 **`Iterator`(반복자)**다.


## 1. Iterator: 컬렉션 전용 탐색기

`Iterator`는 컬렉션 내부의 데이터를 순차적으로 가리키는 **커서(Cursor)** 역할을 한다. 데이터가 어떤 구조(리스트, 셋)로 저장되어 있든 상관없이, 동일한 방법으로 데이터를 뽑아낼 수 있게 해주는 표준 인터페이스다.

### 핵심 API (3가지)
* `iterator()`: 컬렉션에 부착된 탐색기(Iterator) 객체를 하나 얻어온다.
* `hasNext()`: 커서 다음에 읽어올 데이터가 남아있는지 확인한다. (있으면 `true`, 없으면 `false`)
* `next()`: 커서를 다음 칸으로 이동시키고, 그 위치의 데이터를 반환한다.

```java
import java.util.HashSet;
import java.util.Iterator;

public class IteratorEx {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        set.add("Java");
        set.add("Spring");
        set.add("DB");

        // 1. 컬렉션에서 Iterator(탐색기) 객체 가져오기
        // 💡 주의: Iterator의 제네릭 타입(<String>)은 원본 컬렉션의 데이터 타입과 반드시 일치해야 함
        Iterator<String> it = set.iterator();

        // 2. hasNext(): 커서(Cursor) 다음에 읽어올 데이터가 남아있는지 확인
        // 데이터가 있으면 true, 모두 읽었으면 false를 반환하여 안전하게 반복문 종료
        while (it.hasNext()) {
            
            // 3. next(): 커서를 다음 칸으로 이동시키고, 그 위치의 데이터를 반환
            String data = it.next(); 
            System.out.println("읽은 데이터: " + data);
        }
    }
}
```

## 2. Map을 순회하는 방법 (keySet)
Map 자체는 Iterable 인터페이스를 상속받지 않아 직접 Iterator를 달 수 없다. 따라서 Map 안에 있는 Key들을 Set 형태로 먼저 뽑아낸 뒤, 그 Key들을 순회하면서 get(Key)를 통해 Value를 읽어오는 방식을 사용한다.

```Java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

public class MapIteratorEx {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("사과", 1000);
        map.put("바나나", 2000);

        // 1. Map에서 Key들만 뽑아내어 Set 바구니에 담기 (keySet)
        Set<String> keys = map.keySet();

        // 2. Key들이 모인 Set에 탐색기(Iterator) 장착
        Iterator<String> it = keys.iterator();

        // 3. Key를 하나씩 꺼내며 Map에서 Value 찾아오기
        while (it.hasNext()) {
            String key = it.next();
            int value = map.get(key); // Key를 이용해 값 획득
            System.out.println(key + "의 가격: " + value);
        }
    }
}
```

## 3. 현대 자바의 표준: 향상된 for문 (for-each)
매번 Iterator를 생성하고 while문을 돌리는 과정이 번거롭기 때문에, 자바 5버전부터는 내부적으로 Iterator를 알아서 작동시켜 주는 **향상된 for문(for-each)**이 도입되었다.
현재 실무에서는 코드가 훨씬 간결한 이 방식을 99% 사용한다.

```Java
// Iterator와 while문을 단 3줄로 압축한 향상된 for문
for (String key : map.keySet()) {
    System.out.println(key + "의 가격: " + map.get(key));
}
```

💡 **요약**: Iterator는 번호표가 없는 컬렉션을 탐색하는 근본적인 원리이며, 이를 더 쓰기 쉽게 문법적으로 압축해 놓은 것이 실무에서 매일 쓰는 **향상된 for문(for-each)**이다.