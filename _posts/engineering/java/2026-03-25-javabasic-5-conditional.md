---
layout: post
title: "[Java 기초] 5. 조건문 (if, switch)"
date: 2026-03-25
tags: [스터디로그, Java, 정보처리기사]
summary:
---

작성된 코드는 기본적으로 위에서 아래로 순차 실행되지만, 특정 조건에 따라 실행되는 코드를 다르게 분기해야 할 때가 있다. 특히 정보처리기사 실기 시험의 알고리즘 문제에서 가장 기초이자 핵심으로 등장하는 제어문 중 **조건문**을 먼저 정리한다.

---

### 1. `if`, `else if`, `else`

가장 직관적이고 널리 쓰이는 조건문이다. 괄호 `()` 안의 조건식이 `true`일 때만 해당 블록 `{}` 안의 코드가 실행된다.

- `if`: 조건이 참이면 실행 (필수)
- `else if`: 앞선 조건이 거짓일 때, 새로운 조건을 제시 (선택, 여러 개 사용 가능)
- `else`: 위의 모든 조건이 거짓일 때 무조건 실행 (선택, 마지막에 딱 한 번만)

```java
// [if 조건문 예제]
int score = 85;

if (score >= 90) {
    System.out.println("A등급입니다.");
} else if (score >= 80) {
    // 90점 미만이면서 80점 이상인 경우 실행
    System.out.println("B등급입니다.");
} else {
    // 80점 미만인 모든 경우에 실행
    System.out.println("C등급입니다.");
}
```

### 2. `switch` - `case`

하나의 변수 값을 여러 개의 값과 비교할 때 사용한다. `if`문이 길어지고 복잡해질 때, 가독성을 높이기 위해 대체재로 활용하기 좋다.

- 비교할 변수가 어떤 `case`의 값과 일치하면, 그 아래의 코드를 쭈욱 실행한다.
- ⚠️ **주의**: `break;` 키워드를 쓰지 않으면, 일치한 `case` 이후의 모든 `case` 코드가 다 실행되어 버리는 '폴스루(Fall-through)' 현상이 발생한다.

```jsx
// [switch 조건문 예제]
int rank = 2;

switch (rank) {
    case 1:
        System.out.println("금메달입니다.");
        break; // 코드를 실행하고 switch문을 빠져나감
    case 2:
        System.out.println("은메달입니다.");
        break;
    case 3:
        System.out.println("동메달입니다.");
        break;
    default:
        // if문의 else와 같은 역할. 일치하는 case가 없을 때 실행
        System.out.println("참가상입니다.");
}
```