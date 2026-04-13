---
layout: post
title: "[Java 기초] 다중 쓰레드의 흐름 제어: join() 메서드"
date: 2026-04-13 14:00
tags: [스터디로그, java, Multi-threading, Thread, Join]
summary: 메인 쓰레드와 서브 쓰레드가 동시에 동작할 때 발생하는 실행 순서 문제와, 이를 제어하여 서브 쓰레드의 작업이 끝날 때까지 기다려주는 join() 메서드에 대해 알아본다.
---

다중 쓰레드를 생성하여 `start()`로 작업을 지시하면, 메인 쓰레드와 새로 생성된 서브 쓰레드는 완전히 독립적으로 동시에 움직이기 시작한다. 이 과정에서 한 가지 흐름 제어 문제가 발생한다.

## 1. 메인 쓰레드의 독단적인 종료

두 명의 작업자(쓰레드)에게 각각 숫자 1부터 5까지 출력하는 일을 시키는 코드를 작성해 보자.

```Java
public class MultiThreadEx {
    public static void main(String[] args) {
        
        // 람다식을 이용해 Runnable을 즉석에서 작성하고 쓰레드 생성
        Thread threadA = new Thread(() -> {
            for (int i = 1; i <= 5; i++) System.out.println("A작업: " + i);
        });

        Thread threadB = new Thread(() -> {
            for (int i = 1; i <= 5; i++) System.out.println("B작업: " + i);
        });

        // 작업 시작
        threadA.start();
        threadB.start();

        // 메인 쓰레드의 마지막 코드
        System.out.println("모든 작업이 끝났습니다. (메인 종료)");
    }
}
```

이 코드를 실행해 보면, "모든 작업이 끝났습니다."라는 문구가 가장 먼저 출력되거나 중간에 섞여서 출력된다. 메인 쓰레드는 `start()`로 작업 지시만 내린 뒤, 서브 쓰레드들이 일을 끝내든 말든 자신의 코드 흐름을 따라 곧바로 종료되어 버리기 때문이다.

## 2. 해결책: 기다려주는 `join()` 메서드

실무에서는 서브 쓰레드들이 작업한 결과물을 모아서 최종 처리를 해야 할 때가 많다. 이때 **"해당 쓰레드의 작업이 완전히 끝날 때까지 메인 쓰레드야, 여기서 잠시 멈춰서 기다려라!"**라고 명령하는 메서드가 바로 **`join()`**이다.

```Java
public class JoinEx {
    public static void main(String[] args) {
        
        Thread threadA = new Thread(() -> {
            for (int i = 1; i <= 5; i++) System.out.println("A작업: " + i);
        });

        Thread threadB = new Thread(() -> {
            for (int i = 1; i <= 5; i++) System.out.println("B작업: " + i);
        });

        threadA.start();
        threadB.start();

        try {
            // 메인 쓰레드는 threadA와 threadB가 일을 마칠 때까지 여기서 대기한다.
            threadA.join(); 
            threadB.join(); 
        } catch (InterruptedException e) {
            // 쓰레드에서는 예외가 발생할 수 있기 때문에 반드시 예외처리를 해준다.
            System.out.println("대기 중 방해를 받았습니다.");
        }

        // A와 B가 완벽히 종료된 후에야 비로소 아래 코드가 실행된다.
        System.out.println("모든 작업이 완벽히 끝났습니다. (메인 종료)");
    }
}
```

`join()`을 사용하면 개발자가 의도한 대로 다중 쓰레드의 실행 완료 시점을 보장받고, 안전하게 다음 로직을 이어나갈 수 있다.