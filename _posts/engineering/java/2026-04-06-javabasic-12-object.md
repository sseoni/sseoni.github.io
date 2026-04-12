---

layout: post
title: "[Java 기초] 객체의 탄생과 캡슐화 (생성자, Getter/Setter, 패키지)"
date: 2026-04-06 00:00
tags: [스터디로그, java, 생성자, Getter, Setter, 패키지]
summary:

---

설계도(클래스)를 바탕으로 실제 학생을 메모리에 등록할 때, 개인정보를 안전하게 보호하고 초기값을 세팅하는 방법들을 알아본다.

## 1. 생성자 (Constructor)

new 키워드로 학생 객체를 생성할 때 가장 먼저, 딱 한 번 자동으로 호출되는 메소드다.

특징: 메소드 이름이 클래스 이름(Student)과 완벽히 동일해야 하며, 반환 타입을 적지 않는다.

```Java
// [생성자 예시] 접근제어자 클래스명(필수 전달값) {
public Student(String name) {
    this.name = name;  // 초기화 명령문
    this.score = 0;
}

// 사용 예시
public static void main(String[] args){
    Student student1 = new Student("홍길동");  // 홍길동, 초기점수0점인 객체가 생성됨
}
```

## 2. 접근 제어자와 Getter / Setter (캡슐화)

자바에서는 데이터(변수)를 외부에서 함부로 조작하지 못하게 막는 **캡슐화(Encapsulation)**를 사용한다. 누군가 남의 시험 점수를 마음대로 10000점이나 -50점으로 조작하는 것을 막기 위함이다. 이를 위해 Getter와 Setter를 사용한다.

Getter: 인스턴스 변수의 값을 반환해주는 메소드
Setter: 인스턴스 변수의 값을 설정해주는 메소드(일반적으로는 반환형이 없음)

```Java
// [Getter 예시] 반환형 get이름() {}
public int getScore() {
    return score;  // 반환값
}

// [Setter 예시] void set이름(전달값) {}
public void setScore(int score){
    // 값 설정
}

// 사용 예시
public static void main(String[] args){
    Student student1 = new Student("홍길동");
    student1.setScore(90);  // 홍길동의 점수 20으로 설정
    System.out.println(student1.getScore());  // student1의 점수 출력
```

💡 Tip: 점수 변수는 private으로 숨기고, 대신 점수를 안전하게 확인하는 메소드(Getter)와, 0~100점 사이인지 검증하고 수정하는 메소드(Setter)를 public으로 열어둔다.

{% include link-card.html url="/blog/engineering/java/javabasic-12+modifier" %}


## 3. 패키지 (Package)

관련 있는 클래스들을 모아두는 '폴더'다.
`package 패키지명;`으로 정의하고, `import`문으로 사용한다.

{% include link-card.html url="/blog/engineering/java/javabasic-12+package" %}


```Java
package com.school.management;  // 현재 클래스가 속한 패키지 선언

public class Student {
    // 변수는 private으로 외부 접근 차단
    private String name; 
    private int score;
    
    // [생성자] 학생 생성 시 이름을 필수로 입력받도록 강제함
    public Student(String name) {
        this.name = name; 
        this.score = 0;  // (초기화) 초기 점수는 0 점
        Student.totalStudents++; 
    }

    // [Getter] 숨겨진 점수 데이터를 읽어감
    public int getScore() {
        return score;
    }

    // [Setter] 0~100 사이의 올바른 값만 들어가도록 방어 로직 추가
    public void setScore(int score) {
        if(score >= 0 && score <= 100) {
            this.score = score;
        } else {
            System.out.println("잘못된 점수입니다. 0~100 사이로 입력하세요.");
        }
    }
}
```