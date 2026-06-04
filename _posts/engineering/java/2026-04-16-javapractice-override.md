---
layout: post
title: "[Java 심화] 다형성과 오버라이딩: Parent obj = new Child()의 비밀"
date: 2026-04-18 10:00
tags: [스터디로그, java, OOP, Polymorphism, Overriding, 정보처리기사]
summary: 부모 타입의 참조 변수로 자식 객체를 가리킬 때 발생하는 다형성의 원리와, 메서드 오버라이딩 유무에 따른 실행 결과의 차이를 재귀 함수 예제를 통해 완벽하게 분석한다.
---

자바 객체지향 프로그래밍(OOP)에서 가장 헷갈리면서도 중요한 개념이 바로 **다형성(Polymorphism)**이다.
다형성이란 '하나의 변수가 여러 가지 형태의 객체를 가리킬 수 있는 성질'을 말한다.

코드를 작성하다 보면 아래와 같이 **부모 클래스 타입의 변수에 자식 클래스의 객체를 담는 문법**을 아주 흔하게 마주치게 된다.

```java
Parent obj = new Child();
```

이 상태에서 `obj.compute()`라는 메서드를 호출하면, 과연 부모의 메서드가 실행될까, 아니면 자식의 메서드가 실행될까? 자식 클래스 내부에 **오버라이딩(Overriding, 메서드 재정의)**이 있는지 없는지에 따라 결과가 완전히 달라진다.

## 1. 케이스 A: 오버라이딩이 '없을' 때

만약 Child 클래스 내부에 아무런 메서드가 없거나, compute 메서드를 재정의하지 않고 부모의 것을 그대로 물려받아 쓴다고 가정해 보자.

```Java
class Parent {
    int compute(int num) {
        if (num <= 1) return num;
        return compute(num - 1) + compute(num - 2);
    }
}

class Child extends Parent {
    // 내부가 비어있음 (오버라이딩 없음)
}

public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        System.out.println(obj.compute(4)); // 부모의 compute가 실행됨
    }
}
```

오버라이딩이 없다면, 객체는 `Child`로 생성되었더라도 부모인 `Parent` 클래스에 정의된 `compute` 메서드를 그대로 가져다 쓴다.

[실행 흐름 추적: Parent의 로직 적용]
`compute(4)`를 호출하면 부모의 공식인 `compute(num - 1) + compute(num - 2)`에 따라 다음과 같이 계산된다. (참고로 이는 피보나치 수열과 같은 로직이다.)

`compute(4)` = `compute(3)` + `compute(2)`

`compute(3)` = `compute(2)` + `compute(1)`

`compute(2)` = `compute(1)` + `compute(0)`

조건(`num <= 1`이면 `num` 반환)에 따라 `1`과 `0`은 그대로 반환되므로 역순으로 더해 올라간다.

`compute(2)` = 1 + 0 = 1

`compute(3)` = 1(방금 구한 값) + 1 = 2

`compute(4)` = 2(방금 구한 값) + 1 = 3

👉 최종 출력 결과: `3`


## 2. 케이스 B: 오버라이딩이 '있을' 때

자식 클래스인 `Child`가 부모의 `compute` 메서드를 자신만의 공식으로 오버라이딩(`@Override`) 한 경우를 보자.

```Java
class Child extends Parent {
    @Override
    int compute(int num) {
        if (num <= 1) return num;
        // 부모와 달리 (num - 3)을 더하도록 공식을 바꿈!
        return compute(num - 1) + compute(num - 3); 
    }
}

public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        System.out.println(obj.compute(4)); 
    }
}
```

자바의 절대적인 규칙 중 하나는 **"부모 타입의 변수로 호출하더라도, 자식 클래스에서 오버라이딩된 메서드가 있다면 무조건 자식의 메서드가 가로채서 실행된다"**는 것이다. 이를 동적 바인딩(`Dynamic Dispatch`)이라고 부른다.

따라서 `obj.compute(4)`는 부모가 아닌 `Child` 클래스의 공식으로 계산되어야 한다.

[실행 흐름 추적: `Child`의 로직 적용]
자식의 공식인 `compute(num - 1) + compute(num - 3)`에 따라 계산해 보자.

`compute(4)` = `compute(3)` + `compute(1)`

`compute(3)` = `compute(2)` + `compute(0)`

`compute(2)` = `compute(1)` + `compute(-1)`

조건(`num <= 1`이면 `num` 반환)에 따라 1 이하의 숫자는 자기 자신을 반환한다.

`compute(2)` = 1 + (-1) = 0

`compute(3)` = 0(방금 구한 값) + 0 = 0

`compute(4)` = 0(방금 구한 값) + 1 = 1

**👉 최종 출력 결과: 1**

### 💡 최종 요약

다형성(`Parent obj = new Child();`)을 사용할 때 명심해야 할 규칙은 단 하나다.

| 구분 | 실행되는 메서드 | 예제 결과 |
|:--|:--|:--|
| 자식에 오버라이딩이 없을 때 | 물려받은 부모의 메서드 실행 | 3 |
자식에 오버라이딩이 있을 때 | 오버라이딩된 자식의 메서드 실행 | 1 |

자바는 항상 메모리에 실제로 생성된 진짜 객체(`new Child()`)를 기준으로 가장 최신 버전(오버라이딩)의 메서드를 찾아간다는 사실을 기억하자.


## ❗️ 정보처리기사 시험에서 주의해야하는 경우

```Java
class Child extends Parent {
    // 🚨 이 자리에 @Override가 써있지 않는 경우를 주의하자!
    int compute(int num) {
        if (num <= 1) return num;
        return compute(num - 1) + compute(num - 3); 
    }
}

public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        System.out.println(obj.compute(4)); 
    }
}
```

이 코드를 보고 "어? `@Override`가 안 적혀 있으니까 오버라이딩이 안 된 거 아냐? 그럼 부모 메서드가 실행되겠네!" 라고 생각했다면 출제자의 함정에 완벽하게 빠진 것이다.

💡 핵심 원리: `@Override`는 이름표일 뿐이다
자바에서 `@Override`는 컴파일러에게 "내가 부모 메서드를 오타 없이 잘 덮어썼는지 검사해 줘"라고 부탁하는 확인용 명찰일 뿐, 문법적으로 필수 요소가 아니다.

명찰이 없더라도 메서드의 이름(`compute`), 반환 타입(`int`), 매개변수(`int num`)가 부모와 완전히 똑같다면, 자바 가상 머신(JVM)은 이를 무조건 '오버라이딩된 메서드'로 취급한다.

따라서 위 코드 역시 케이스 B와 완벽하게 동일하게 작동하며, 부모의 메서드를 가로채서 자식의 공식으로 계산되므로 출력 결과는 똑같이 1이 된다. 시험장에서 명찰(@Override)이 생략되어 있더라도 절대 당황하지 말고 자식 메서드의 로직을 따라가자.