---

layout: post
title: "[Java 기초] [참조] this. 키워드: 인스턴스 변수 구분"
date: 2026-03-28
tags: [스터디로그, java, this]
summary:

---

## **`this` 키워드**

객체 '자기 자신'을 가리키는 리모컨이다.
매개변수 이름과 인스턴스 변수 이름이 같을 때, 둘을 구분하기 위해 인스턴스 변수 앞에 `this.`을 붙인다.

```java
class Student {
	String name;                          // 이 name을 name1,
	public void setName(String name) {    // 이 name을 name2라고 할 때
		this.name = name;                   // this.name은 name1을, name은 name2를 의미
	}
}

public static void main(String[] args) {
	Student student1 = new Student();
	student1.setName("홍길동");
	System.out.println(student1.name);    // 출력 결과: 홍길동
]
```