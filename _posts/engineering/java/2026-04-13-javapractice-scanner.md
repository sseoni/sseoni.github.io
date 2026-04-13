---
layout: post
title: "[Java 활용] Scanner 키보드 입력 핵심 메서드 총정리"
date: 2026-04-13 18:00
tags: [스터디로그, java, IO, Scanner, Input]
summary: 키보드 입력을 처리하는 Scanner 클래스의 핵심 메서드(next, nextInt, nextDouble, nextLine) 사용법과, 연속 입력 시 발생하는 흔한 버그 해결책을 정리한다.
---

앞서 자바의 기본 입출력 포스트에서 `Scanner`가 키보드로 입력된 원초적인 데이터를 우리가 읽을 수 있는 글자나 숫자로 번역해 주는 도구라고 배웠다.

{% include link-card.html url="/blog/engineering/java/javabasic-26-io-scanner" %}

`Scanner`는 사용자가 입력할 데이터의 형태(문자, 정수, 실수 등)에 따라 아주 직관적인 전용 메서드들을 제공한다. 실무와 코딩 테스트에서 가장 빈번하게 쓰이는 4가지 입력 메서드를 표와 코드로 완벽하게 정리해 본다.

## 1. Scanner 핵심 기능 요약 (Cheat Sheet)

`Scanner sc = new Scanner(System.in);` 이 선언되어 있다고 가정할 때, 제공되는 핵심 기능은 다음과 같다.

| 기능 (Method) | 설명 | 사용 예시 | 입력 예시 및 결과 |
| :--- | :--- | :--- | :--- |
| **`next()`** | 문자열 입력 **(단어 단위)**<br>공백(띄어쓰기) 전까지만 읽어온다. | `String word = sc.next();` | `홍길동` 입력 ➡️ `"홍길동"` 반환 |
| **`nextInt()`** | **정수** 입력 | `int i = sc.nextInt();` | `25` 입력 ➡️ `25` 반환 |
| **`nextDouble()`** | **실수** 입력 | `double d = sc.nextDouble();` | `175.5` 입력 ➡️ `175.5` 반환 |
| **`nextLine()`** | 문자열 입력 **(줄 단위)**<br>엔터(Enter)를 칠 때까지의 전체 문장을 읽어온다. | `String line = sc.nextLine();` | `자바 공부 재밌다` 입력 ➡️ `"자바 공부 재밌다"` 반환 |


## 2. 💻 코드로 보는 Scanner 연속 입력

사용자의 프로필(이름, 나이, 키, 한줄소개)을 순서대로 입력받는 실전 예제를 확인해 보자.

```java
import java.util.Scanner;

public class ScannerApiEx {
    public static void main(String[] args) {
        
        Scanner sc = new Scanner(System.in);

        // 1. next(): 단어 입력 (공백 없는 문자열)
        System.out.print("이름을 입력하세요: ");
        String name = sc.next(); 

        // 2. nextInt(): 정수 입력
        System.out.print("나이를 입력하세요: ");
        int age = sc.nextInt();

        // 3. nextDouble(): 실수 입력
        System.out.print("키를 입력하세요: ");
        double height = sc.nextDouble();

        // 🚨 버그 방지용 코드 (엔터키 처리)
        sc.nextLine(); 

        // 4. nextLine(): 문장 입력 (띄어쓰기 포함)
        System.out.print("좌우명(문장)을 입력하세요: ");
        String motto = sc.nextLine();

        System.out.println("\n--- 입력된 프로필 ---");
        System.out.println("이름: " + name);
        System.out.println("나이: " + age + "세");
        System.out.println("키: " + height + "cm");
        System.out.println("좌우명: " + motto);

        sc.close(); // 자원 반납
    }
}
```

**💡 주의**: `nextInt()` 뒤에 `nextLine()`을 쓸 때 발생하는 버그
위 코드를 보면 height를 입력받은 직후, 아무 변수에도 담지 않는 허공에 `sc.nextLine();`을 한 번 호출하는 코드가 있다. 이것은 매우 중요한 버그 방지용 코드다.

사용자가 키(예: 175.5)를 입력하고 **[엔터]**를 치면, `nextDouble()`은 숫자 175.5만 쏙 빼가고 입력창에 [엔터] 기호를 그대로 남겨둔다. 그 직후에 문장을 읽어오는 `nextLine()`이 실행되면, 사용자가 좌우명을 타이핑하기도 전에 아까 남아있던 [엔터]를 읽어버리고 빈 문장으로 입력을 끝내버린다.

따라서 숫자를 입력받은 뒤에 문장을 입력받아야 한다면, 중간에 빈 `sc.nextLine();`을 한 번 실행하여 남아있는 엔터 찌꺼기를 청소해 주어야 프로그램이 정상적으로 동작한다.