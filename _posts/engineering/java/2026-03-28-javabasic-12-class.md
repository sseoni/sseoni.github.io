---
layout: post
title: "[Java 기초] 12. 클래스와 메소드: 객체지향의 시작"
date: 2026-03-28
tags: [스터디로그, Java, 정보처리기사]
summary:
---

자바는 모든 것을 '객체(Object)'로 바라본다. 이 객체를 만들기 위한 설계도가 바로 클래스다.

클래스 내부에는 데이터를 저장하는 '변수'와 동작을 정의하는 '메소드'가 존재하며, 이들은 `static` 키워드의 유무에 따라 쓰임새가 완전히 달라진다.

### 1. 클래스 (Class)

클래스는 객체를 만들어내기 위한 **틀(설계도)**이다.

와플 틀(클래스)이 있으면 클래식 와플, 크로플 등(객체)을 무한히 찍어낼 수 있다.

```jsx
public static void main(String[] args) {
	//클래스명 객체명 = new 클래스명();
	Waffle classic = new Waffle();
	Waffle croffle = new Waffle();
}
```

### 2. 변수 (클래스 vs 인스턴스)

- **클래스 변수**
    
    `static`이 붙은 변수
    
    전역 변수처럼, 메모리에 딱 1개만 생성되어 모든 객체가 공유한다. (예: 생성된 전체 객체(학생)의 수)
    
    → 객체를 만들 필요 없이 클래스명으로 접근 가능 `'클래스명.변수명'`
    
- **인스턴스 변수**
    
    클래스 내에 선언된 변수 → `static`이 없다
    
    객체(인스턴스)를 `new`로 생성할 때마다 각 객체 안에 개별적으로 만들어진다. (예: 학생마다 이름이 다름)
    

```jsx
public class Student {
    // 1. 클래스 변수 (모든 학생이 공유하는 총 학생 수)
    static int totalStudents = 0; 
    
    // 2. 인스턴스 변수 (각 학생 객체가 가지는 고유한 데이터)
    String name; 
    int score;
}

public class Main {
    public static void main(String[] args){
        // 1. 첫 번째 학생(객체) 생성 및 데이터 입력
        Student student1 = new Student();
        student1.name = "홍길동";    
        student1.score = 100;
        Student.totalStudents++; // 학생이 1명 생겼으니 총 학생 수 1 증가
        
        // 2. 두 번째 학생(객체) 생성 및 데이터 입력
        Student student2 = new Student(); // new를 써서 메모리에 새로운 공간(새 객체)을 만듦
        student2.name = "김영희";    // 객체명(student2).인스턴스변수명으로 접근
        student2.score = 95;
        Student.totalStudents++; // 학생이 또 생겼으니 총 학생 수 1 증가

        // [결과 확인해보기]
        System.out.println("첫 번째 학생: " + student1.name + " (" + student1.score + "점)");
        System.out.println("두 번째 학생: " + student2.name + " (" + student2.score + "점)");
        
        // 클래스 변수는 '클래스명.변수명'으로 접근한다.
        System.out.println("현재 등록된 총 학생 수: " + Student.totalStudents + "명");
    }
}
```

### 3. 메소드 (클래스 vs 인스턴스)

- **클래스 메소드**
    
    `static`이 붙은 메소드
    
    객체 생성 없이 `클래스명.메소드명()`으로 바로 호출한다.
    
    **[❗️주의] 클래스 메소드 안에서는 인스턴스 변수를 사용할 수 없다.** (객체가 아직 안 만들어졌을 수도 있기 때문)
    
- **인스턴스 메소드**
    
    `static`이 없는 메소드
    
    반드시 객체를 생성한 뒤에 호출할 수 있으며, 인스턴스 변수를 자유롭게 다룰 수 있다.
    

```jsx
public class Student {
    static int totalStudents = 0;
    
    String name;
    int score;

    // 1. 인스턴스 메소드 (특정 학생이 공부를 해서 자신의 점수를 올림)
    public void study() {
        this.score += 10;
        System.out.println(name + " 학생이 공부를 했습니다. (현재 점수: " + score + ")");
    }

    // 2. 클래스 메소드 (객체 생성 없이 학교 전체의 통계 확인)
    public static void printTotal() {
        System.out.println("현재 등록된 총 학생 수: " + totalStudents);
        // System.out.println(name); // 💥 에러! 클래스 메소드에선 인스턴스 변수(개인 데이터) 접근 불가
    }
}

public static void main(String[] args){
	Student student1 = new Student();
	student1.name = "홍길동";
	student1.score = 90;
	Student.totalStudents++;
	
	student1.study();        // "홍길동 학생이 공부를 했습니다. (현재 점수: 100)" 출력
	Student.printTotal();    // "현재 등록된 총 학생 수: 1" 출력
}
```