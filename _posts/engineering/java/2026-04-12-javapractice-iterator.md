---
layout: post
title: "[Java 활용] Iterator 핵심 메서드와 for-each"
date: 2026-04-13 14:00
tags: [스터디로그, java, Collection, Iterator, For-each, API]
summary: 컬렉션의 데이터를 순차적으로 탐색하고 안전하게 삭제할 수 있는 Iterator의 핵심 메서드 사용법과, 이를 압축한 향상된 for문(for-each)의 구조를 알아본다.
---

앞선 포스트에서 인덱스(번호표)가 없는 컬렉션(`Set`, `Map`)을 순회하기 위한 자바의 표준 탐색기, `Iterator`의 도입 배경을 알아보았다.

{% include link-card.html url="/blog/engineering/java/javabasic-19-iterator" %}

실무에서 `Iterator`는 단순히 데이터를 읽어오는 것뿐만 아니라, **"순회하는 도중에 특정 데이터를 안전하게 삭제"**해야 할 때 아주 유용하게 쓰인다.

이번 포스트에서는 `Iterator`의 3가지 핵심 기능과, 이를 문법적으로 편리하게 압축해 둔 향상된 `for`문의 사용법을 표와 코드로 완벽히 정리했다.


## 1. Iterator 핵심 기능 요약 (Cheat Sheet)

`Iterator<String> it = list.iterator();` 가 선언되어 있다고 가정할 때, 제공되는 핵심 기능은 다음과 같다.

| 기능 (Method) | 설명 | 사용 예시 | 실행 후 결과 |
| :--- | :--- | :--- | :--- |
| **`hasNext()`** | 커서 뒤에 읽어올 **다음 요소가 남아있는지 확인**한다. | `it.hasNext();` | `true` 또는 `false` |
| **`next()`** | 커서를 한 칸 이동시키고, 그 위치의 **요소를 가져온다**. | `it.next();` | `"김철수"` (값 반환) |
| **`remove()`** | 방금 `next()`로 읽어온 요소를 컬렉션에서 **삭제**한다. | `it.remove();` | 반환값 없음 (데이터 지워짐) |

💡 **참고 (`remove` 주의사항)**: `it.remove()`는 단독으로 사용할 수 없다. **반드시 `it.next()`를 통해 요소를 한 번 읽어온 직후에만 호출**해야 하며, 그렇지 않으면 에러(`IllegalStateException`)가 발생한다.


## 2. 💻 코드로 보는 Iterator 탐색과 삭제

AI 모델링 기술 스택이 담긴 리스트를 순회하면서, 특정 조건에 맞는 데이터(더 이상 사용하지 않는 레거시 API)만 안전하게 삭제하는 실전 예제를 확인해 보자.

```java
import java.util.ArrayList;
import java.util.Iterator;

public class IteratorApiEx {
    public static void main(String[] args) {
        
        // 1. 리스트 생성 및 데이터 추가
        ArrayList<String> students = new ArrayList<>();
        students.add("김철수");
        students.add("이영희"); // 전학 가서 지워야 할 데이터
        students.add("홍길동");
        students.add("박민수");

        // 2. 컬렉션에 Iterator(탐색기) 장착
        Iterator<String> it = students.iterator();

        // 3. hasNext()로 다음 데이터가 있는지 확인하며 반복
        while (it.hasNext()) {
            
            // 4. next()로 데이터 뽑아오기
            String student = it.next();
            
            // 5. 조건에 맞는 데이터 삭제하기 (remove)
            if (student.equals("이영희")) {
                it.remove(); // 방금 next()로 꺼낸 "이영희" 학생을 명단에서 완벽히 삭제
                System.out.println(student + " 학생 전학 처리 완료");
            } else {
                System.out.println("재학생: " + student);
            }
        }

        System.out.println("최종 명단: " + students); 
        // 출력: [김철수, 홍길동, 박민수]
    }
}
```

## 3. 데이터를 읽기만 한다면? 👉 향상된 for문 (for-each)
만약 순회 도중에 데이터를 삭제(remove)할 필요 없이 단순히 처음부터 끝까지 데이터를 읽어오기만 할 목적이라면, 코드가 길어지는 Iterator와 while문 대신 향상된 for문을 사용하는 것이 현대 자바의 표준이다.

향상된 for문은 내부적으로 Iterator를 자동으로 생성하여 동작하므로, 개발자는 데이터가 담길 변수만 선언해 주면 된다.

```Java
public class ForEachEx {
    public static void main(String[] args) {
        ArrayList<String> students = new ArrayList<>();
        students.add("김철수");
        students.add("홍길동");
        students.add("박민수");

        // Iterator의 while(it.hasNext())와 it.next() 로직이 단 3줄로 압축됨!
        // 읽어온 데이터는 매 반복마다 'student' 변수에 쏙쏙 담긴다.
        for (String student : students) {
            System.out.println("출석: " + student);
        }
    }
}
```