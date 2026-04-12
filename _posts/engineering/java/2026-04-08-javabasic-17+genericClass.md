---

layout: post
title: "[Java 기초] Generics 활용: 제네릭 메소드, 제네릭 클래스"
date: 2026-04-08 00:03
tags: [스터디로그, java, Generics, Generic Class, 제네릭클래스]
summary:

---

앞선 포스트에서 `ArrayList<Integer>`처럼 제네릭스를 '사용'하여 컬렉션의 타입 안정성을 확보하는 기본 방법을 알아보았다. 이번에는 자바 개발진이 제네릭을 만든 방식 그대로, 우리도 특정 타입에 얽매이지 않는 **나만의 범용 제네릭 구조(클래스, 메서드)**를 직접 설계해 보자.

## 1. 임시 타입 매개변수 (`T`, `E`)

직접 제네릭을 설계할 때는 알파벳 1글자로 **임시 타입(Type Parameter)**을 뚫어둔다. 지금 당장 무슨 타입이 들어올지 모르니, 수학의 미지수 $x$처럼 "나중에 정해질 타입"이라는 의미로 빈칸을 만드는 것이다.

* **`T`** (Type): 일반적인 타입 (가장 많이 씀)
* **`E`** (Element): 배열이나 컬렉션의 데이터 요소 
* **`K`, `V`** (Key, Value): 맵의 키와 값
*(※ 이는 개발자 간의 암묵적인 명명 관례일 뿐, `<MyType>`이라고 써도 똑같이 동작한다.)*


## 2. 나만의 제네릭 클래스 설계하기

어떤 객체든 담을 수 있는 나만의 만능 바구니 `Box` 클래스를 만들어 보자.

```java
// [1. 제네릭 클래스 설계] class 클래스명<T>
// 'T'라는 미지의 임시 타입을 사용하여 템플릿을 만든다.
class Box<T> {
    private T item; // T의 진짜 정체는 나중에 객체를 생성할 때 결정됨

    public void setItem(T item) { this.item = item; }
    public T getItem() { return item; }
}
클래스 설계도에 뚫어놓은 빈칸 T는, 개발자가 new 키워드를 통해 실제 객체를 생성하는 순간 완벽하게 치환된다.

Java
public class Main {
    public static void main(String[] args) {
        // [2. 제네릭 객체 생성] 
        // 바구니를 만드는 순간, 설계도의 모든 'T'가 'String'으로 확정된다!
        Box<String> stringBox = new Box<>();
        stringBox.setItem("자바 교재");
        String book = stringBox.getItem(); // 강제 형변환(Casting) 불필요!

        // [3. 다른 타입으로 재사용]
        // 같은 클래스 설계도로 이번엔 숫자(Integer) 전용 상자를 만든다.
        Box<Integer> intBox = new Box<>(); 
        intBox.setItem(99); 
    }
}
```

## 3. 제네릭 메서드: 무한 오버로딩 지옥 탈출하기
제네릭스는 클래스뿐만 아니라 메서드에도 적용되어 엄청난 코드 중복을 제거해 준다. 파라미터로 들어오는 값을 그대로 출력하는 메서드를 만든다고 가정해 보자.

과거에는 타입별로 똑같은 동작을 하는 메서드를 일일이 만들어야 했다(오버로딩).

```Java
// 🚨 제네릭스 도입 이전: 타입이 늘어날 때마다 메서드를 계속 추가해야 함
public static void printValue(int value) { System.out.println(value); }
public static void printValue(double value) { System.out.println(value); }
public static void printValue(String value) { System.out.println(value); }
```

하지만 제네릭 메서드를 활용하면 단 하나의 코드로 세상의 모든 타입을 처리할 수 있다.
앞서 배운 오토박싱(Auto-boxing) 덕분에 기본형인 int를 넣어도 알아서 Integer 객체로 변환되어 T에 쏙 들어가게 된다.

```Java
// 💡 제네릭스 도입 이후: <T>를 활용한 만능 메서드 완성
// 접근제어자 뒤, 반환타입 앞에 <T>를 선언해주면 된다.
public static <T> void printValue(T value) {
    System.out.println(value);
}

public static void main(String[] args) {
    int intValue = 3;             // 기본형 데이터 (오토박싱 되어 Integer로 전달됨)
    double doubleValue = 3.14;    // 기본형 데이터 (오토박싱 되어 Double로 전달됨)
    String stringValue = "제네릭스"; // 참조형 객체 데이터

    // 어떤 타입의 변수를 넣어도 완벽하게 동일한 메서드가 처리한다!
    printValue(intValue);
    printValue(doubleValue);
    printValue(stringValue);
}
```