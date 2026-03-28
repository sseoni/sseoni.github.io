---
layout: post
title: "[Java 기초] 3. 문자열(String)"
date: 2026-03-25
tags: [스터디로그, Java, 정보처리기사]
summary:
---

## 1. 문자열 기본 (String Basics)

자바에서 문자열을 생성하는 방법은 크게 두 가지가 있다.

메모리를 효율적으로 사용할 수 있는 리터럴 방식이 더 권장된다.

```java
// 1. 리터럴 방식 (권장 ⭐)
// 메모리의 'String Constant Pool'에 저장되어 같은 문자열은 재사용된다.
String str1 = "Hello"; 

// 2. new 객체 생성 방식
// 호출할 때마다 메모리(Heap)에 새로운 객체를 무조건 찍어낸다. (메모리 낭비 가능성)
String str2 = new String("Hello");
```

---

### 2. 문자열 필수 기능 (String Methods)

문자열을 조작하고 정보를 얻어내는 핵심 내장 함수들이다. 아래 표는 `String s = "I like Java";`를 기준으로 작성되었다. (자바의 인덱스는 **0부터 시작**한다.)

| **기능 (Method)** | **설명** | **예시** | **결과** |
| --- | --- | --- | --- |
| `length()` | 문자열의 총 길이를 반환 (공백 포함) | `s.length();` | `11` |
| `toUpperCase()` | 모든 문자를 대문자로 변환 | `s.toUpperCase();` | `"I LIKE JAVA"` |
| `toLowerCase()` | 모든 문자를 소문자로 변환 | `s.toLowerCase();` | `"i like java"` |
| `contains()` | 특정 문자열이 포함되어 있는지 확인 | `s.contains("Java");` | `true` |
| `indexOf()` | 특정 문자열이 처음 시작되는 위치(인덱스) 반환 | `s.indexOf("Java");` | `7` |
| `lastIndexOf()` | 특정 문자열이 마지막으로 등장하는 위치 반환 | `s.lastIndexOf("a");` | `10` |

```java
String s = "I like Java";

// [문자열 기능 사용 예제]
System.out.println(s.length()); // 11 출력
System.out.println(s.toUpperCase()); // I LIKE JAVA 출력
System.out.println(s.indexOf("Java")); // J가 7번째 인덱스에 있으므로 7 출력
```

---

### 3. 문자열 비교 (String Comparison)

자바에서 문자열을 비교할 때 가장 주의해야 할 부분이다. 단순 연산자인 `==`와 내장 함수인 `.equals()`의 용도가 완전히 다르다.

- `==` 연산자: 두 문자열이 메모리상에서 **같은 주소(위치)**를 가리키는지 비교한다.
- `.equals()` 메서드: 메모리 주소와 상관없이, 안에 들어있는 **실제 텍스트 내용**이 완벽히 같은지 비교한다.

```java
String a = "Java";
String b = "Java"; // a와 같은 리터럴 풀을 참조
String c = new String("Java"); // 아예 새로운 메모리 주소에 할당됨

// 1. 주소 비교
System.out.println(a == b); // true (리터럴 방식은 같은 텍스트면 같은 주소를 가리킴)
System.out.println(a == c); // false (c는 new로 새로 만들었기 때문에 주소가 다름)

// 2. 실제 값 비교 (실무 및 알고리즘 필수 ⭐)
System.out.println(a.equals(c)); // true (주소는 달라도 내용물 "Java"는 똑같으므로 true)

// 3. 대소문자 무시하고 값 비교
String d = "java";
System.out.println(a.equalsIgnoreCase(d)); // true
```

---

### 4. 특수 문자 (Escape Sequence)

문자열 안에서 줄바꿈을 하거나, 따옴표 자체를 글자로 출력하고 싶을 때는 백슬래시(`\`)와 조합된 **이스케이프 시퀀스**를 사용해야 한다.

| **특수 문자** | **설명** | **사용 예시** | **결과** |
| --- | --- | --- | --- |
| `\n` | 줄바꿈 (New line) | `"안녕\n하세요"` | 안녕
하세요 |
| `\t` | 탭 (Tab) - 일정 간격 띄우기 | `"이름:\t홍길동"` | 이름: 홍길동 |
| `\"` | 큰따옴표 출력 | `"\"자바\" 공부"` | "자바" 공부 |
| `\'` | 작은따옴표 출력 | `"\'자바\' 공부"` | '자바' 공부 |
| `\\` | 백슬래시 자체를 출력 | `"C:\\Workspace"` | C:\Workspace |

```java
// [특수 문자 사용 예제]
System.out.println("줄바꿈이\n됩니다.");
System.out.println("경로는 C:\\Users\\Desktop 입니다.");
System.out.println("그가 말했다. \"자바는 재밌어!\"");
```