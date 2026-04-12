---

layout: post
title: "[Java 기초] [참조] 접근 제어자: private, default, protected, public"
date: 2026-04-06 00:01
tags: [스터디로그, java, 접근제어자, private, default, protected, public]
summary:

---

객체 지향 프로그래밍(OOP)의 핵심 중 하나는 '은닉화(캡슐화)'다. 외부에서 함부로 내 객체의 데이터를 조작하거나 훔쳐보지 못하게 막아야하기 때문이다. 

자바에서는 이를 위해 클래스, 변수, 메소드 앞에 **접근 제어자(Access Modifier)**라는 문지기를 세워둔다.
개방된 정도에 따라 총 4가지가 있으며, 깐깐한 순서대로 정리해 보았다.



### 1. `private` (가장 엄격함)
* **접근 범위**: **오직 내가 선언된 '같은 클래스 내부'에서만** 접근할 수 있다.
* **특징**: 객체의 핵심 데이터(주민번호, 비밀번호, 통장 잔고 등)를 숨길 때 사용한다. 외부에서 이 값을 읽거나 수정하려면 반드시 13번 포스트에서 배운 `public`인 `Getter`와 `Setter` 메소드를 거치게 만들어야 한다.

### 2. `default` (기본값)
* **접근 범위**: **'같은 패키지(폴더)' 안에 있는 클래스들끼리만** 접근할 수 있다.
* **특징**: 아무런 접근 제어자 키워드를 적지 않으면 자동으로 `default`가 적용된다. (실제 코드에 `default`라고 적는 것이 아님에 주의하자!)

### 3. `protected` (가족 우대)
* **접근 범위**: **'같은 패키지'** 내부는 물론이고, 패키지가 다르더라도 **나를 상속받은 '자식 클래스'**라면 접근할 수 있다.
* **특징**: 부모 클래스가 자식 클래스에게만 특별히 재산을 물려주고 싶을 때 주로 사용한다.

### 4. `public` (누구나 환영)
* **접근 범위**: 패키지나 상속 여부에 상관없이 **프로그램 어디에서나** 무제한으로 접근할 수 있다.
* **특징**: 외부에서 호출해서 사용해야 하는 기능(메소드)이나, 프로그램 전체에서 쓰이는 상수(`public static final`) 등에 주로 붙인다.

---

### 💡 한눈에 보는 접근 범위 요약 표
위에서 아래로 갈수록 제한이 풀린다

| 접근 제어자 | 같은 클래스 내부 | 같은 패키지 내부 | 자식 클래스 (다른 패키지) | 전체 (어디서나) |
| :---: | :---: | :---: | :---: | :---: |
| **`private`** | ⭕ | ❌ | ❌ | ❌ |
| **`(default)`** | ⭕ | ⭕ | ❌ | ❌ |
| **`protected`** | ⭕ | ⭕ | ⭕ | ❌ |
| **`public`** | ⭕ | ⭕ | ⭕ | ⭕ |

---

### 💻 코드로 보는 접근 제어자

```java
package com.school.core; // 핵심 패키지

public class StudentProfile {
    // 1. public: 누구나 열람 가능한 이름
    public String name = "홍길동";      
    
    // 2. protected: 같은 패키지 + 상속받은 대학생 객체 등에서만 열람 가능
    protected String major = "컴퓨터공학"; 
    
    // 3. default: 키워드 생략. 같은 패키지(com.school.core) 내에서만 공유
    int age = 20;                      
    
    // 4. private: 1급 기밀. 오직 StudentProfile 클래스 중괄호 안에서만 열람 가능!
    private String residentNumber = "000101-3123456"; 

    // 내 클래스 내부이므로 private 변수도 얼마든지 사용 가능
    public void printSecretInfo() {
        System.out.println("주민번호: " + residentNumber); 
    }
}

package com.school.external; // 아예 다른 외부 패키지
import com.school.core.StudentProfile;

public class Main {
    public static void main(String[] args) {
        StudentProfile profile = new StudentProfile();
        
        System.out.println(profile.name);  // ⭕ public: 무사과과 통과
        
        // System.out.println(profile.major);          // 💥 에러! (protected: 상속 안 받아서 안됨)
        // System.out.println(profile.age);            // 💥 에러! (default: 패키지가 달라서 안됨)
        // System.out.println(profile.residentNumber); // 💥 에러! (private: 남의 클래스라 절대 안됨)
    }
}
```