---

layout: post
title: "[Java 기초] 상속, 다형성, 그리고 참조"
date: 2026-04-06 00:00
tags: [스터디로그, java, inheritance, super, overriding, 다형성, 참조]
summary:

---

기존 코드를 재사용하여 새로운 클래스를 만들고, 이들을 하나의 타입으로 묶어서 유연하게 관리하는 자바의 강력한 기능들이다.



## 1. 상속 (Inheritance)과 super

기존 클래스(부모)의 변수와 메소드를 새로운 클래스(자식)가 그대로 물려받는 기능이다. `extends` 키워드를 사용한다.
일반적인 '학생(Student)' 클래스를 상속받아 '대학생(CollegeStudent)' 클래스를 만들면 부모의 기존 기능을 물려받고, 자식만의 새로운 기능까지 확장할 수 있다.

* **변수의 확장**: `Student` 클래스에 `name` 변수가 있다면 $\rightarrow$ `CollegeStudent` 클래스에서는 `name` 변수를 그대로 쓰고, `major` 변수를 새롭게 추가해서 사용할 수 있다.
* **`super`**: 부모 클래스의 변수나 생성자를 가리킬 때 사용하는 키워드다.

## 2. 메소드 오버라이딩 (Overriding)

부모에게 물려받은 메소드를 자식 클래스의 상황에 맞게 **재정의(덮어쓰기)**하는 기능이다.

## 3. 다형성 (Polymorphism)

**"하나의 부모 타입 바구니로 다양한 자식 객체들을 묶어서 제어할 수 있는 마법 같은 성질"**이다.

변수의 타입은 부모일지라도, 실제 메모리 안에서 동작하는 알맹이는 자식 객체이기 때문에 코드를 실행하면 오버라이딩(덮어쓰기)된 **자식의 메소드가 우선적으로 실행**된다. 

이 다형성 덕분에 초등학생, 중학생, 대학생처럼 서로 다른 객체들을 하나의 '학생(Student)' 배열에 몽땅 담아 한 번에 관리할 수 있어 코드가 획기적으로 짧아진다.

{% include link-card.html url="/blog/engineering/java/javabasic-13+polymorphism" %}

```java
// 부모 클래스
class Student {
    String name; // 부모가 물려줄 변수

    public Student(String name) {
        this.name = name;
    }

    public void study() {
        System.out.println(name + " 학생이 교과서를 읽으며 공부합니다.");
    }
}

// 자식 클래스 (대학생도 학생의 일종이다)
class CollegeStudent extends Student {
    String major; // 상속: 자식이 새롭게 '추가'한 변수

    public CollegeStudent(String name, String major) {
        super(name); // super: 부모(Student)의 생성자를 호출하여 name 세팅을 맡김
        this.major = major; // 내 변수는 내가 세팅
    }

    @Override
    public void study() {
        // 부모의 메소드를 대학생에 맞게 덮어쓰기 (Overriding)
        System.out.println(name + " 학생이 " + major + " 전공 서적을 펴고 밤샘 과제를 합니다."); 
    }
}

public class Main {
    public static void main(String[] args) {
        // [다형성] 타입은 부모(Student)지만, 실제 메모리에 생성된 객체는 자식(CollegeStudent)
        Student myStudent = new CollegeStudent("홍길동", "컴퓨터공학"); 
        
        // 실행하면 부모의 코드가 아닌, 자식 CollegeStudent가 덮어쓴 코드가 실행됨!
        myStudent.study(); 
    }
}

```