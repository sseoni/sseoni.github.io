---
layout: post
title: "[Java 기초] 다중 쓰레드의 충돌 막기: 동기화(Synchronization)"
date: 2026-04-13 16:00
tags: [스터디로그, java, Synchronization, Multi-threading, synchronized]
summary: 여러 쓰레드가 하나의 데이터를 동시에 수정하려고 할 때 발생하는 치명적인 데이터 오염 문제(임계 영역)와, 이를 막기 위한 동기화(synchronized) 기법을 알아본다.
---

다중 쓰레드 환경에서 가장 조심해야 할 부분은 **'하나의 공용 데이터에 여러 쓰레드가 동시에 접근할 때'**다.

## 1. 문제 상황: 겹쳐버린 작업 (데이터 오염)

1개의 공유 통장(은행 계좌) 객체에, 남편 쓰레드와 아내 쓰레드가 동시에 10원씩 100번을 입금하는 프로그램을 가정해 보자. 정상적이라면 잔액은 2,000원이 되어야 한다.

```Java
// 1. 공유 계좌 클래스
class BankAccount {
    int balance = 0; // 잔액

    // 입금 메서드
    public void deposit(int amount) {
        int current = this.balance;    // 1. 현재 잔액을 확인
        this.balance = current + amount; // 2. 돈을 더해서 저장
    }
}

public class SyncProblemEx {
    public static void main(String[] args) throws InterruptedException {
        BankAccount account = new BankAccount();

        // 2. 남편 쓰레드: 10원씩 100번 입금
        Thread husband = new Thread(() -> {
            for (int i = 0; i < 100; i++) account.deposit(10);
        });

        // 3. 아내 쓰레드: 10원씩 100번 입금
        Thread wife = new Thread(() -> {
            for (int i = 0; i < 100; i++) account.deposit(10);
        });

        husband.start();
        wife.start();
        
        husband.join();
        wife.join();

        System.out.println("최종 잔액: " + account.balance); 
        // 출력 결과: 2000원이 아님! (예: 1850, 1920 등 실행할 때마다 데이터가 깨짐)
    }
}
```

**❗️문제점**: 왜 데이터가 깨질까?
남편이 잔액 100원을 확인하고 10원을 더해 110원으로 덮어쓰려는 그 찰나의 순간에, 아내도 동시에 접근하여 예전 잔액인 100원을 확인해버린 것이다. 결과적으로 둘 다 110원을 덮어쓰게 되어 한 명의 입금 내역이 증발해 버린다.

이처럼 여러 쓰레드가 동시에 접근하면 문제가 생기는 공유 자원 영역을 **임계 영역(Critical Section)**이라고 부른다.

## 2. 해결책: 자물쇠 걸기 `synchronized` (동기화)

이 문제를 해결하려면 **"한 번에 한 명만 화장실을 쓰도록 자물쇠(Lock)를 채우는 작업"**이 필요하다. 자바에서는 `synchronized` 키워드를 메서드에 붙여주기만 하면 완벽하게 해결된다.

```Java
class BankAccount {
    int balance = 0;

    // 💡 synchronized 키워드 추가
    // 이 메서드는 자물쇠가 걸려 한 번에 하나의 쓰레드만 진입할 수 있다!
    public synchronized void deposit(int amount) {
        int current = this.balance;
        this.balance = current + amount;
    }
}
```

`synchronized`가 붙은 메서드를 누군가(남편) 사용하고 있다면, 다른 작업자(아내)는 남편이 작업을 완전히 마치고 자물쇠를 풀고 나올 때까지 밖에서 얌전히 대기(Blocking)하게 된다.

이를 통해 다중 쓰레드 환경에서도 데이터의 무결성과 안전성을 완벽하게 보장할 수 있다.