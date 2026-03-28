---
layout: post

title: "[CS 기초] Python vs Java vs C: 용어 차이와 네이밍룰"
date: 2026-03-25
tags: [스터디로그, Python, Java, C, 정보처리기사]
summary:
---

똑같은 기능인데 언어마다 부르는 이름이 다르거나, 변수 이름을 짓는 방식이 달라서 당황한 적이 있을 것이다.

실무에서 밥 먹듯이 쓰이는 핵심 용어와 '네이밍 컨벤션(이름 짓기 규칙)'을 알아본다.

## 1. 함수(Function) vs 메소드(Method)

사실상 같은 녀석이지만, **'어디에 소속되어 있느냐'**에 따라 부르는 이름이 달라진다.

- **함수 (Function)**: 특정 작업을 수행하는 독립적인 코드 블록. 클래스(객체) 바깥에 혼자 존재할 수 있으면 함수라고 부른다. (주로 C, Python에서 사용)
- **메소드 (Method)**: **클래스(객체) 안에 소속되어 있는 함수**. 자바는 "모든 것은 클래스 안에 있어야 한다"는 규칙이 있으므로, 자바에 있는 모든 함수는 전부 '메소드'라고 부르는 것이 정확하다. (파이썬도 클래스 안에 만들면 메소드라 부른다.)

## 2. 개발자들의 암묵적인 네이밍룰 (Naming Convention)

컴퓨터 입장에서는 변수 이름을 `a`, `b`로 짓든 `A_b_c`로 짓든 상관하지 않지만, 개발자들 사이에서는 가독성을 위해 언어별로 합의된 이름 짓기 규칙이 있다.

| 구분 | 규칙 이름 | 형태 및 특징 | 주로 쓰이는 곳 |
| --- | --- | --- | --- |
| **낙타 표기법** | **camelCase** | 첫 단어는 소문자, 이어지는 단어의 첫 글자는 대문자. (낙타 등 혹 모양)
👉 예: `studentName`, `calculateScore()` | **[Java]** 의 변수명, 메소드명 |
| **뱀 표기법** | **snake_case** | 모든 글자는 소문자, 단어 사이는 언더바(`_`)로 연결. (뱀처럼 길어짐)
👉 예: `student_name`, `calculate_score()` | **[Python, C]** 의 변수명, 함수명 |
| **파스칼 표기법** | **PascalCase** | 모든 단어의 첫 글자를 대문자로 시작.
👉 예: `StudentManager`, `Calculator` | **[모든 언어]** 의 **클래스(Class)** 이름 |
| **대문자 스네이크 표기법** | **UPPER_SNAKE** | 모든 글자를 대문자로 쓰고, 언더바(`_`)로 연결.
👉 예: `MAX_SCORE`, `PI` | **[모든 언어]** 의 절대 변하지 않는 **상수(Constant)** |

```java
// [Java 스타일 이름 짓기 예시]
public class StudentManager { // 클래스는 PascalCase
    
    public static final int MAX_STUDENT_COUNT = 30; // 상수는 UPPER_SNAKE_CASE
    
    int studentAge; // 변수는 camelCase
    
    public void printStudentInfo() { // 메소드도 camelCase
        // 내용
    }
}
```