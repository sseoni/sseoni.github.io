---
layout: post
title: "[Java 기초] 동시에 여러 작업하기: 쓰레드(Thread)와 Runnable"
date: 2026-04-13 14:00
tags: [스터디로그, java, Thread, Runnable, Multi-threading]
summary: 자바에서 동시에 여러 작업을 처리하기 위한 쓰레드(Thread)의 기본 개념과, 쓰레드를 생성하는 두 가지 방법(Thread 상속, Runnable 구현)을 알아본다.
---

하나의 프로그램 안에서 동시에 여러 작업이 실행되어야 할 때가 있다. 예를 들어, 파일을 다운로드하면서 동시에 화면에 진행 상태를 보여주고, 사용자의 클릭 입력을 받아야 한다.

자바에서 이렇게 하나의 프로그램 내에서 독립적으로 실행되는 작업의 단위를 **쓰레드(Thread)**라고 부른다.

## 1. 단일 쓰레드와 다중 쓰레드

### 단일 쓰레드 (Single Thread)

작업자가 1명인 상태다. A 작업이 완전히 끝나야만 B 작업을 시작할 수 있다. (기본적으로 자바의 `main` 메서드는 하나의 메인 쓰레드 위에서 동작한다.)

### 다중 쓰레드 (Multi-threading)

작업자가 여러 명인 상태다. A 작업과 B 작업을 동시에 진행할 수 있다.

## 2. 쓰레드를 만드는 두 가지 방법

자바에서 새로운 작업자(쓰레드)를 고용하는 방법은 크게 두 가지가 있다. 어떤 방식을 사용하든, 작업자가 실행할 실제 내용은 **`run()`**이라는 메서드 안에 작성해야 한다.

### 방법 A: `Thread` 클래스 상속받기

가장 직관적인 방법으로, 자바가 제공하는 `Thread` 클래스를 직접 상속(extends)받아 기능을 재정의하는 방식이다.

```Java
// 1. Thread 클래스를 상속받는 새로운 작업자 클래스 정의
class MyThread extends Thread {
    @Override
    public void run() { // 작업자가 수행할 내용
        for (int i = 1; i <= 5; i++) {
            System.out.println("Thread 상속 작업자: " + i);
        }
    }
}

public class ThreadEx {
    public static void main(String[] args) {
        MyThread thread = new MyThread(); // 작업자 고용
        thread.start(); // 💡 작업 시작 지시 (run()이 아님에 주의!)
        
        System.out.println("메인 쓰레드 종료");
    }
}
```

### 방법 B: `Runnable` 인터페이스 구현하기 (⭐ 실무 권장)

작업의 내용(`run`)만 정의해 둔 인터페이스를 구현(implements)한 뒤, 이를 실제 쓰레드 객체에 전달하는 방식이다.

```Java
// 1. Runnable 인터페이스를 구현하여 작업 내용만 정의
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Runnable 작업자: " + i);
        }
    }
}

public class RunnableEx {
    public static void main(String[] args) {
        MyRunnable task = new MyRunnable();       // 작업 내용(할 일)
        Thread thread = new Thread(task);         // 실제 작업자(쓰레드)에게 할 일 전달
        thread.start();                           // 작업 시작!
        
        System.out.println("메인 쓰레드 종료");
    }
}
```

**💡 왜 `Runnable` 방식을 더 많이 쓸까?**
자바는 클래스의 다중 상속(부모를 2개 이상 두는 것)을 엄격하게 금지한다. 만약 `Thread` 클래스를 상속(extends)받아 버리면, 그 클래스는 다른 유용한 클래스를 부모로 가질 수 없게 된다.

하지만 `Runnable`은 인터페이스(implements)이므로 다중 구현이 가능하여 객체 지향적인 설계의 유연성을 훨씬 높여준다. 따라서 실무에서는 대부분 `Runnable` 인터페이스를 사용해 쓰레드를 생성한다.