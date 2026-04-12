---

layout: post
title: "[Java 기초] Final과 열거형(Enum): 변경 불가능하도록 고정해놓기"
date: 2026-04-06
tags: [스터디로그, java, inheritance, super, overriding, 다형성, 참조]
summary:

---
개발을 하다 보면, "이 데이터는 절대 바뀌면 안 돼!", 혹은 "이 기능은 자식 클래스에서 마음대로 뜯어고치면 안 돼!"라고 강제해야 할 때가 있다.
자바에서는 코드의 안정성을 높이기 위해 변경을 엄격하게 차단하는 **`final`** 키워드와, 고정된 상수들의 집합인 **`enum`**을 제공한다.


## 1. `final` 키워드 (절대 바꿀 수 없음)

`final`은 어디에 붙느냐에 따라 금지하는 내용이 달라진다.

**① `final` 변수**
* 한 번 값이 들어가면 다시는 바꿀 수 없는 **상수(Constant)**가 된다.
* **예시**: 파이(원주율) 값이나 최대 허용 인원수 등. 보통 `public static final int MAX_COUNT = 100;` 처럼 대문자로 선언한다.

**② `final` 메소드 (상속 관련 - 오버라이딩 금지)**
* 부모 클래스에서 이 메소드에 `final`을 붙이면, **자식 클래스에서 오버라이딩(재정의)을 할 수 없다.**
* **용도**: 부모가 물려준 기능을 자식이 실수로, 혹은 임의로 변경해서 시스템이 망가지는 것을 막고 싶을 때 사용한다. (상속받아 사용하는 것 자체는 가능)

**③ `final` 클래스 (상속 관련 - 상속 자체를 금지)**
* 이 클래스는 **다른 클래스의 부모가 될 수 없다.** 즉, `extends` 키워드로 상속받는 것 자체가 불가능해진다.
* **용도**: 보안상 절대 확장되면 안 되는 핵심 클래스에 붙입니다. 우리가 매일 쓰는 `String` 클래스도 자바를 만든 사람들이 `final`을 붙여두어서, 아무도 `String`을 상속받아 개조할 수 없게 막는다.


## 2. 열거형 `enum` (Enumeration)

관련된 상수(고정된 값)들을 한 곳에 모아 미리 정해놓고 필요할 때 갖다쓸 수 있는 특별한 데이터 타입이다.
오타를 방지하고 타입의 안전성을 완벽하게 보장한다.

요일(월-일), 계절(봄-겨울), 주문 상태(결제대기, 배송중, 완료)처럼 **"미리 정해진 몇 가지의 값"**만 가질 수 있다.


#### 🚨 `enum`과 상속에 얽힌 숨겨진 비밀
단순히 상수 묶음처럼 보이는 `enum`은 사실 상속 관점에서 아주 독특한 두 가지 제약 사항을 가진다.

1. **`enum`은 다른 클래스를 상속(`extends`)받을 수 없다.**
   * 자바에서 우리가 `enum`을 생성하면, 컴파일러가 몰래 **`java.lang.Enum`이라는 부모 클래스를 자동으로 상속**받게 만든다.
   * 자바는 '다중 상속(부모가 둘 이상인 것)'을 엄격히 금지하므로, 이미 `Enum`을 부모로 모시고 있는 열거형은 다른 클래스를 상속받을 수 없다.
2. **`enum` 자체는 묵시적인 `final` 클래스다.**
   * 내가 만든 `enum`을 다른 누군가가 상속받아 새로운 상수를 덧붙이는 것도 불가능하다. `enum`은 태생적으로 확장이 금지된 `final` 상태다.

```Java
// [1. enum 정의] 학생의 학적 상태를 고정된 상수로 관리
// 상속 불가: 이미 내부적으로 final 클래스이며, 자바의 Enum을 자동 상속받고 있음
enum StudentStatus {
    ENROLLED, LEAVE_OF_ABSENCE, GRADUATED
}

// [2. 일반 부모 클래스]
class Student {
    // ① final 변수: 한 번 부여된 학번은 졸업할 때까지 절대 변경 불가!
    public final String studentId; 
    public String name;
    public StudentStatus status;

    public Student(String studentId, String name) {
        this.studentId = studentId;
        this.name = name;
        this.status = StudentStatus.ENROLLED; // 처음 생성 시 상태는 '재학중'
    }

    // ② final 메소드: 출석 점수 계산 방식 등 학교의 절대적인 규칙은 자식이 뜯어고칠 수 없음!
    public final void checkAttendance() {
        System.out.println("학교의 표준 시스템으로 출석표를 기록합니다.");
    }
    
    // 일반 메소드: 공부 방식은 자식(전공생 등)마다 다를 수 있으니 오버라이딩(덮어쓰기) 허용
    public void study() {
        System.out.println("일반 교과서를 읽습니다.");
    }
}

// [3. 자식 클래스] 
class CollegeStudent extends Student {
    public CollegeStudent(String studentId, String name) {
        super(studentId, name);
    }

    // @Override 
    // public void checkAttendance() { ... } 
    // 💥 에러 발생! 부모가 final로 못 박아둔 메소드는 오버라이딩 불가!

    @Override
    public void study() {
        System.out.println("도서관에서 전공 서적을 펴고 밤샘 과제를 합니다."); // 일반 메소드는 오버라이딩 가능
    }
}

// [4. final 클래스 예시] 이 클래스는 누구의 부모도 될 수 없음 (상속의 종착지)
final class SchoolFoundation {
    // 프로그램 전체에서 공유하는 절대 상수 (public static final)
    public static final int MAX_SCORE = 100; 
    
    public void printCorePolicy() {
        System.out.println("절대 변경 불가능한 학교 법인의 핵심 규정입니다.");
    }
}

// class MySchool extends SchoolFoundation { ... } 
// 💥 에러 발생! final 클래스는 extends 할 수 없음!

// [실행 테스트를 위한 메인 클래스]
public class Main {
    public static void main(String[] args) {
        Student myStudent = new Student("20260001", "홍길동");
        
        // 상태를 문자열 "Enrolled"가 아닌 Enum 타입으로 엄격하게 관리
        if (myStudent.status == StudentStatus.ENROLLED) {
            System.out.println(myStudent.name + " 학생은 현재 재학 중입니다.");
        }
        
        // myStudent.studentId = "20269999"; 
        // 💥 에러! final 변수(학번)는 값을 변경할 수 없음
        
        // SchoolFoundation.MAX_SCORE = 120; 
        // 💥 에러! final 상수(만점 기준) 역시 변경 불가능
    }
}
```