---
layout: post
title: "[Java 기초] 데이터 입출력(I/O)과 Scanner"
date: 2026-04-13 18:00
tags: [스터디로그, java, IO, Stream, Scanner]
summary: 프로그램과 외부 장치 간에 데이터를 주고받는 입출력(I/O) 스트림의 단방향 개념을 이해하고, Scanner를 이용한 기본 입력 방법을 알아본다.
---

우리가 지금까지 작성한 코드의 변수나 객체들은 프로그램이 종료되면 메모리에서 흔적도 없이 사라진다. 데이터를 영구적으로 보관하거나 사용자의 키보드 입력을 받으려면 프로그램 밖으로 데이터를 내보내거나(Output) 들여와야(Input) 한다. 이를 **입출력(I/O)**이라고 한다.

자바에서는 데이터가 이동하는 통로를 **스트림(Stream)**이라고 부른다. 

## 1. 스트림(Stream)의 핵심 특징: 단방향

스트림은 물이 한 방향으로만 흐르듯 **단방향**으로만 데이터를 이동시킨다. 
따라서 데이터를 키보드로부터 읽어올 때는 **입력 스트림(InputStream)**이 필요하고, 모니터 화면에 출력할 때는 완전히 다른 통로인 **출력 스트림(OutputStream)**이 필요하다. 하나의 통로로 양방향 통신을 할 수는 없다.

### 표준 출력 (`System.out`)

모니터 화면으로 데이터를 내보내는 가장 기본적인 출력 스트림이다. 우리가 매일 쓰던 `System.out.println()`이 바로 이 통로를 이용한 것이다.

### 표준 입력 (`System.in`)

키보드로부터 데이터를 읽어 들이는 기본적인 입력 스트림이다.

## 2. 입력을 쉽게 도와주는 도구: Scanner

`System.in`은 키보드의 입력을 가장 원초적인 형태(바이트)로만 읽어온다. 이를 우리가 읽을 수 있는 글자나 숫자로 직접 변환하려면 코드가 매우 복잡해진다. 
그래서 자바는 이런 변환 작업을 알아서 해주는 훌륭한 번역기인 **`Scanner`** 클래스를 제공한다.

```java
import java.util.Scanner;

public class ScannerEx {
    public static void main(String[] args) {
        // 1. 키보드 입력 스트림(System.in)에 Scanner 번역기를 장착
        Scanner scanner = new Scanner(System.in);

        System.out.print("이름을 입력하세요: ");
        // 2. 사용자가 엔터를 칠 때까지 기다렸다가, 입력한 문자열을 가져옴
        String name = scanner.nextLine(); 

        System.out.print("나이를 입력하세요: ");
        // 3. 입력한 값을 정수형(int)으로 즉시 변환하여 가져옴
        int age = scanner.nextInt(); 

        System.out.println("등록 완료: " + name + " (" + age + "세)");

        // 4. 입출력 통로는 사용 후 반드시 닫아주어야(close) 자원이 낭비되지 않음
        scanner.close(); 
    }
}